// const CACHE_NAME = "footballnews";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/save.html', revision: '1' },
  { url: '/pages/team.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/icon2.png', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
);


// self.addEventListener('fetch', (event) => {
//   event.respondWith(async function () {
//     const cache = await caches.open(CACHE_NAME);
//     const cachedResponse = await cache.match(event.request);
//     if (cachedResponse) return cachedResponse;
//     const networkResponse = await fetch(event.request);
//     event.waitUntil(
//       cache.put(event.request, networkResponse.clone())
//     );
//     return networkResponse;
//   }());
// });



  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'icon2.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });