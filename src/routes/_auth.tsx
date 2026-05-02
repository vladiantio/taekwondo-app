import { createFileRoute, redirect } from '@tanstack/react-router';
import { MainLayout } from '@/pages/MainLayout';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ location }) => {
    const isLogged = localStorage.getItem('isLogged') === 'true';
    if (!isLogged) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: MainLayout,
});
