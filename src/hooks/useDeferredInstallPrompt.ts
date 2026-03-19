import type { BeforeInstallPromptEvent } from '../consts/install';

import { useEffect, useMemo, useState } from 'react';

export const useDeferredInstallPrompt = () => {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setPromptEvent(event);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  return useMemo(
    () => ({
      promptEvent,
      resetPrompt: () => setPromptEvent(null),
    }),
    [promptEvent]
  );
};
