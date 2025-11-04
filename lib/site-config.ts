export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kaynar.av.tr').replace(/\/+$/, '');

// Google Maps embed URL
// Note: NEXT_PUBLIC_* envs are inlined at build time. Provide a safe default for production
// if the env is missing on the server.
export const MAP_EMBED_URL =
  process.env.NEXT_PUBLIC_MAP_EMBED_URL ??
  'https://maps.google.com/maps?q=41.0127749,28.9079198&hl=tr&z=17&output=embed';
