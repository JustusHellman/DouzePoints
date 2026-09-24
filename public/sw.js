// Build Hash: __BUILD_HASH__
// Extract version from query parameter or fallback to a default
const urlParams = new URL(self.location.href).searchParams;
const version = urlParams.get('v') || '__BUILD_HASH__';
const CACHE_NAME = `douze-points-${version}`;

// In production, the build process replaces all instances of __BUILD_HASH__ 
// with the actual build date. In development, it remains unchanged.
const RAW_HASH = '__BUILD_HASH__';
const IS_DEV = RAW_HASH === '__BUILD' + '_HASH__';

const ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/og-image.png',
  '/manifest.json'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
  
  if (IS_DEV) return; // Don't cache anything in development
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      clients.claim(), // Take control of all open clients immediately
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // In dev mode, delete ALL caches to prevent stale data.
            // In prod mode, delete old version caches.
            if (IS_DEV || cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Fetch event - Network First strategy for the main page, Cache First for others
self.addEventListener('fetch', (event) => {
  // In development, ALWAYS use the network and never touch the cache
  if (IS_DEV) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Only cache GET requests. Bypass cache for POST, PUT, DELETE, etc.
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  const url = new URL(event.request.url);
  
  // For the main page and navigation, use Network First
  if (event.request.mode === 'navigate' || url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Update the cache with the new version
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try the cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // For other assets, use Cache First
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // Optionally cache new assets on the fly
        if (fetchResponse.status === 200) {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return fetchResponse;
      });
    })
  );
});