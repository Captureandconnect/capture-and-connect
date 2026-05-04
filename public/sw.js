// Capture & Connect — service worker
// Network-first for HTML with offline fallback; cache-first for static assets.
// Bump CACHE_VERSION to invalidate on deploy.

const CACHE_VERSION = 'cnc-v1';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const SHELL_URLS = [
  '/',
  '/404.html',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/fonts/inter-latin-wght.woff2',
  '/fonts/inter-latin-wght-italic.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

const isStaticAsset = (url) =>
  url.pathname.startsWith('/_astro/') ||
  url.pathname.startsWith('/fonts/') ||
  url.pathname.startsWith('/images/') ||
  url.pathname.startsWith('/cursors/') ||
  url.pathname.endsWith('.woff2') ||
  url.pathname.endsWith('.css') ||
  url.pathname.endsWith('.js') ||
  url.pathname.endsWith('.svg');

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML — network-first, fall back to cache, then to /404 shell
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const c = await caches.open(RUNTIME_CACHE);
          c.put(req, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(req);
          if (cached) return cached;
          const shell = await caches.match('/404.html');
          return shell || new Response('Offline', { status: 503, statusText: 'Offline' });
        }
      })()
    );
    return;
  }

  // Static — cache-first
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        try {
          const fresh = await fetch(req);
          const c = await caches.open(RUNTIME_CACHE);
          c.put(req, fresh.clone());
          return fresh;
        } catch {
          return cached || Response.error();
        }
      })()
    );
  }
});
