import { Button } from '../common/Button';
import { tuls } from '../consts/tuls';
import { useNavigate, useParams } from 'react-router-dom';

export const TulManagement = () => {
  const params = useParams();
  const navigate = useNavigate();

  const selectedTul = tuls.find((tul) => tul.id === params.tulId);

  if (!selectedTul) {
    return <div>Tul no encontrado</div>;
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-medium">{selectedTul.name}</h1>
            {selectedTul.isPreTul && (
              <span className="px-2 py-0.5 text-xs font-medium text-white rounded bg-amber-500">
                Pre-Tul
              </span>
            )}
          </div>
          <p className="text-xl">{selectedTul.korean_name}</p>
        </div>
        <p className="text-lg">{selectedTul.moves} movimientos</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Diagrama</p>
        <img src={selectedTul.diagram} alt="Diagrama del tul" />
      </div>
      <Button
        onClick={() => {
          navigate(`/tules/${params.tulId}/video`);
        }}
      >
        Ver forma
      </Button>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Significado</p>
        <p>{selectedTul.meaning}</p>
      </div>
    </section>
  );
};
