import {
  MediaActionTypes,
  MediaProvider,
  useMediaDispatch,
  useMediaFullscreenRef,
  useMediaRef,
  useMediaSelector,
} from 'media-chrome/react/media-store';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { Button } from './Button';
import { tuls, type Tul } from '@/consts/tuls';
import { useNavigate } from 'react-router-dom';

const CONTROLS_VISIBLE_TIMEOUT_MS = 3000;

const getMovementIndex = (timestamps: number[], currentTime: number) =>
  Math.max(
    0,
    timestamps.findIndex(
      (_, i) => currentTime < (timestamps[i + 1] ?? Number.POSITIVE_INFINITY)
    )
  );

interface PlayerProps {
  tul: Tul;
  controlsVisible?: boolean;
  onControlsVisibleChange?: (visible: boolean) => void;
}

const PlayerContext = createContext<PlayerProps | null>(null);

function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error(`\`usePlayer\` must be used within \`PlayerProvider\``);
  }
  return context;
}

function PlayerProvider(props: React.ProviderProps<PlayerProps | null>) {
  return (
    <MediaProvider>
      <PlayerContext {...props} />
    </MediaProvider>
  );
}

function Video(props: React.ComponentProps<'video'>) {
  const mediaRef = useMediaRef();
  return <video ref={mediaRef} preload="auto" slot="media" {...props} />;
}

function PlayButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const dispatch = useMediaDispatch();
  const mediaPaused = useMediaSelector((state) => state.mediaPaused ?? true);

  const onPlayToggle = useCallback(() => {
    const type = mediaPaused
      ? MediaActionTypes.MEDIA_PLAY_REQUEST
      : MediaActionTypes.MEDIA_PAUSE_REQUEST;
    dispatch({ type });
  }, [dispatch, mediaPaused]);

  return (
    <Button
      type="button"
      aria-label={mediaPaused ? 'Reproducir' : 'Pausar'}
      aria-pressed={!mediaPaused}
      data-slot="play-button"
      {...props}
      onClick={onPlayToggle}
    >
      {children ?? (mediaPaused ? <Play /> : <Pause />)}
    </Button>
  );
}

function PlayerContainer(props: React.ComponentProps<'div'>) {
  const mediaFullscreenRef = useMediaFullscreenRef();
  const { onControlsVisibleChange: setControlsVisible } = usePlayer();
  const mediaPaused = useMediaSelector((state) => state.mediaPaused ?? true);
  const hideControlsTimeoutRef = useRef<number | null>(null);

  const onControlsShow = useCallback(() => {
    setControlsVisible?.(true);

    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }

    if (!mediaPaused) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setControlsVisible?.(false);
      }, CONTROLS_VISIBLE_TIMEOUT_MS);
    }
  }, [mediaPaused, setControlsVisible]);

  useEffect(() => {
    onControlsShow();
    window.addEventListener('resize', onControlsShow);
    return () => {
      window.removeEventListener('resize', onControlsShow);
    };
  }, [mediaPaused, onControlsShow]);

  return (
    <div
      data-slot="player-container"
      ref={mediaFullscreenRef}
      onMouseMove={onControlsShow}
      {...props}
    />
  );
}

function GoToMovementButton({
  children,
  direction,
  ...props
}: React.ComponentProps<typeof Button> & {
  direction: 'next' | 'prev';
}) {
  const { tul } = usePlayer();
  const dispatch = useMediaDispatch();
  const currentTime = useMediaSelector((state) => state.mediaCurrentTime ?? 0);

  const goToMovement = useCallback(() => {
    let newMovementIndex;
    const currentMovement = getMovementIndex(
      tul.movementTimestamps,
      currentTime
    );

    if (direction === 'next') {
      newMovementIndex = Math.min(
        currentMovement + 1,
        tul.movementTimestamps.length - 1
      );
    } else {
      const currentMovementTime = tul.movementTimestamps[currentMovement];
      const repeatMovement = currentTime - currentMovementTime >= 1;
      newMovementIndex = repeatMovement
        ? currentMovement
        : Math.max(currentMovement - 1, 0);
    }

    const newTime = tul.movementTimestamps[newMovementIndex];

    dispatch({
      type: MediaActionTypes.MEDIA_SEEK_REQUEST,
      detail: newTime,
    });
  }, [direction, dispatch, currentTime, tul.movementTimestamps]);

  return (
    <Button
      aria-label={`${direction === 'next' ? 'Siguiente' : 'Anterior'} movimiento`}
      data-slot="go-to-movement-button"
      type="button"
      {...props}
      onClick={goToMovement}
    >
      {children ?? (direction === 'next' ? <ChevronRight /> : <ChevronLeft />)}
    </Button>
  );
}

