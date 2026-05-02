import { createFileRoute } from '@tanstack/react-router';
import { TulManagement } from '@/pages/TulManagement';

export const Route = createFileRoute('/_auth/tules/$tulId/')({
  component: TulManagement,
});
