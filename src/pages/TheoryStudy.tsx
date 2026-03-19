import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  theoryBlocks,
  beltFilters,
  type BeltRange,
} from '../consts/theoryContent';

export const TheoryStudy = () => {
  const [selectedFilter, setSelectedFilter] = useState<BeltRange>('all');

  const filteredBlocks =
    selectedFilter === 'all'
      ? theoryBlocks
      : theoryBlocks.filter((block) => block.beltRange === selectedFilter);

  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, idx) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const text = paragraph.slice(2, -2);
        return (
          <h3 key={idx} className="mt-4 mb-2 font-semibold text-gray-800">
            {text}
          </h3>
        );
      }
      if (paragraph.startsWith('• ')) {
        return (
          <li key={idx} className="ml-4 text-gray-700">
            {paragraph.slice(2)}
          </li>
        );
      }
      if (paragraph.trim() === '') {
        return <br key={idx} />;
      }
      return (
        <p key={idx} className="mb-3 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  const getBeltColors = (beltRange: BeltRange) => {
    const filter = beltFilters.find((f) => f.id === beltRange);
    return filter?.colors || ['bg-gray-500'];
  };

  const getBeltLabel = (beltRange: BeltRange) => {
    const filter = beltFilters.find((f) => f.id === beltRange);
    return filter?.label || 'General';
  };

  return (
    <section className="flex flex-col gap-6 pt-4 pb-8">
      <div className="flex items-center gap-4">
        <Link
          to="/theory"
          className="flex items-center gap-2 text-primary-500 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Estudiar Teoría</h1>
        <p className="text-gray-600">
          Explora los fundamentos del Taekwondo organizados por nivel
        </p>
      </div>

      <div className="sticky top-0 z-10 py-3 -mx-4 px-4 bg-gray-50">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {beltFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedFilter === filter.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-500'
              }`}
            >
              <div className="flex -space-x-1">
                {filter.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className={`w-3 h-3 rounded-full ${color} ${idx > 0 ? 'ring-2 ring-white' : ''}`}
                  />
                ))}
              </div>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filteredBlocks.length > 0 ? (
          filteredBlocks.map((block) => (
            <article
              key={block.id}
              className="p-5 bg-white border border-gray-200 rounded-xl"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {block.title}
                </h2>
                <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full shrink-0 bg-gray-100">
                  <span className="flex -space-x-1">
                    {getBeltColors(block.beltRange).map((color, idx) => (
                      <span
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full ${color} ${idx > 0 ? 'ring-1 ring-white' : ''}`}
                      />
                    ))}
                  </span>
                  {getBeltLabel(block.beltRange)}
                </span>
              </div>
              <div className="prose prose-gray max-w-none">
                {renderContent(block.content)}
              </div>
            </article>
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              No hay contenido para este nivel de cinturón
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
