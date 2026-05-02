import { cn } from '@/utils/cn';

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'w-full h-12 px-4 pr-24 text-gray-900 bg-white rounded-full focus:outline-none not-read-only:focus:ring-2 not-read-only:focus:ring-primary-500',
        className
      )}
      {...props}
    />
  );
}
