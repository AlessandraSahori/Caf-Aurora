/* Café Aurora PWA: caché v1. Cambia a v2 para demostrar actualización. */
const CACHE_NAME = "cafe-aurora-pwa-v1";
const ARCHIVOS = [
  "./", "./index.html", "./cafeteria.html", "./contacto.html",
  "./especialidades.html", "./menu.html", "./opiniones.html", "./proceso.html",
  "./offline.html", "./manifest.json", "./CSS/estilos.css", "./JS/script.js",
  "./IMG/cafe1.jpg", "./IMG/cafegranos.jpg", "./IMG/cheesecake.jpg",
  "./IMG/croissant.jpg", "./IMG/frappe.jpg", "./IMG/hotcakes.jpg",
  "./IMG/interior.jpg", "./IMG/latte.jpg", "./IMG/matcha.jpg",
  "./IMG/panini.jpg", "./IMG/postre.jpg", "./icons/icon-192.png", "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // recursos externos como Bootstrap CDN

  // NETWORK FIRST para páginas HTML: intenta la red y recurre a caché sin conexión.
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(async () => (await caches.match(request)) || (await caches.match("./offline.html")) || (await caches.match("./index.html"))));
    return;
  }

  // CACHE FIRST para CSS, JavaScript, imágenes y otros recursos locales.
  event.respondWith(caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    });
  }));
});
