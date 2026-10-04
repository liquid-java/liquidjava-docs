"""Build the browser runner from unmodified published LiquidJava sources."""
import json
import re
import subprocess
import shutil
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
WORK = ROOT / '.playground-build'
OUTPUT = ROOT / 'playground/runtime'


def dependency_artifacts():
    namespace = {'m': 'http://maven.apache.org/POM/4.0.0'}
    pom = ET.parse(ROOT / 'scripts/playground/pom.xml')
    return {
        dependency.findtext('m:artifactId', namespaces=namespace): tuple(
            dependency.findtext(f'm:{field}', namespaces=namespace)
            for field in ['groupId', 'artifactId', 'version']
        )
        for dependency in pom.findall('m:dependencies/m:dependency', namespace)
    }


def artifact(group, name, version, classifier=''):
    filename = f'{name}-{version}{classifier}.jar'
    target = WORK / filename
    if not target.exists():
        url = f'https://repo.maven.apache.org/maven2/{group.replace(".", "/")}/{name}/{version}/{filename}'
        print(f'Downloading {filename}', flush=True)
        urllib.request.urlretrieve(url, target)
    return target


def main():
    properties = subprocess.run(['java', '-XshowSettings:properties', '-version'], capture_output=True, text=True, check=True).stderr
    java_home = Path(re.search(r'java.home = (.+)', properties).group(1).strip())
    if not re.search(r'java.version = 17[.\s]', properties):
        raise RuntimeError('Build the playground with JDK 17 (set JAVA_HOME and PATH)')
    WORK.mkdir(exist_ok=True)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    dependencies = dependency_artifacts()
    verifier = artifact(*dependencies['liquidjava-verifier'])
    sources = artifact(*dependencies['liquidjava-verifier'], '-sources')
    annotations = artifact(*dependencies['liquidjava-api'], '-sources')
    z3_sources = artifact(*dependencies['z3-turnkey'], '-sources')
    spoon_sources = artifact(*dependencies['spoon-core'], '-sources')
    source_dir = WORK / 'sources'
    if source_dir.exists():
        shutil.rmtree(source_dir)
    source_dir.mkdir()
    for source in [sources, annotations]:
        with zipfile.ZipFile(source) as jar:
            for item in jar.namelist():
                if item.endswith('.java'):
                    path = source_dir / item
                    path.parent.mkdir(parents=True, exist_ok=True)
                    path.write_bytes(jar.read(item))
    # CheerpJ casts can have empty stack traces. Select Spoon's existing
    # exotic-JVM query mode rather than failing its static initialization.
    query_path = 'spoon/reflect/visitor/chain/CtQueryImpl.java'
    with zipfile.ZipFile(spoon_sources) as jar:
        query = jar.read(query_path).decode()
    original = 'StackTraceElement[] stack = e.getStackTrace();'
    if query.count(original) != 1:
        raise RuntimeError('Spoon query adaptation no longer matches its source')
    query = query.replace(original, original + '\n\t\t\tif (stack.length == 0) return -1;')
    path = source_dir / query_path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(query)
    classes = WORK / 'classes'
    if classes.exists():
        shutil.rmtree(classes)
    classes.mkdir()
    files = list(source_dir.rglob('*.java')) + list((ROOT / 'scripts/playground/java').rglob('*.java'))
    args = WORK / 'javac.args'
    args.write_text('\n'.join('"' + str(file) + '"' for file in files))
    subprocess.run(['javac', '--release', '17', '-cp', str(verifier), '-d', str(classes), '@' + str(args)], check=True)
    with zipfile.ZipFile(verifier) as jar, zipfile.ZipFile(OUTPUT / 'liquidjava.jar', 'w', zipfile.ZIP_DEFLATED) as out:
        for item in jar.infolist():
            # replace compiled classes, keep the remaining dependencies and resources
            if (classes / item.filename).is_file() or item.filename.endswith(('.dll', '.so', '.dylib')):
                continue
            if item.filename.startswith('META-INF/versions/') or item.filename.endswith(('.SF', '.RSA', '.DSA')):
                continue
            out.writestr(item.filename, jar.read(item.filename))
        for file in classes.rglob('*.class'):
            out.writestr(file.relative_to(classes).as_posix(), file.read_bytes())
    with zipfile.ZipFile(java_home / 'jmods/java.base.jmod') as jar, zipfile.ZipFile(OUTPUT / 'java-base.jar', 'w', zipfile.ZIP_DEFLATED) as out:
        for name in jar.namelist():
            if name.startswith('classes/') and name.endswith('.class') and name != 'classes/module-info.class':
                out.writestr(name[len('classes/'):], jar.read(name))
    with zipfile.ZipFile(z3_sources) as jar:
        native = jar.read('com/microsoft/z3/Native.java').decode()
    methods = []
    for name, params in re.findall(r'native\s+\w+\s+(INTERNAL\w+)\(([^)]*)\)', native):
        types = [param.strip().split()[0] for param in params.split(',') if param.strip()]
        api = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', name[len('INTERNAL'):]).lower()
        methods.append(dict(name=name, types=types, api=api))
    (OUTPUT / 'native-methods.json').write_text(json.dumps(methods))


if __name__ == '__main__':
    main()
