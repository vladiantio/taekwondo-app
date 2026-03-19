import { Player } from '@/common/Video';
import { useParams } from 'react-router-dom';
import { tuls } from '@/consts/tuls';

export const TulVideo = () => {
  const params = useParams();

  const selectedTul = tuls.find((tul) => tul.id === params.tulId);

  if (!selectedTul) {
    return <div>Tul no encontrado</div>;
  }

  return <Player tul={selectedTul} />;
};
