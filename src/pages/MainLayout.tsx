import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { MenuMobile } from '../components/MenuMobile';

type MainLayoutProps = {
  onLogout: () => void;
};

export const MainLayout = ({ onLogout }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col w-full h-dvh bg-[#F7F7F7] safe-area-top safe-area-bottom">
      <main className="flex-1 w-full overflow-y-auto flex flex-col pb-6 px-4">
        <Header onMenuToggle={() => setIsMenuOpen(true)} />
        <Outlet />
      </main>

      <BottomNav />

      <MenuMobile
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLogout={onLogout}
      />
    </div>
  );
};
