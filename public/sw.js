// Enregistrer le service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  
  // Installer le service worker
  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-pwa-cache1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
//           '/assets/css/templatemo-softy-pinko.css',
//           '/assets/js/custom.js',
//           '/assets/images/logo.png'
        ]);
      })
    );
  });
  
  // Récupérer les ressources depuis le cache ou le réseau
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  
  // Mise à jour du service worker
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('my-pwa-') && cacheName !== 'my-pwa-cache';
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  
