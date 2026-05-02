import { createFileRoute } from '@tanstack/react-router';
import { Theory } from '@/pages/Theory';

export const Route = createFileRoute('/_auth/theory/')({
  component: Theory,
});
