import { createFileRoute } from '@tanstack/react-router';
import { Tules } from '@/pages/Tules';

export const Route = createFileRoute('/_auth/tules/')({
  component: Tules,
});
