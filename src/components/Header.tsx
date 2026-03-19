import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="relative z-40 flex items-center justify-between flex-none my-4 safe-area-top">
      <a href="/">
        <img src="/imgs/logo.webp" width={64} alt="Logo de la escuela RAM" />
      </a>

      <button
        type='button'
        onClick={onMenuToggle}
        className="transition-colors rounded-lg duration-2F00 active:bg-gray-100"
        aria-label="Abrir menú"
      >
        <Menu width={20} height={20} />
      </button>
    </header>
  );
};
