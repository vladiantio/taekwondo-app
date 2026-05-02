import { Outlet, useBlocker, useCanGoBack } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';

export function MainLayout() {
  const canGoBack = useCanGoBack();

  useBlocker({
    shouldBlockFn: ({ action }) => action === 'BACK' && !canGoBack,
    enableBeforeUnload: true,
  });

  return (
    <div className="flex flex-col h-full min-h-0 w-full min-w-0 *:px-4">
      <Header />
      <main className="[view-transition-name:main-content] hide-scrollbar flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-background **:data-[slot=loading-page]:h-full pb-12">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
