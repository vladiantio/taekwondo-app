import { Book, Paperclip, User, X } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { Button } from '@/common/Button';
import TulesIcon from '@/assets/tules.svg?react';
import { useAuth } from '@/context/AuthContext';

type NavItem = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

type MenuMobileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MenuMobile = ({ isOpen, onClose }: MenuMobileProps) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      to: '/',
      icon: <Book />,
      label: 'Exámenes',
    },
    {
      to: '/tules',
      icon: <TulesIcon />,
      label: 'Formas',
    },
    {
      to: '/theory',
      icon: <Paperclip />,
      label: 'Teoría',
    },
    {
      to: '/account',
      icon: <User />,
      label: 'Perfil',
    },
  ];

  return (
    <div
      className={`fixed inset-0 bg-white transition-transform duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <header className="flex items-center justify-between flex-none w-full px-4 my-4 safe-area-top">
        <a href="/">
          <img src="/imgs/logo.webp" width={64} alt="Logo de la escuela RAM" />
        </a>

        <button
          onClick={onClose}
          type="button"
          className="transition-colors duration-200 rounded-lg active:bg-gray-100"
          aria-label="Cerrar menú"
        >
          <X width={20} height={20} />
        </button>
      </header>

      <nav className="flex flex-col py-6 overflow-y-auto flex-1">
        {navItems.map((item, index) => {
          const isActive =
            item.to === '/'
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-4 border-primary'
                  : 'text-gray-700 active:bg-gray-50'
              }`}
              style={{
                animation: isOpen
                  ? `slideIn 0.3s ease-out ${index * 0.05}s both`
                  : 'none',
              }}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="text-lg font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 pt-4 pb-6 border-t border-gray-200">
        <Button onClick={logout}>Cerrar sesión</Button>
      </div>
    </div>
  );
};
