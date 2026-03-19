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
  Loader2Icon,
  Minus,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  SkipBack,
  SkipForward,
  SwitchCamera,
} from 'lucide-react';
import { Button } from './Button';
import { tuls, type Tul } from '@/consts/tuls';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Drawer, DrawerContent, DrawerTrigger } from './Drawer';
import { Slider } from './Slider';

const CONTROLS_VISIBLE_TIMEOUT_MS = 3000;
const LOADING_DELAY_MS = 500;
const SPEEDS = [0.5, 1, 1.5, 2];

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
  currentVideoIndex?: number;
  onControlsVisibleChange?: React.Dispatch<React.SetStateAction<boolean>>;
  onCurrentVideoIndexChange?: React.Dispatch<React.SetStateAction<number>>;
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

function PlayerLoading({
  delayMs = LOADING_DELAY_MS,
  className,
  children: _,
  ...props
}: React.ComponentProps<'div'> & {
  delayMs?: number;
  asChild?: boolean;
}) {
  const isLoading = useMediaSelector((state) => state.mediaLoading ?? false);
  const isPaused = useMediaSelector((state) => state.mediaPaused ?? true);
  const hasPlayed = useMediaSelector((state) => state.mediaHasPlayed ?? false);

  const shouldShowLoading = isLoading && !isPaused;
  const shouldUseDelay = hasPlayed && shouldShowLoading;
  const loadingDelayMs = shouldUseDelay ? delayMs : 0;

  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (shouldShowLoading) {
      if (loadingDelayMs > 0) {
        timeoutRef.current = setTimeout(() => {
          setShouldRender(true);
          timeoutRef.current = null;
        }, loadingDelayMs);
      } else {
        setShouldRender(true);
      }
    } else {
      setShouldRender(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [shouldShowLoading, loadingDelayMs]);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      data-slot="media-player-loading"
      {...props}
      className={cn(
        'pointer-events-none absolute inset-0 z-50 flex items-center justify-center',
        className
      )}
    >
      <Loader2Icon className="size-20 animate-spin stroke-[.0938rem] text-neutral-300" />
    </div>
  );
}

