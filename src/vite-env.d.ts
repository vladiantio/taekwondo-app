/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-svgr/client" />

interface AppConfig {
  baseURL: string;
}

declare global {
  interface Window {
    __APP_CONFIG__?: AppConfig;
  }
}

export {};
