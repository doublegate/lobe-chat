import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

// eslint-disable-next-line no-undef
declare const self: ServiceWorkerGlobalScope;

// Filter out large PostgreSQL assets from precaching to avoid service worker limits
// These assets are too large (> 5MB) and would exceed service worker cache limits
const filteredManifest = self.__SW_MANIFEST?.filter((entry) => {
  const url = typeof entry === 'string' ? entry : entry.url;
  // Exclude large PostgreSQL WASM and data files to prevent SW precache size limits
  return !url.includes('postgres.') || (!url.endsWith('.wasm') && !url.endsWith('.data'));
}) || [];

const serwist = new Serwist({
  clientsClaim: true,
  navigationPreload: true,
  precacheEntries: filteredManifest,
  runtimeCaching: defaultCache,
  skipWaiting: true,
});

serwist.addEventListeners();
