import { cn } from '@/utils/cn';
import { Spinner } from '@/common/Spinner';

export function LoadingPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col h-dvh items-center justify-center',
        className
      )}
      data-slot="loading-page"
      {...props}
    >
      <Spinner className="size-8" />
    </div>
  );
}
