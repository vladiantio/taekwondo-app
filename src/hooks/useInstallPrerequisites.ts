import { useEffect, useState } from 'react';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useInstallPrerequisites = (delayMs: number) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const waitForServiceWorker = async () => {
      if (!('serviceWorker' in navigator)) return;
      await navigator.serviceWorker.ready;
    };

    const waitForCachePrimed = async () => {
      if (!('caches' in window)) return;
      while (!cancelled) {
        const keys = await caches.keys();
        if (keys.length > 0) return;
        await sleep(500);
      }
    };

    const prepare = async () => {
      await waitForServiceWorker();
      await waitForCachePrimed();
      await sleep(delayMs);
      if (!cancelled) setIsReady(true);
    };

    prepare().catch(() => setIsReady(false));

    return () => {
      cancelled = true;
    };
  }, [delayMs]);

  return isReady;
};
