import { createFileRoute } from '@tanstack/react-router';
import { TulVideo } from '@/pages/TulVideo';

export const Route = createFileRoute('/_auth/tules/$tulId/video')({
  component: TulVideo,
});
