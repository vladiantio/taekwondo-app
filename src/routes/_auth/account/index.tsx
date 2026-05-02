import { createFileRoute } from '@tanstack/react-router';
import { AccountMenu } from '@/pages/Account';

export const Route = createFileRoute('/_auth/account/')({
  component: AccountMenu,
});
