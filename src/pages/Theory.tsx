import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';
import {
  vocabulary,
  categoryLabels,
  categoryIcons,
  type VocabularyCategory,
} from '../consts/vocabulary';
import { Quiz } from '../components/Quiz';

type ViewMode = 'categories' | 'study' | 'quiz';

export const Theory = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [selectedCategory, setSelectedCategory] =
    useState<VocabularyCategory | null>(null);

  const categories = Array.from(
    new Set(vocabulary.map((v) => v.category))
  ) as VocabularyCategory[];

  const handleCategorySelect = (category: VocabularyCategory) => {
    setSelectedCategory(category);
    setViewMode('study');
  };

  const handleStartQuiz = () => {
    setViewMode('quiz');
  };

  if (viewMode === 'quiz') {
    return (
      <Quiz
        items={
          selectedCategory
            ? vocabulary.filter((v) => v.category === selectedCategory)
            : vocabulary
        }
        onBack={() => setViewMode('categories')}
      />
    );
  }

  if (viewMode === 'study' && selectedCategory) {
    const categoryItems = vocabulary.filter(
      (v) => v.category === selectedCategory
    );

    return (
      <section className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setViewMode('categories')}
            className="text-primary-500 hover:underline"
          >
            ← Volver a categorías
          </button>
          <button
            type="button"
            onClick={handleStartQuiz}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary-500 hover:bg-phover-500"
          >
            <Play className="w-4 h-4" />
            Hacer quiz
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl">{categoryIcons[selectedCategory]}</span>
          <h1 className="text-2xl font-bold">
            {categoryLabels[selectedCategory]}
          </h1>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {categoryItems.map((item, index) => (
            <VocabularyCard key={index} item={item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Teoría de Taekwondo</h1>
        <p className="text-gray-600">
          Aprende todo lo necesario para practicar Taekwondo
        </p>
      </div>

      {/* Modos de estudio */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/theory/study"
          className="flex flex-col items-center gap-3 p-6 transition-colors bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500"
        >
          <BookOpen className="w-8 h-8 text-primary-500" />
          <span className="font-semibold">Estudiar teoría</span>
          <span className="text-sm text-center text-gray-500">
            Explora los temas del taekwondo por bloques
          </span>
        </Link>
      </div>

      {/* Categorías */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Aprende coreano</h2>
        <p className="text-gray-600">Haz concursos para aprender coreano</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const categoryItems = vocabulary.filter(
              (v) => v.category === category
            );
            return (
              <button
                type="button"
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="flex items-center gap-3 p-4 text-left transition-all bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md"
              >
                <span className="text-2xl">{categoryIcons[category]}</span>
                <div className="flex-1">
                  <h3 className="font-semibold">{categoryLabels[category]}</h3>
                  <p className="text-sm text-gray-500">
                    {categoryItems.length} palabras
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const VocabularyCard = ({ item }: { item: (typeof vocabulary)[0] }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-800">{item.korean}</p>
          <p className="text-sm italic text-gray-500">{item.pronunciation}</p>
          <p className="mt-1 font-medium text-primary-500">{item.spanish}</p>
        </div>
      </div>
    </div>
  );
};
