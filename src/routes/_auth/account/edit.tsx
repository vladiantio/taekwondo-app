import { createFileRoute } from '@tanstack/react-router';
import { AccountEdit } from '@/pages/Account';

export const Route = createFileRoute('/_auth/account/edit')({
  component: AccountEdit,
});
