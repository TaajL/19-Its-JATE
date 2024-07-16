
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Register route for caching static resources (CSS, JS)
// This route uses the StaleWhileRevalidate strategy, which serves content from cache
// and loads it from the source if needed.
registerRoute(
  ({ request }) => {
    // Check if the request is for a CSS or JS file
    return request.destination === 'style' || request.destination === 'script';
  },
  new StaleWhileRevalidate({
    // Cache name for static resources
    cacheName: 'static-resources',
    plugins: [
      // Cacheable response plugin to cache responses with status codes 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Register route for caching images
// This route uses the CacheFirst strategy, which is often the best choice for images
// because it saves bandwidth and improves performance.
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    // Cache name for images
    cacheName: 'my-image-cache',
    plugins: [
      // Cacheable response plugin to cache responses with status codes 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // Expiration plugin to set a maximum age for cached images (30 days)
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);