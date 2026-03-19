import { cn } from '@/utils/cn';

const variantClass = {
  primary: 'bg-primary-500 active:bg-phover-500 text-white',
  outline: 'bg-white active:bg-neutral-100 border text-primary-500',
};

const sizeClass = {
  default: 'w-full h-12 px-4 py-2',
  sm: 'w-full h-8 px-2 py-1',
  lg: 'w-full h-16 px-6 py-3',
  'icon-sm': 'size-8',
  'icon-md': 'size-12',
  'icon-lg': 'size-16',
};

export const Button = ({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: React.ComponentProps<'button'> & {
  variant?: keyof typeof variantClass;
  size?: keyof typeof sizeClass;
}) => {
  return (
    <button
      {...props}
      className={cn(
        'flex items-center justify-center gap-2 font-medium rounded-full whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed',
        variantClass[variant],
        sizeClass[size],
        className
      )}
    />
  );
};
