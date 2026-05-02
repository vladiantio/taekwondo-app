import { Player } from '@/common/Video';
import { tuls } from '@/consts/tuls';
import { Route } from '@/routes/_auth/tules/$tulId/video';

export const TulVideo = () => {
  const params = Route.useParams();

  const selectedTul = tuls.find((tul) => tul.id === params.tulId);

  if (!selectedTul) {
    return <div>Tul no encontrado</div>;
  }

  return <Player tul={selectedTul} />;
};
