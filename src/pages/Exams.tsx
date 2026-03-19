import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { type Exam, exams } from '../consts/exams';

export const Exams = () => {
  // const { currentBelt, getCompletedCount, getProgressPercentage } = useProgress();

  return (
    <section className="flex flex-col gap-4 pt-4">
      <h1 className="text-xl">Selecciona tu examen</h1>
      <div className="space-y-2">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </section>
  );
};

const ExamCard = ({ exam }: { exam: Exam }) => {
  return (
    <Link
      to={`/exam/${exam.id}`}
      className="flex items-center justify-between px-3 py-5 transition-shadow bg-white rounded-full shadow-xs hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <img src={exam.img} alt={exam.range} width={50} />
        <h2 className="font-semibold text-[14px] text-gray-800">{exam.range}</h2>
      </div>
      <ChevronRight color="#191919" size={20} />
    </Link>
  );
};
