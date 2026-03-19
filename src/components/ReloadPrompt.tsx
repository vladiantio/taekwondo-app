import { Button } from '@/common/Button';
import { useRegisterSW } from 'virtual:pwa-register/react';

const period = 30 * 1000;

function registerPeriodicSync(swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return;

  setInterval(async () => {
    if (r.installing || !navigator) return;
    if ('onLine' in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache',
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
}

export function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === 'activated') registerPeriodicSync(swUrl, r);
        });
      }
    },
  });

  function close() {
    setNeedRefresh(false);
  }

  if (!needRefresh) return null;

  return (
    <div
      className="fixed right-0 bottom-0 z-100 border bg-white m-6 px-6 py-4 rounded-lg shadow-xl flex flex-col gap-3"
      role="alertdialog"
      aria-labelledby="pwa-reload-message"
    >
      <p id="pwa-reload-message" className="font-semibold">
        ¡Nuevo contenido disponible!
      </p>
      <p className="text-gray-600 text-pretty">
        ¿Quieres recargar la app para obtener los últimos cambios?
      </p>
      <div className="flex gap-3 mt-1">
        <Button
          className="flex-1"
          type="button"
          onClick={() => updateServiceWorker(true)}
        >
          Recargar
        </Button>
        <Button
          className="flex-1"
          type="button"
          variant="outline"
          onClick={close}
        >
          No, gracias
        </Button>
      </div>
    </div>
  );
}
