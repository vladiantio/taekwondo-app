import { useState, useEffect } from 'react';
import { useBlocker, useCanGoBack } from '@tanstack/react-router';
import {
  Drawer,
  DrawerPopup,
  DrawerTitle,
  DrawerDescription,
  DrawerContent,
  DrawerClose,
} from '@/common/Drawer';
import { Button } from '@/common/Button';

export function ExitConfirmation() {
  const canGoBack = useCanGoBack();

  const blocker = useBlocker({
    // Si el usuario intenta ir hacia atrás (BACK) y no hay historial previo en la app
    // esto suele significar que la app se cerraría en móviles.
    shouldBlockFn: ({ action }) => action === 'BACK' && !canGoBack,
    withResolver: true,
  });

  return <ExitConfirmDrawer blocker={blocker} />;
}

function ExitConfirmDrawer({
  blocker: { proceed, reset, status },
}: {
  blocker: ReturnType<typeof useBlocker>;
}) {
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Efecto para abrir el diálogo cuando el blocker se activa
  useEffect(() => {
    if (status === 'blocked') {
      setShowExitDialog(true);
    }
  }, [status]);

  return (
    <Drawer
      open={showExitDialog}
      onOpenChange={(open) => {
        if (!open) reset?.();
      }}
    >
      <DrawerPopup
        className="landscape:mx-auto landscape:max-w-sm"
        withHandle={false}
      >
        <DrawerContent className="flex flex-col gap-2 text-center">
          <DrawerTitle className="text-xl font-bold">
            ¿Vas a salir de la app?
          </DrawerTitle>
          <DrawerDescription className="text-gray-500 text-balance">
            Parece que vas a cerrar la aplicación. ¿Estás seguro de que quieres
            salir?
          </DrawerDescription>

          <div className="flex gap-4 mt-4">
            <DrawerClose
              render={
                <Button variant="outline" className="text-black">
                  Cancelar
                </Button>
              }
            />
            <Button onClick={proceed}>Sí, cerrar app</Button>
          </div>
        </DrawerContent>
      </DrawerPopup>
    </Drawer>
  );
}
