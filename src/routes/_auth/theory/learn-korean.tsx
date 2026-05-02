import { createFileRoute } from '@tanstack/react-router';
import { TheoryLearnKorean } from '@/pages/Theory';

export const Route = createFileRoute('/_auth/theory/learn-korean')({
  component: TheoryLearnKorean,
});
