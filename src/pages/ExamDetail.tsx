import { useParams, Link } from "react-router-dom";
import { BookOpen, Dumbbell } from "lucide-react";
import { exams } from "../consts/exams";
import { tuls } from "../consts/tuls";
import { useProgress } from "../context/ProgressContext";

// Mapeo de qué tules corresponden a cada examen
const examTuls: Record<string, string[]> = {
	"gup-9": ["saju-jirugi", "saju-makgi"],
	"gup-8": ["chon-ji"],
	"gup-7": ["dan-gun"],
	"gup-6": ["do-san"],
	"gup-5": ["won-hyo"],
	"gup-4": ["yul-gok"],
	"gup-3": ["joong-gun"],
	"gup-2": ["toi-gye"],
	"gup-1": ["hwa-rang"],
	"dan-1": ["choong-moo"],
	"dan-2": ["kwang-gae", "po-eun", "ge-baek"],
	"dan-3": ["eui-am", "choong-jang", "juche"],
};

export const ExamDetail = () => {
	const { examId } = useParams<{ examId: string }>();
	const { getTulStatus } = useProgress();

	const exam = exams.find((e) => e.id === examId);

	if (!exam) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 py-12">
				<p className="text-gray-500">Examen no encontrado</p>
				<Link to="/" className="underline text-primary-500">
					Volver al inicio
				</Link>
			</div>
		);
	}

	const requiredTuls = (examTuls[exam.id] || [])
		.map((tulId) => tuls.find((t) => t.id === tulId))
		.filter(Boolean);

	return (
		<section className="flex flex-col gap-6 pt-4">
			{/* Header con imagen */}
			<div className="flex items-center gap-4">
				<img src={exam.img} alt={exam.range} className="w-24" />
				<div>
					<h1 className="text-2xl font-bold text-gray-800">{exam.range}</h1>
					<p className="text-gray-500">{exam.color}</p>
				</div>
			</div>

			{/* Tules requeridos */}
			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-2">
					<Dumbbell className="w-5 h-5 text-primary-500" />
					<h2 className="text-lg font-semibold">Tules requeridos</h2>
				</div>
				{requiredTuls.length > 0 ? (
					<div className="space-y-2">
						{requiredTuls.map((tul) => {
							if (!tul) return null;
							const status = getTulStatus(tul.id);
							return (
								<Link
									key={tul.id}
									to={`/tules/${tul.id}`}
									className="flex items-center justify-between p-3 transition-colors bg-white border border-gray-200 rounded-lg hover:border-primary-500"
								>
									<div className="flex items-center gap-3">
										<div
											className={`w-3 h-3 rounded-full ${
												status === "completed"
													? "bg-green-500"
													: status === "in_progress"
														? "bg-amber-500"
														: "bg-gray-300"
											}`}
										/>
										<div>
											<div className="flex items-center gap-2">
												<p className="font-medium">{tul.name}</p>
												{tul.isPreTul && (
													<span className="px-1.5 py-0.5 text-xs font-medium text-white rounded bg-amber-500">
														Pre-Tul
													</span>
												)}
											</div>
											<p className="text-xs text-gray-500">
												{tul.moves} movimientos
											</p>
										</div>
									</div>
									<span className="text-sm text-gray-400">
										{tul.korean_name}
									</span>
								</Link>
							);
						})}
					</div>
				) : (
					<p className="text-sm text-gray-500">
						No hay tules específicos para este nivel.
					</p>
				)}
			</div>

			{/* Teoría requerida (placeholder) */}
			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-2">
					<BookOpen className="w-5 h-5 text-primary-500" />
					<h2 className="text-lg font-semibold">Teoría requerida</h2>
				</div>
				<div className="p-4 text-center border border-gray-300 border-dashed rounded-lg">
					<p className="text-sm text-gray-400">Próximamente...</p>
				</div>
			</div>
		</section>
	);
};
