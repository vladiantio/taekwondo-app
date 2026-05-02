import { tuls } from '@/consts/tuls';
import { createContext, useContext, useState, type ReactNode } from 'react';

export type TulStatus = 'not_started' | 'in_progress' | 'completed';

type TulProgress = Record<string, TulStatus>;

type ProgressContextType = {
  currentExam: string;
  setCurrentExam: (exam: string) => void;
  tulProgress: TulProgress;
  setTulStatus: (tulId: string, status: TulStatus) => void;
  getTulStatus: (tulId: string) => TulStatus;
  getProgressPercentage: () => number;
  getCompletedCount: () => number;
  getInProgressCount: () => number;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

// eslint-disable-next-line react/only-export-components
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

type ProgressProviderProps = {
  children: ReactNode;
};

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const [currentExam, setCurrentExamState] = useState<string>(() => {
    const saved = localStorage.getItem('currentBelt');
    return saved || 'gup-9';
  });

  const [tulProgress, setTulProgress] = useState<TulProgress>(() => {
    const saved = localStorage.getItem('tulProgress');
    return saved ? JSON.parse(saved) : {};
  });

  const setCurrentExam = (exam: string) => {
    setCurrentExamState(exam);
    localStorage.setItem('currentBelt', exam);
  };

  const setTulStatus = (tulId: string, status: TulStatus) => {
    setTulProgress((prev) => {
      const next = { ...prev, [tulId]: status };
      localStorage.setItem('tulProgress', JSON.stringify(next));
      return next;
    });
  };

  const getTulStatus = (tulId: string): TulStatus => {
    return tulProgress[tulId] || 'not_started';
  };

  const getProgressPercentage = () => {
    const totalTuls = Object.keys(tulProgress).length;
    if (totalTuls === 0) return 0;
    const completed = Object.values(tulProgress).filter(
      (s) => s === 'completed'
    ).length;
    return Math.round((completed / tuls.length) * 100);
  };

  const getCompletedCount = () => {
    return Object.values(tulProgress).filter((s) => s === 'completed').length;
  };

  const getInProgressCount = () => {
    return Object.values(tulProgress).filter((s) => s === 'in_progress').length;
  };

  return (
    <ProgressContext.Provider
      value={{
        currentExam,
        setCurrentExam,
        tulProgress,
        setTulStatus,
        getTulStatus,
        getProgressPercentage,
        getCompletedCount,
        getInProgressCount,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
