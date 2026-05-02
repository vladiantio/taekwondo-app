import { useState, useRef } from 'react';
import { Eye, EyeOff, Upload } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { belts } from '@/consts/belts';
import { exams, type Exam } from '@/consts/exams';
import { BeltIcon } from '@/components/BeltIcon';
import { useAuth, type Profile } from '@/context/AuthContext';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { Button } from '@/common/Button';
import { Separator } from '@/common/Separator';
import { Input } from '@/common/Input';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@/common/Drawer';
import { Outlet, useNavigate, useRouter } from '@tanstack/react-router';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/common/Select';

export function AccountMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full gap-3">
      <Button
        variant="outline"
        className="text-black"
        onClick={() => navigate({ to: '/account/edit' })}
      >
        Editar perfil
      </Button>
      <LogoutButton />
    </div>
  );
}

export function AccountEdit() {
  const router = useRouter();
  const { profileData, setProfileData } = useAuth();
  const [profile, setProfile] = useState<Profile>(profileData);
  const [showPassword, setShowPassword] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setProfileData(profile);
    router.history.back();
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-1">
        <label
          htmlFor="email-input"
          className="text-sm font-medium text-gray-700"
        >
          Correo electrónico
        </label>
        <Input
          ref={emailInputRef}
          id="email-input"
          type="email"
          value={profile.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="tu@email.com"
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <label
          htmlFor="password-input"
          className="text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <div className="relative flex items-center">
          <Input
            ref={passwordInputRef}
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            value={profile.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Tu contraseña"
          />
          <div className="absolute flex items-center gap-1 right-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword((prev) => !prev)}
              className="focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff className="size-4 text-gray-500" />
              ) : (
                <Eye className="size-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <Button
          variant="outline"
          className="flex-1 text-black"
          onClick={() => router.history.back()}
        >
          Cancelar
        </Button>
        <Button className="flex-1" onClick={handleSave}>
          Guardar
        </Button>
      </div>
    </div>
  );
}

function UploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setProfileData } = useAuth();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Button
        size="icon-sm"
        className="absolute bottom-0 right-0 size-9"
        onClick={handleAvatarClick}
      >
        <Upload size={16} color="#ffffff" />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        aria-label="Seleccionar imagen de perfil"
      />
    </>
  );
}

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Drawer>
      <DrawerTrigger
        render={<Button variant="outline">Cerrar sesión</Button>}
      />
      <DrawerPopup
        className="landscape:mx-auto landscape:max-w-sm"
        withHandle={false}
      >
        <DrawerContent className="flex flex-col gap-6">
          <DrawerTitle className="text-center">
            ¿Deseas cerrar la sesión?
          </DrawerTitle>
          <div className="flex gap-4">
            <DrawerClose
              render={
                <Button variant="outline" className="text-black">
                  No
                </Button>
              }
            />
            <Button onClick={logout}>Cerrar sesión</Button>
          </div>
        </DrawerContent>
      </DrawerPopup>
    </Drawer>
  );
}

function ExamSelectValue({ exam }: { exam: Exam }) {
  const belt = belts.find((b) => b.id === exam?.belt);
  return (
    <span className="flex items-center gap-4 w-full">
      {belt && <BeltIcon belt={belt} className="size-10 shrink-0" />}
      <span className="flex flex-col">
        <span className="text-xs">Nivel {exam.range}</span>
        <span className="font-manrope font-black">Cinturón {belt?.label}</span>
      </span>
    </span>
  );
}

export function Account() {
  const { currentExam, setCurrentExam } = useProgress();
  const { profileData } = useAuth();

  const exam = exams.find((e) => e.id === currentExam);

  return (
    <div className="flex flex-col items-center w-full gap-6">
      {/* Foto de perfil, nombre y número de licencia */}
      <div className="flex flex-col items-center gap-1">
        <div className="relative mb-2">
          <ProfileAvatar className="size-32" />
          <UploadButton />
        </div>
        <h1 className="text-xl font-semibold text-gray-900">
          {profileData.name}
        </h1>
        <span className="font-medium text-gray-400">
          N° {profileData.license}
        </span>
      </div>

      <Select
        value={exam}
        onValueChange={(exam) => setCurrentExam(exam?.id ?? currentExam)}
        itemToStringValue={(item) => item.id}
      >
        <SelectTrigger className="py-3 pr-3.5 pl-4 w-full">
          <SelectValue>
            {(item: Exam) => <ExamSelectValue exam={item} />}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Exámenes</SelectLabel>
            {exams.map((item) => (
              <SelectItem key={item.id} value={item}>
                <ExamSelectValue exam={item} />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Separator className="bg-neutral-200" />

      <Outlet />
    </div>
  );
}
