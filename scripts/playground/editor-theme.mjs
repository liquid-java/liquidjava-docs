import { EditorView } from 'codemirror';
import { javaLanguage } from '@codemirror/lang-java';
import { HighlightStyle, LanguageSupport, syntaxHighlighting } from '@codemirror/language';
import { styleTags, tags } from '@lezer/highlight';

const snippetJava = javaLanguage.configure({ props: [styleTags({
  'Annotation/Identifier MarkerAnnotation/Identifier': tags.annotation,
  'ClassDeclaration/Definition InterfaceDeclaration/Definition EnumDeclaration/Definition': tags.typeName,
  'MethodDeclaration/Definition ConstructorDeclaration/Definition': tags.function(tags.variableName),
  'ImportDeclaration/ScopedIdentifier!': tags.namespace
})] });

export const editorJava = new LanguageSupport(snippetJava);

export const editorTheme = [
  EditorView.theme({
    '&': { color: '#e6edf7', backgroundColor: 'transparent' },
    '.cm-content': { caretColor: '#e6edf7', padding: '1rem 0' },
    '.cm-line': { padding: '0 1.15rem' },
    '.cm-gutters': { color: '#7f90ad', backgroundColor: 'transparent', border: 'none' },
    '.cm-activeLine, .cm-activeLineGutter': { backgroundColor: '#ffffff08' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: '#334e6880' },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#e6edf7' },
    '.cm-tooltip, .cm-panels': { color: '#e6edf7', backgroundColor: '#172033', borderColor: '#334e68' },
    '.cm-searchMatch': { backgroundColor: '#b39b5e55' },
    '.cm-searchMatch-selected': { backgroundColor: '#b39b5e88' },
    '.cm-matchingBracket': { backgroundColor: '#7dd3fc26', outline: '1px solid #7dd3fc66' }
  }, { dark: true }),
  syntaxHighlighting(HighlightStyle.define([
    { tag: tags.name, color: '#dce6f2' },
    { tag: tags.comment, color: '#7f90ad', fontStyle: 'italic' },
    { tag: [tags.keyword, tags.bool], color: '#ffb86c' },
    { tag: [tags.typeName, tags.annotation, tags.function(tags.variableName)], color: '#7dd3fc' },
    { tag: tags.string, color: '#a7f3c1' },
    { tag: tags.number, color: '#f6c177' },
    { tag: [tags.namespace, tags.attributeName], color: '#c4b5fd' },
    { tag: [tags.operator, tags.punctuation], color: '#c9d4e5' },
    { tag: tags.invalid, color: '#ffd6d6', backgroundColor: '#b43e4747' }
  ]))
];
