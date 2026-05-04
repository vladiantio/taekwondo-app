import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/common/Button';
import { authClient } from '../../lib/auth-client';
import { useState } from 'react';

type LoginProps = {
  onLoginSuccess: () => void;
};

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid = formData.email.length > 0 && formData.password.length > 0;

  const signIn = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(
          result.error.message ||
            'Credenciales incorrectas. Inténtalo de nuevo.'
        );
      } else {
        onLoginSuccess();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ha ocurrido un error al iniciar sesión. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center bg-[url('/imgs/bg-login.webp')] bg-position-[calc(50%+30px)_center] bg-no-repeat w-full h-dvh bg-size-[150%] font-manrope item-center">
      <div className="flex justify-center items-center w-full h-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid) {
              signIn();
            }
          }}
          className="flex flex-col justify-center items-center gap-4 bg-white px-4 py-6 border border-gray-300 rounded-md w-[90%] h-fit"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <img src="/imgs/logo.webp" width={80} alt="logo escuela" />
            <h1 className="font-bold text-3xl">Iniciar sesión</h1>
            <p className="text-gray-500 text-md text-center leading-5">
              Inicia sesión en tu cuenta de Taekwondo de la escuela RAM
            </p>
          </div>
          <label className="w-full">
            <p className="sr-only">Correo electrónico</p>
            <input
              type="email"
              className="flex items-center px-4 border border-gray-300 active:border-gray-400 rounded-md w-full h-12 text-gray-900"
              placeholder="Correo electrónico"
              onChange={(event) => {
                setFormData({ ...formData, email: event.target.value });
                setError(null);
              }}
              value={formData.email}
              disabled={isLoading}
            />
          </label>
          <div className="relative w-full">
            <label htmlFor="login-password" className="sr-only">
              Contraseña
            </label>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="flex items-center px-4 pr-12 border border-gray-300 active:border-gray-400 rounded-md w-full h-12 text-gray-900"
              onChange={(event) => {
                setFormData({ ...formData, password: event.target.value });
                setError(null);
              }}
              value={formData.password}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="top-1/2 right-3 absolute focus:outline-none text-gray-500 active:text-gray-700 -translate-y-1/2"
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
              disabled={isLoading}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {error && (
            <div className="bg-red-50 p-3 border border-red-200 rounded-md w-full text-red-600 text-sm">
              {error}
            </div>
          )}
          <Button
            onClick={signIn}
            type="submit"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
          <footer>
            ¿No tienes cuenta?{' '}
            <span className="underline underline-offset-2">Pídela aquí</span>
          </footer>
        </form>
      </div>
    </section>
  );
};
