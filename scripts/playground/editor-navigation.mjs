function scrollTo(element, top, behavior) {
  const target = Math.max(0, Math.min(top, element.scrollHeight - element.clientHeight));
  if (Math.abs(target - element.scrollTop) < 1) return Promise.resolve();
  return new Promise(resolve => {
    const events = element === document.scrollingElement ? document : element;
    if (behavior === 'smooth') events.addEventListener('scrollend', resolve, { once: true });
    element.scrollTo({ top: target, behavior });
    if (behavior === 'instant') resolve();
  });
}

export function navigateTo(view, anchor) {
  view.requestMeasure({
    read: () => {
      const line = view.lineBlockAt(anchor);
      const editor = view.dom.getBoundingClientRect();
      return {
        editorTop: line.top + line.height / 2 - view.scrollDOM.clientHeight / 2,
        pageTop: window.scrollY + editor.top + editor.height / 2 - window.innerHeight / 2
      };
    },
    write: async ({ editorTop, pageTop }) => {
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      await Promise.all([
        scrollTo(view.scrollDOM, editorTop, behavior),
        scrollTo(document.scrollingElement, pageTop, behavior)
      ]);
      view.dispatch({ selection: { anchor } });
      view.focus();
    }
  });
}
