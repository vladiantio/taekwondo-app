import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { tuls, type Tul } from '@/consts/tuls';
import { Search, X } from 'lucide-react';

export const Tules = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTuls = useMemo(() => {
    if (!searchQuery.trim()) {
      return tuls;
    }

    const query = searchQuery.toLowerCase().trim();
    return tuls.filter((tul) => {
      const nameMatch = tul.name.toLowerCase().includes(query);
      const koreanMatch = tul.korean_name.toLowerCase().includes(query);
      const movesMatch = tul.moves.toString().includes(query);
      const meaningMatch = tul.meaning.toLowerCase().includes(query);

      return nameMatch || koreanMatch || movesMatch || meaningMatch;
    });
  }, [searchQuery]);

  return (
    <section className="flex flex-col gap-4 pt-4">
      <div className="flex flex-col gap-2">
        
        <div className="relative">
          <Search
            width={16}
            height={16}
            className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Buscar por nombre, movimientos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="box-border bg-white pr-10 pl-9 border-2 border-gray-300 focus:border-primary-500 border-solid rounded-lg outline-none w-full min-w-0 h-12 text-gray-900"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {searchQuery && (
          <p className="text-gray-500 text-sm">
            {filteredTuls.length}{' '}
            {filteredTuls.length === 1 ? 'tul encontrado' : 'tules encontrados'}
          </p>
        )}
      </div>

      {filteredTuls.length > 0 ? (
        <article className="gap-3 grid grid-cols-2">
          {filteredTuls.map((tul) => (
            <TulCard key={tul.id} tul={tul} />
          ))}
        </article>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 py-12 text-center">
          <Search className="w-12 h-12 text-gray-300" />
          <div>
            <p className="font-medium text-gray-600">No se encontraron tules</p>
            <p className="text-gray-500 text-sm">
              Intenta buscar con otro término
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

const TulCard = ({ tul }: { tul: Tul }) => {
  return (
    <Link
      to="/tules/$tulId"
      params={{ tulId: tul.id }}
      className="flex flex-col gap-4 overflow-hidden bg-white pb-4 rounded-lg shadow-[0_4px_0_#cdc9c9] transition-colors active:bg-slate-50"
    >
      <div className="relative">
        <img
          src="/imgs/rectangle.webp"
          alt="Tul"
          className="w-full object-cover aspect-4/3"
        />
        {tul.isPreTul && (
          <span className="top-2 right-2 absolute bg-amber-500 px-2 py-0.5 rounded font-medium text-white text-xs">
            Pre-Tul
          </span>
        )}
      </div>
      <div className="flex flex-col px-4">
        <h2 className="font-medium text-lg">{tul.name}</h2>
        <p className="text-gray-500 text-sm">{tul.moves} movimientos</p>
      </div>
    </Link>
  );
};