function Video(props: React.ComponentProps<'video'>) {
  const { tul, currentVideoIndex } = usePlayer();
  const mediaRef = useMediaRef();

  return (
    <video
      ref={mediaRef}
      src={tul.video[currentVideoIndex ?? 0]}
      preload="auto"
      slot="media"
      {...props}
    />
  );
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
      newTulIndex = (tuls.findIndex((t) => t.id === tul.id) + 1) % tuls.length;
    } else {
      newTulIndex = (tuls.findIndex((t) => t.id === tul.id) - 1) % tuls.length;
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

function SwitchVideoButton(props: React.ComponentProps<typeof Button>) {
  const {
    onCurrentVideoIndexChange: setCurrentVideoIndex,
    currentVideoIndex,
    tul,
  } = usePlayer();
  const dispatch = useMediaDispatch();
  const prevTimeRef = useRef<number>(0);
  const prevVideoIndexRef = useRef<number>(currentVideoIndex ?? 0);
  const currentTime = useMediaSelector((state) => state.mediaCurrentTime ?? 0);

  const switchVideo = useCallback(() => {
    prevTimeRef.current = currentTime;
    setCurrentVideoIndex?.((prevIndex) => (prevIndex + 1) % tul.video.length);
  }, [currentTime, setCurrentVideoIndex, tul.video.length]);

  useEffect(() => {
    if (currentVideoIndex !== prevVideoIndexRef.current) {
      dispatch({
        type: MediaActionTypes.MEDIA_SEEK_REQUEST,
        detail: prevTimeRef.current,
      });
      dispatch({ type: MediaActionTypes.MEDIA_PLAY_REQUEST });
      prevVideoIndexRef.current = currentVideoIndex ?? 0;
    }
  }, [currentVideoIndex, dispatch]);

  return (
    <Button
      aria-label="Cambiar de ángulo"
      data-slot="switch-video-button"
      type="button"
      {...props}
      onClick={switchVideo}
    >
      <SwitchCamera />
    </Button>
  );
}

function MoreButton(props: React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          aria-label="Más opciones"
          data-slot="more-button"
          type="button"
          {...props}
        >
          <MoreHorizontal />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4 flex flex-col items-center justify-center gap-2">
          <PlayerPlaybackSpeed />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function PlayerPlaybackSpeed({
  speeds = SPEEDS,
  ...props
}: React.ComponentProps<'div'> & {
  speeds?: number[];
}) {
  const dispatch = useMediaDispatch();
  const mediaPlaybackRate = useMediaSelector(
    (state) => state.mediaPlaybackRate ?? 1
  );

  const onPlaybackRateChange = useCallback(
    (rate: number) => {
      dispatch({
        type: MediaActionTypes.MEDIA_PLAYBACK_RATE_REQUEST,
        detail: rate,
      });
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="text-xl font-bold tracking-tighter text-center tabular-nums">
        {mediaPlaybackRate.toFixed(2)}x
      </div>
      <div className="flex items-center justify-stretch gap-4 w-full">
        <Button
          aria-label="Disminuir velocidad"
          variant="outline"
          size="icon-sm"
          className="shrink-0"
          onClick={() => onPlaybackRateChange(mediaPlaybackRate - 0.05)}
          disabled={mediaPlaybackRate <= 0.5}
        >
          <Minus />
        </Button>
        <Slider
          className="flex-1"
          value={mediaPlaybackRate}
          onValueChange={(value) =>
            onPlaybackRateChange(Array.isArray(value) ? value[0] : value)
          }
          min={0.5}
          max={2}
          step={0.05}
        />
        <Button
          aria-label="Aumentar velocidad"
          variant="outline"
          size="icon-sm"
          className="shrink-0"
          onClick={() => onPlaybackRateChange(mediaPlaybackRate + 0.05)}
          disabled={mediaPlaybackRate >= 2}
        >
          <Plus />
        </Button>
      </div>
      <div className="flex gap-2" {...props}>
        {speeds.map((speed) => (
          <Button
            aria-label={`Cambiar velocidad a ${speed}x`}
            aria-pressed={mediaPlaybackRate === speed}
            key={speed}
            variant={mediaPlaybackRate === speed ? 'primary' : 'outline'}
            size="sm"
            className="flex-1 justify-between h-9 px-4"
            onClick={() => onPlaybackRateChange(speed)}
          >
            {speed}x
          </Button>
        ))}
      </div>
    </div>
  );
}

const LANDSCAPE_BUTTON_CLASSNAME =
  'landscape:bg-black/40 landscape:active:bg-neutral-800/40 landscape:text-white landscape:border-0';

export function Player(props: PlayerProps) {
  const [controlsVisible, setControlsVisible] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  return (
    <PlayerProvider
      value={{
        ...props,
        controlsVisible,
        onControlsVisibleChange: setControlsVisible,
        currentVideoIndex,
        onCurrentVideoIndexChange: setCurrentVideoIndex,
      }}
    >
      <PlayerContainer className="flex flex-col gap-4 h-full portrait:-mx-4 landscape:absolute landscape:inset-0 landscape:bg-black">
        <div className="bg-black flex-1 h-full relative">
          <Video autoPlay className="size-full object-cover" />
          <PlayerLoading />
        </div>
        <div
          data-slot="controls"
          data-visible={controlsVisible ? '' : undefined}
          className="flex flex-col gap-2 px-6 transition-opacity duration-300 landscape:absolute landscape:bottom-0 landscape:inset-x-0 landscape:py-6 landscape:bg-linear-to-t landscape:from-black/80 landscape:to-transparent landscape:opacity-0 landscape:pointer-events-none landscape:data-visible:opacity-100 landscape:data-visible:pointer-events-auto"
        >
          <div className="flex items-center justify-between gap-4">
            <GoToMovementButton
              direction="prev"
              size="icon-sm"
              variant="outline"
              className={LANDSCAPE_BUTTON_CLASSNAME}
            />
            <MovementDisplay className="font-medium landscape:bg-black/40 landscape:text-white landscape:rounded-full landscape:px-3 landscape:py-1" />
            <GoToMovementButton
              direction="next"
              size="icon-sm"
              variant="outline"
              className={LANDSCAPE_BUTTON_CLASSNAME}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <SwitchVideoButton
              size="icon-md"
              variant="outline"
              className={LANDSCAPE_BUTTON_CLASSNAME}
            />
            <div className="flex items-center justify-center gap-4">
              <GoToTulButton
                direction="prev"
                size="icon-md"
                variant="outline"
                className={LANDSCAPE_BUTTON_CLASSNAME}
              />
              <PlayButton
                size="icon-lg"
                className={LANDSCAPE_BUTTON_CLASSNAME}
              />
              <GoToTulButton
                direction="next"
                size="icon-md"
                variant="outline"
                className={LANDSCAPE_BUTTON_CLASSNAME}
              />
            </div>
            <MoreButton
              size="icon-md"
              variant="outline"
              className={LANDSCAPE_BUTTON_CLASSNAME}
            />
          </div>
        </div>
      </PlayerContainer>
    </PlayerProvider>
  );
}
