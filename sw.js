const CACHE_NAME = "kele-v4-cache";
const ASSETS = [
  "index.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

// Installation : Mise en cache des fichiers de base
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Stratégie de cache : Réseau d'abord, sinon Cache
self.addEventListener("fetch", (event) => {
  // On laisse le navigateur gérer les requêtes audio directement 
  // car elles sont déjà gérées manuellement dans votre index.html
  if (event.request.url.includes('everyayah.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
