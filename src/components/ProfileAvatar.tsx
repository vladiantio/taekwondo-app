import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';
import { User } from 'lucide-react';

export function ProfileAvatar({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { profileData } = useAuth();

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden transition-colors bg-gray-200 rounded-full',
        className
      )}
      {...props}
    >
      {profileData.avatar ? (
        <img
          src={profileData.avatar}
          alt="Foto de perfil"
          className="object-cover size-full"
        />
      ) : (
        <User className="size-1/2 text-gray-400" />
      )}
    </div>
  );
}
