import { createFileRoute } from '@tanstack/react-router';
import { ExamDetail } from '@/pages/ExamDetail';

export const Route = createFileRoute('/_auth/exams/$examId')({
  component: ExamDetail,
});
