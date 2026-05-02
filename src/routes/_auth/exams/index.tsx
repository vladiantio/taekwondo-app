import { createFileRoute } from '@tanstack/react-router';
import { Exams } from '@/pages/Exams';

export const Route = createFileRoute('/_auth/exams/')({
  component: Exams,
});
