import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { tuls, type Tul } from '../consts/tuls';
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
        <h1 className="text-xl">Selecciona tu tul</h1>
        
        {/* Buscador */}
        <div className="relative">
          <Search width={16} height={16} className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, coreano, movimientos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pr-10 text-gray-900 bg-white border border-gray-300 rounded-lg pl-9 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              type='button'
              onClick={() => setSearchQuery('')}
              className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Contador de resultados */}
        {searchQuery && (
          <p className="text-sm text-gray-500">
            {filteredTuls.length} {filteredTuls.length === 1 ? 'tul encontrado' : 'tules encontrados'}
          </p>
        )}
      </div>

      {/* Lista de tules */}
      {filteredTuls.length > 0 ? (
        <article className="grid grid-cols-2 gap-3">
          {filteredTuls.map((tul) => (
            <TulCard key={tul.id} tul={tul} />
          ))}
        </article>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <Search className="w-12 h-12 text-gray-300" />
          <div>
            <p className="font-medium text-gray-600">No se encontraron tules</p>
            <p className="text-sm text-gray-500">
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
      to={`/tules/${tul.id}`}
      className="flex flex-col gap-4 pb-4 bg-white rounded-b-md"
    >
      <div className="relative">
        <img src="/imgs/Rectangle.png" alt="Tul" className="w-full" />
        {tul.isPreTul && (
          <span className="absolute px-2 py-0.5 text-xs font-medium text-white rounded bg-amber-500 top-2 right-2">
            Pre-Tul
          </span>
        )}
      </div>
      <div className="flex flex-col px-4">
        <h2 className="text-lg font-medium">{tul.name}</h2>
        <p className="text-sm text-gray-500">{tul.moves} movimientos</p>
      </div>
    </Link>
  );
};
