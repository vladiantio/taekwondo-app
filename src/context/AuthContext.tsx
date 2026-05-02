/* oxlint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

export type Profile = {
  name: string;
  license: string;
  email: string;
  password: string;
  avatar: string;
};

const DEFAULT_PROFILE_DATA: Profile = {
  name: 'Estela Martínez',
  license: '123456',
  email: 'example@example.com',
  password: '123456',
  avatar: '',
};

type AuthContextType = {
  profileData: Profile;
  setProfileData: Dispatch<SetStateAction<Profile>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
  onLogout: () => void;
};

export const AuthProvider = ({ children, onLogout }: AuthProviderProps) => {
  const [profileData, setProfileDataState] = useState<Profile>(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE_DATA;
  });

  const setProfileData: Dispatch<SetStateAction<Profile>> = (action) => {
    setProfileDataState((prev) => {
      const next =
        typeof action === 'function'
          ? (action as (p: Profile) => Profile)(prev)
          : action;
      localStorage.setItem('profileData', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext
      value={{
        profileData,
        setProfileData,
        logout: onLogout,
      }}
    >
      {children}
    </AuthContext>
  );
};
