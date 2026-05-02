import { Link, useLocation } from '@tanstack/react-router';
import { BookText, GraduationCap } from 'lucide-react';
import TulesIcon from '@/assets/tules.svg?react';
import { cn } from '@/utils/cn';

function isNavItemActive(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

type NavItem = {
  to: string;
  altPath?: string;
  icon: React.ReactNode;
  label: string;
};

const navItems: NavItem[] = [
  {
    to: '/tules',
    icon: <TulesIcon />,
    label: 'Formas',
  },
  {
    to: '/exams',
    icon: <GraduationCap strokeWidth={2} />,
    label: 'Exámenes',
  },
  {
    to: '/theory',
    icon: <BookText strokeWidth={2} />,
    label: 'Teoría',
  },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  const activeIndex = navItems.findIndex((item) => isNavItemActive(pathname, item.to));
  const hasActiveTab = activeIndex !== -1;

  return (
    <nav
      className="[view-transition-name:bottom-nav] shrink-0 safe-area-bottom-2 landscape:hidden -mt-8"
      aria-label="Navegación principal"
    >
      <div className="relative h-16 max-w-2xl mx-auto rounded-full bg-primary-500">
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-1 bottom-1 left-6 z-0 w-[calc((100%-3rem-0.5rem)/3)] rounded-full bg-white/10 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none will-change-transform',
            !hasActiveTab && 'opacity-0'
          )}
          style={{
            transform: `translate3d(calc(${hasActiveTab ? activeIndex : 0} * (100% + 0.25rem)),0,0)`,
          }}
        />
        <ul className="relative z-10 flex items-center h-full gap-1 px-8 text-sm font-medium leading-none">
          {navItems.map((item) => (
            <li key={item.to} className="flex-1 min-w-0">
              <Link
                to={item.to}
                activeOptions={{
                  includeHash: false,
                }}
                className={cn(
                  'flex flex-col items-center justify-center h-14 gap-1 rounded-full transition-colors duration-200 focus:outline-none',
                  'text-white/65 [&.active]:text-white',
                  'hover:text-white/90'
                )}
                aria-label={item.label}
              >
                <span className="flex items-center justify-center size-5">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
