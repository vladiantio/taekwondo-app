import { useState, useRef } from "react";
import { Edit, User, Eye, EyeOff, Pencil, Check } from "lucide-react";
import { useProgress } from "../context/ProgressContext";
import { exams } from "../consts/exams";
import { getInitialProfileData } from "@/utils/getInitialProfileData";

export const Account = () => {
	const { currentBelt, setCurrentBelt } = useProgress();
	const [profileData, setProfileData] = useState(getInitialProfileData);
	const [showPassword, setShowPassword] = useState(false);
	const [isEditingEmail, setIsEditingEmail] = useState(false);
	const [isEditingPassword, setIsEditingPassword] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const currentExam = exams.find((e) => e.id === currentBelt);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const newProfileData = {
					...profileData,
					avatar: reader.result as string,
				};
				setProfileData(newProfileData);
				localStorage.setItem("profileData", JSON.stringify(newProfileData));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleInputChange = (field: "email" | "password", value: string) => {
		const newProfileData = {
			...profileData,
			[field]: value,
		};
		setProfileData(newProfileData);
		localStorage.setItem("profileData", JSON.stringify(newProfileData));
	};

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	const toggleEditEmail = () => {
		const willBeEditing = !isEditingEmail;
		setIsEditingEmail(willBeEditing);
		if (willBeEditing) {
			setTimeout(() => emailInputRef.current?.focus(), 0);
		}
	};

	const toggleEditPassword = () => {
		const willBeEditing = !isEditingPassword;
		setIsEditingPassword(willBeEditing);
		if (willBeEditing) {
			setTimeout(() => passwordInputRef.current?.focus(), 0);
		}
	};

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex flex-col items-center w-full gap-6 py-8">
				{/* Foto de perfil y nombre */}
				<div className="flex flex-col items-center gap-3">
					<div className="relative">
						<button
							type="button"
							onClick={handleAvatarClick}
							className="relative flex items-center justify-center w-32 h-32 overflow-hidden transition-colors bg-gray-200 border-4 border-gray-200 rounded-full active:border-primary-500"
							aria-label="Cambiar foto de perfil"
						>
							{profileData.avatar ? (
								<img
									src={profileData.avatar}
									alt="Foto de perfil"
									className="object-cover w-full h-full"
								/>
							) : (
								<User className="w-16 h-16 text-gray-400" />
							)}
						</button>
						<div className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 border-2 border-white rounded-full bg-primary-500">
							<Edit width={16} height={16} color="#ffffff" />
						</div>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
							aria-label="Seleccionar imagen de perfil"
						/>
					</div>
					<h1 className="text-xl font-semibold text-gray-900">
						{profileData.name}
					</h1>
				</div>

				<div className="flex items-center w-full h-12 gap-3 px-4 bg-white border border-gray-200 rounded-full">
					{currentExam && (
						<img
							src={currentExam.img}
							alt={currentExam.range}
							className="h-8"
						/>
					)}
					<select
						value={currentBelt}
						onChange={(e) => setCurrentBelt(e.target.value)}
						className="flex-1 h-full text-gray-900 bg-white focus:outline-none"
						aria-label="Seleccionar cinturón actual"
					>
						{exams.map((exam) => (
							<option key={exam.id} value={exam.id}>
								{exam.range}
							</option>
						))}
					</select>
				</div>

				{/* Campos de datos */}
				<div className="flex flex-col w-full gap-3">
					<div className="flex flex-col w-full gap-1">
						<label
							htmlFor="license-input"
							className="text-sm font-medium text-gray-700"
						>
							Número de licencia
						</label>
						<input
							id="license-input"
							type="text"
							value={profileData.license}
							readOnly
							className="w-full h-12 px-4 text-gray-900 bg-white border border-gray-200 rounded-full focus:outline-none"
							aria-readonly="true"
						/>
					</div>

					<div className="flex flex-col w-full gap-1">
						<label
							htmlFor="email-input"
							className="text-sm font-medium text-gray-700"
						>
							Correo electrónico
						</label>
						<div className="relative flex items-center">
							<input
								ref={emailInputRef}
								id="email-input"
								type="email"
								value={profileData.email}
								onChange={(e) => handleInputChange("email", e.target.value)}
								readOnly={!isEditingEmail}
								className={`w-full h-12 px-4 pr-12 text-gray-900 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
									isEditingEmail ? "border-primary-500" : "border-gray-200"
								} ${!isEditingEmail ? "cursor-default" : ""}`}
								placeholder="tu@email.com"
								aria-describedby="email-edit-hint"
							/>
							<button
								type="button"
								onClick={toggleEditEmail}
								className="absolute flex items-center justify-center w-8 h-8 transition-colors rounded-full right-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
								aria-label={
									isEditingEmail
										? "Guardar correo electrónico"
										: "Editar correo electrónico"
								}
							>
								{isEditingEmail ? (
									<Check className="w-4 h-4 text-green-600" />
								) : (
									<Pencil className="w-4 h-4 text-gray-500" />
								)}
							</button>
						</div>
						<span id="email-edit-hint" className="sr-only">
							{isEditingEmail
								? "Campo editable. Pulsa el botón de guardar cuando termines."
								: "Pulsa el botón de editar para modificar."}
						</span>
					</div>

					<div className="flex flex-col w-full gap-1">
						<label
							htmlFor="password-input"
							className="text-sm font-medium text-gray-700"
						>
							Contraseña
						</label>
						<div className="relative flex items-center">
							<input
								ref={passwordInputRef}
								id="password-input"
								type={showPassword ? "text" : "password"}
								value={profileData.password}
								onChange={(e) => handleInputChange("password", e.target.value)}
								readOnly={!isEditingPassword}
								className={`w-full h-12 px-4 pr-24 text-gray-900 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
									isEditingPassword ? "border-primary-500" : "border-gray-200"
								} ${!isEditingPassword ? "cursor-default" : ""}`}
								placeholder="Tu contraseña"
								aria-describedby="password-edit-hint"
							/>
							<div className="absolute flex items-center gap-1 right-2">
								<button
									type="button"
									onClick={() => setShowPassword((prev) => !prev)}
									className="flex items-center justify-center w-8 h-8 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
									aria-label={
										showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
									}
									aria-pressed={showPassword}
								>
									{showPassword ? (
										<EyeOff className="w-4 h-4 text-gray-500" />
									) : (
										<Eye className="w-4 h-4 text-gray-500" />
									)}
								</button>
								<button
									type="button"
									onClick={toggleEditPassword}
									className="flex items-center justify-center w-8 h-8 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
									aria-label={
										isEditingPassword
											? "Guardar contraseña"
											: "Editar contraseña"
									}
								>
									{isEditingPassword ? (
										<Check className="w-4 h-4 text-green-600" />
									) : (
										<Pencil className="w-4 h-4 text-gray-500" />
									)}
								</button>
							</div>
						</div>
						<span id="password-edit-hint" className="sr-only">
							{isEditingPassword
								? "Campo editable. Pulsa el botón de guardar cuando termines."
								: "Pulsa el botón de editar para modificar."}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
