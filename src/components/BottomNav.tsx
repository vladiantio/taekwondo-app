import { NavLink, useLocation } from 'react-router-dom';
import { useRef, useEffect, useState, type ReactNode } from 'react';
import { BookOpenCheck, BookText, UserRound } from 'lucide-react';
import TulesIcon from '@/assets/tules.svg?react';

type IndicatorStyle = {
  left: number;
  width: number;
};

type NavItem = {
  to: string;
  icon: ReactNode;
  label: string;
};

export const BottomNav = () => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
  });

  const navRef = useRef<HTMLElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const navItems: NavItem[] = [
    {
      to: '/',
      icon: <BookOpenCheck strokeWidth={1.5} />,
      label: 'Exámenes',
    },
    {
      to: '/tules',
      icon: <TulesIcon />,
      label: 'Formas',
    },
    {
      to: '/theory',
      icon: <BookText strokeWidth={1.25} />,
      label: 'Teoría',
    },
    {
      to: '/account',
      icon: <UserRound strokeWidth={1.5} />,
      label: 'Perfil',
    },
  ];

  useEffect(() => {
    const updateIndicator = () => {
      const activeButton = buttonRefs.current[location.pathname];
      const nav = navRef.current;

      if (activeButton && nav) {
        const buttonRect = activeButton.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        setIndicatorStyle({
          left: buttonRect.left - navRect.left + buttonRect.width / 2 - 24,
          width: 48,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    return () => window.removeEventListener('resize', updateIndicator);
  }, [location.pathname]);

  return (
    <nav
      ref={navRef}
      className="sticky bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40 safe-area-bottom landscape:hidden"
      aria-label="Navegación principal"
    >
      <div
        className="absolute top-0 h-0.5 bg-primary-500 rounded-b-full transition-all duration-300 ease-out"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />

      <ul className="flex items-center h-16 max-w-2xl gap-4 p-0 mx-4 list-none">
        {navItems.map((item) => {
          const isActive =
            item.to === '/'
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

          return (
            <li
              key={item.to}
              className="flex items-center justify-center flex-1"
            >
              <NavLink
                ref={(el) => {
                  buttonRefs.current[item.to] = el;
                }}
                to={item.to}
                className={`
                  flex flex-col items-center justify-center gap-1 w-full py-2 
                  rounded-lg transition-colors duration-200
                  active:bg-gray-100 focus:outline-none focus-visible:ring-2 
                  focus-visible:ring-primary-500 focus-visible:ring-offset-2
                  ${isActive ? 'text-primary-500' : 'text-[#191919]'}
                `}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="flex items-center justify-center size-5">
                  {item.icon}
                </span>
                <span className="text-sm leading-none font-lg">
                  {item.label}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
