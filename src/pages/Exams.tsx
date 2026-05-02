import { Link } from '@tanstack/react-router';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { type Exam, exams } from '@/consts/exams';
import { belts } from '@/consts/belts';
import { BeltIcon } from '@/components/BeltIcon';
import { useProgress } from '@/context/ProgressContext';
import { cn } from '@/utils/cn';
import ExamLine from '@/assets/exam-line.svg?react';
import { useLayoutEffect, useRef } from 'react';

const PERIOD = 4;
const AMPLITUDE = 2;

export function Exams() {
  const anchorElement = useRef<HTMLAnchorElement>(null);
  const { currentExam } = useProgress();
  const currentExamIndex = exams.findIndex((exam) => exam.id === currentExam);
  const offset = (PERIOD - (currentExamIndex % PERIOD)) % PERIOD;

  useLayoutEffect(() => {
    const el = anchorElement.current;
    if (!el) return;
    const main = el.closest('main');
    if (!main) return;

    const elRect = el.getBoundingClientRect();
    const mainRect = main.getBoundingClientRect();
    const y = elRect.top - mainRect.top + main.scrollTop;
    const target = y - (main.clientHeight - elRect.height) / 2;
    main.scrollTo({ top: Math.max(0, target) });
  }, []);

  return (
    <section className="flex flex-col gap-4 pt-4">
      <CurrentExam />
      <div className="space-y-6">
        {exams.map((exam, i) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            currentIndex={currentExamIndex}
            index={i}
            isActive={i === currentExamIndex}
            offset={offset}
            ref={i === currentExamIndex ? anchorElement : undefined}
          />
        ))}
      </div>
    </section>
  );
}

function CurrentExam() {
  const { currentExam } = useProgress();
  const exam = exams.find((exam) => exam.id === currentExam);
  const belt = belts.find((belt) => belt.id === exam?.belt);

  return (
    <Link
      to="/exams/$examId"
      params={{ examId: exam?.id ?? '' }}
      className="bg-[#2D2D2D] text-white flex rounded-xl shadow-[0_6px_0_#000] h-20"
    >
      <div className="flex flex-col justify-center flex-1 px-4">
        <small>Continuar con</small>
        <strong>Examen Cinturón {belt?.label}</strong>
      </div>
      <div className="flex items-center px-4 border-l-2 border-black">
        <GraduationCap />
      </div>
    </Link>
  );
}

function ExamCard({
  className,
  style,
  exam,
  currentIndex,
  index,
  isActive,
  offset,
  ...props
}: React.ComponentProps<'a'> & {
  exam: Exam;
  currentIndex: number;
  index: number;
  isActive: boolean;
  offset: number;
}) {
  const belt = belts.find((belt) => belt.id === exam.belt);
  const isLast = exams.length - 1 === index;
  const phase = (index + offset) % PERIOD;
  const margin = AMPLITUDE - Math.abs(phase - AMPLITUDE);
  const flipLine = Math.floor(phase / AMPLITUDE) !== 1;
  const isPending = currentIndex <= index;

  return (
    <Link
      to="/exams/$examId"
      params={{ examId: exam.id }}
      className={cn(
        'flex items-center gap-3 py-3 relative',
        isActive && 'bg-white rounded-full shadow-[0_4px_0_#cdc9c9] px-5',
        !isActive &&
          'rounded-xl px-2 -mx-2 transition-colors duration-100 active:bg-slate-100',
        className
      )}
      style={{ marginInlineStart: `${margin * 50}px`, ...style }}
      {...props}
    >
      <div className="shrink-0 flex items-center justify-center size-16 border-2 border-primary-500 bg-white rounded-full shadow-[0_4px_0_var(--color-primary-500)]">
        {belt && <BeltIcon belt={belt} width={50} />}
      </div>
      <div className="flex flex-col items-start flex-1">
        {isActive && (
          <div className="text-xs px-2 py-0.5 bg-primary-500/10 text-primary-500 rounded-full font-medium mb-1">
            Actual
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">
          Nivel {exam.range}
        </span>
        <h2 className="font-black font-manrope">Cinturón {belt?.label}</h2>
      </div>
      {isActive && (
        <ChevronRight aria-label="Ir al examen" color="#191919" size={28} />
      )}
      {!isLast && (
        <ExamLine
          aria-hidden="true"
          className={cn(
            'absolute top-12 -left-6 text-primary-500 -z-1',
            flipLine && '-scale-x-100 translate-x-full',
            isPending && 'opacity-20'
          )}
        />
      )}
    </Link>
  );
}
