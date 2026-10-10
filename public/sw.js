// Cache-first for static assets, network-first for navigations; works offline after first visit.
const CACHE = 'cooks-bakes-v1';
const PRECACHE = ['/', '/index.html', '/manifest.webmanifest', '/icons/icon.svg', '/icons/icon-192.png', '/icons/icon-512.png',
  ...Array.from({ length: 8 }, (_, i) => `/designs/sd${i + 1}.jpg`)];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(async (c) => {
      await c.addAll(PRECACHE);
      // Also precache the hashed JS/CSS bundles referenced by index.html so the first offline visit works.
      const html = await (await fetch('/index.html')).text();
      const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1]);
      await c.addAll(assets);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    // Allow Google Fonts etc. to be cached opportunistically
    if (request.method === 'GET' && /fonts\.(googleapis|gstatic)\.com/.test(request.url)) {
      e.respondWith(
        caches.match(request).then((hit) => hit || fetch(request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        }).catch(() => hit))
      );
    }
    return;
  }
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('/', copy));
        return res;
      }).catch(() => caches.match('/'))
    );
    return;
  }
  e.respondWith(
    caches.match(request).then((hit) => hit || fetch(request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(request, copy));
      return res;
    }))
  );
});
