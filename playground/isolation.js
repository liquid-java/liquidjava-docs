// GitHub Pages cannot set these headers; isolate pages within this worker’s scope.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  // a root-hosted website must not isolate neighboring GitHub Pages projects
  const relative = url.pathname.slice(new URL('./', self.location.href).pathname.length);
  if (event.request.mode === 'navigate' && relative.includes('/')) return;
  event.respondWith((async () => {
    const response = await fetch(event.request);
    if (response.type === 'opaque') return response;
    const headers = new Headers(response.headers);
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  })());
});
