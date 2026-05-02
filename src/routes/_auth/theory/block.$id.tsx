import { createFileRoute } from '@tanstack/react-router';
import { TheoryBlock } from '@/pages/TheoryBlock';

export const Route = createFileRoute('/_auth/theory/block/$id')({
  component: TheoryBlock,
});