function MovementDisplay(props: React.ComponentProps<'p'>) {
  const { tul } = usePlayer();
  const currentTime = useMediaSelector((state) => state.mediaCurrentTime ?? 0);

  const currentMovement = useMemo(
    () => getMovementIndex(tul.movementTimestamps, currentTime),
    [tul.movementTimestamps, currentTime]
  );

  return (
    <p data-slot="movement-display" {...props}>
      {tul.name} - Movimiento {currentMovement + 1}
    </p>
  );
}

function GoToTulButton({
  children,
  direction,
  ...props
}: React.ComponentProps<typeof Button> & {
  direction: 'next' | 'prev';
}) {
  const { tul } = usePlayer();
  const dispatch = useMediaDispatch();
  const navigate = useNavigate();

  const goToTul = useCallback(() => {
    let newTulIndex;
    if (direction === 'next') {
      newTulIndex = tuls.findIndex((t) => t.id === tul.id) + 1;
    } else {
      newTulIndex = tuls.findIndex((t) => t.id === tul.id) - 1;
    }
    if (newTulIndex < 0) {
      newTulIndex = tuls.length - 1;
    }
    if (newTulIndex >= tuls.length) {
      newTulIndex = 0;
    }
    dispatch({
      type: MediaActionTypes.MEDIA_SEEK_REQUEST,
      detail: 0,
    });
    navigate(`/tules/${tuls[newTulIndex].id}/video`);
  }, [direction, dispatch, navigate, tul.id]);

  return (
    <Button
      aria-label={`${direction === 'next' ? 'Siguiente' : 'Anterior'} forma`}
      data-slot="go-to-tul-button"
      type="button"
      {...props}
      onClick={goToTul}
    >
      {children ?? (direction === 'next' ? <SkipForward /> : <SkipBack />)}
    </Button>
  );
}

export function Player(props: PlayerProps) {
  const [controlsVisible, setControlsVisible] = useState(true);

  return (
    <PlayerProvider
      value={{
        ...props,
        controlsVisible,
        onControlsVisibleChange: setControlsVisible,
      }}
    >
      <PlayerContainer className="flex flex-col gap-4 h-full portrait:-mx-4 landscape:absolute landscape:inset-0 landscape:bg-black">
        <Video
          autoPlay
          src={props.tul.video}
          className="size-full object-cover flex-1"
        />
        <div
          data-slot="controls"
          data-visible={controlsVisible ? '' : undefined}
          className="flex flex-col gap-2 px-6 transition-opacity duration-300 landscape:absolute landscape:bottom-0 landscape:inset-x-0 landscape:py-6 landscape:bg-linear-to-t landscape:from-black/80 landscape:to-transparent landscape:opacity-0 landscape:pointer-events-none landscape:data-visible:opacity-100 landscape:data-visible:pointer-events-auto"
        >
          <div className="flex items-center justify-between">
            <GoToMovementButton
              direction="prev"
              size="icon-sm"
              variant="outline"
              className="landscape:bg-black/40 landscape:active:bg-neutral-800/40 landscape:text-white landscape:border-0"
            />
            <MovementDisplay className="font-medium landscape:bg-black/40 landscape:text-white landscape:rounded-full landscape:px-3 landscape:py-1" />
            <GoToMovementButton
              direction="next"
              size="icon-sm"
              variant="outline"
              className="landscape:bg-black/40 landscape:active:bg-neutral-800/40 landscape:text-white landscape:border-0"
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <GoToTulButton
              direction="prev"
              size="icon-md"
              variant="outline"
              className="landscape:bg-black/40 landscape:active:bg-neutral-800/40 landscape:text-white landscape:border-0"
            />
            <PlayButton
              size="icon-lg"
              className="landscape:bg-black/40 landscape:active:bg-neutral-800/40"
            />
            <GoToTulButton
              direction="next"
              size="icon-md"
              variant="outline"
              className="landscape:bg-black/40 landscape:active:bg-neutral-800/40 landscape:text-white landscape:border-0"
            />
          </div>
        </div>
      </PlayerContainer>
    </PlayerProvider>
  );
}
