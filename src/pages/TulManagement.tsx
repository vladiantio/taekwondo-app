import { Button } from '@/common/Button';
import { tuls } from '@/consts/tuls';
import { Route } from '@/routes/_auth/tules/$tulId';
import { useNavigate } from '@tanstack/react-router';

export const TulManagement = () => {
  const params = Route.useParams();
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
        <img
          src={selectedTul.diagram}
          alt="Diagrama del tul"
          className="aspect-square w-full object-contain bg-white rounded-md"
        />
      </div>
      <Button
        onClick={() => {
          navigate({
            to: '/tules/$tulId/video',
            params: { tulId: params.tulId },
          });
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
