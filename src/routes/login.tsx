import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { Login } from '@/pages/Login';
import { z } from 'zod';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const isLogged = localStorage.getItem('isLogged') === 'true';
    if (isLogged) {
      throw redirect({
        to: '/',
      });
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: LoginComponent,
});

function LoginComponent() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  return (
    <Login
      onLoginSuccess={() => {
        localStorage.setItem('isLogged', 'true');
        navigate({ to: redirect ?? '/' });
      }}
    />
  );
}
