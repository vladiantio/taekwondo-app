import { ArrowLeft, Calendar } from 'lucide-react';
import { Link, useLocation, useRouter } from '@tanstack/react-router';
import { ProfileAvatar } from './ProfileAvatar';
import { Button } from '@/common/Button';

const headerTitleRoutes = [
  { to: '/exams', label: 'Exámenes' },
  { to: '/tules', label: 'Formas' },
  { to: '/theory', label: 'Teoría' },
  { to: '/account', label: 'Perfil' },
  { to: '/calendar', label: 'Calendario' },
] as const;

function normalizePathname(pathname: string) {
  const trimmed = pathname.replace(/\/$/, '') || '/';
  return trimmed;
}

function titleForPath(path: string) {
  for (const h of headerTitleRoutes) {
    if (path === h.to || path.startsWith(`${h.to}/`)) {
      return h.label;
    }
  }
  return 'Exámenes';
}

type BackButtonProps = React.ComponentProps<typeof Button> & {
  navigateTo?: string;
};

function BackButton({ navigateTo, onClick, className, ...props }: BackButtonProps) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={className}
      aria-label={navigateTo ? 'Ir a exámenes' : 'Atrás'}
      onClick={(e) => {
        onClick?.(e);
        if (navigateTo) {
          void router.navigate({ to: navigateTo });
        } else {
          router.history.back();
        }
      }}
      {...props}
    >
      <ArrowLeft size={16} />
    </Button>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const path = normalizePathname(pathname);
  const title = titleForPath(path);

  const isSubRoute =
    path !== '/' && !headerTitleRoutes.some((h) => path === h.to);

  const backToExams = path === '/calendar' || path === '/account';
  const showBack = isSubRoute || backToExams;
  const backNavigateTo = backToExams ? '/exams' : undefined;

  return (
    <header className="flex shrink-0 items-center justify-between bg-background safe-area-top-3 pb-3">
      <div className="flex items-center gap-1">
        {showBack ? (
          <BackButton className="-ml-2" navigateTo={backNavigateTo} />
        ) : null}
        <h1 className="font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/calendar"
          aria-label="Calendario"
          className="[&.active]:text-primary-500"
        >
          <Calendar width={20} height={20} />
        </Link>
        <Link to="/account" aria-label="Perfil">
          <ProfileAvatar className="size-10" />
        </Link>
      </div>
    </header>
  );
}
