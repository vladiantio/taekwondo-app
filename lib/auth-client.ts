import { createAuthClient } from 'better-auth/react';

const baseURL = window.__APP_CONFIG__?.baseURL ?? import.meta.env.VITE_BASE_URL;

if (!baseURL) {
  throw new Error('baseURL is not configured (window.__APP_CONFIG__.baseURL or VITE_BASE_URL)');
}

export const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
  baseURL,
});
