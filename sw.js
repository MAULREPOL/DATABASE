
const CACHE_NAME = 'mi-app-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/estilo.css',
  '/java.js',
  '/manifest.json',
  '/teto-192.jpg',
  '/teto-512.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

