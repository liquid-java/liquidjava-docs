(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'liquidjava-appearance';
  let preference = 'system';
  let button;
  try {
    const saved = localStorage.getItem(key);
    if (['light', 'dark'].includes(saved)) preference = saved;
  } catch (_) { /* appearance still works when storage is unavailable */ }

  function apply() {
    root.dataset.theme = preference === 'system'
      ? (system.matches ? 'dark' : 'light') : preference;
    if (button) {
      const label = root.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
      button.title = label;
    }
  }
  apply();
  system.addEventListener('change', apply);

  document.addEventListener('DOMContentLoaded', () => {
    button = document.getElementById('appearance');
    apply();
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(key, preference);
      } catch (_) { /* keep the selection for this page */ }
      apply();
    });
  });
})();
