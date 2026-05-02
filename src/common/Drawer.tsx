import { cn } from '@/utils/cn';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { type ComponentProps, createContext, use } from 'react';

function resolveClassName<S>(
  className: string | ((state: S) => string | undefined) | undefined,
  state: S
): string | undefined {
  return typeof className === 'function' ? className(state) : className;
}

const DrawerContext =
  createContext<DrawerPrimitive.Root.Props['swipeDirection']>('down');

export function DrawerProvider({ ...props }: DrawerPrimitive.Provider.Props) {
  return <DrawerPrimitive.Provider {...props} />;
}

export function Drawer({
  swipeDirection = 'down',
  ...props
}: DrawerPrimitive.Root.Props) {
  return (
    <DrawerContext value={swipeDirection}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        swipeDirection={swipeDirection}
        {...props}
      />
    </DrawerContext>
  );
}

export function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger {...props} data-slot="drawer-trigger" />;
}

export function DrawerPortal({
  className,
  ...props
}: DrawerPrimitive.Portal.Props) {
  return (
    <DrawerPrimitive.Portal
      data-slot="drawer-portal"
      className={(state) => cn('z-60', resolveClassName(className, state))}
      {...props}
    />
  );
}

export function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

export function DrawerContent({
  className,
  ...props
}: DrawerPrimitive.Content.Props) {
  return (
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      className={(state) =>
        cn(
          'transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] group-data-nested-drawer-open/popup:opacity-0 group-data-nested-drawer-swiping/popup:opacity-100',
          resolveClassName(className, state)
        )
      }
      {...props}
    />
  );
}

const drawerPopupClassName = ({
  swipeDirection,
}: DrawerPrimitive.Popup.State) => {
  return cn(
    'group/popup relative',
    '[--bleed:-0.5rem] outline-1 outline-black/5 bg-white dark:outline-border overflow-y-auto overscroll-contain touch-auto data-swiping:select-none rounded-2xl',
    'data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]',
    // Nested drawer stacking variables (no-ops when not nested)
    '[--peek:1rem] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-step:0.05] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))] [--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--shrink:calc(1-var(--scale))] [--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))-var(--bleed)))]',
    // Nested drawer overlay (::after pseudo-element)
    "after:absolute after:inset-0 after:rounded-[inherit] after:bg-transparent after:pointer-events-none after:content-[''] after:transition-[background-color] after:duration-450 after:ease-[cubic-bezier(0.32,0.72,0,1)]",
    // Nested drawer states
    'data-nested-drawer-swiping:duration-0 data-nested-drawer-open:overflow-hidden data-nested-drawer-open:after:bg-black/5',
    {
      // Shared horizontal (left & right)
      'supports-[-webkit-touch-callout:none]:[--bleed:0px] h-full w-[calc(22rem+var(--bleed))] max-w-[calc(100vw-3rem+var(--bleed))] p-6 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-[10px]':
        swipeDirection === 'left' || swipeDirection === 'right',
      // Right-only (with stacking transform + transition for box-shadow)
      '-mr-(--bleed) my-2 pr-[calc(2rem+var(--bleed))] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:pr-6 shadow-[-2px_0_10px_rgb(0_0_0/0.1)] data-ending-style:shadow-[-2px_0_10px_rgb(0_0_0/0)] origin-[calc(100%-var(--bleed))_50%] transform-[translateX(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--shrink)*100%)))_scale(var(--scale))] data-swiping:duration-0 [transition:transform_450ms_cubic-bezier(0.32,0.72,0,1),box-shadow_450ms_cubic-bezier(0.32,0.72,0,1)]':
        swipeDirection === 'right',
      // Left-only (with stacking transform + transition for box-shadow)
      '-ml-(--bleed) pl-[calc(2rem+var(--bleed))] supports-[-webkit-touch-callout:none]:ml-0 supports-[-webkit-touch-callout:none]:pl-6 shadow-[2px_0_10px_rgb(0_0_0/0.1)] data-ending-style:shadow-[2px_0_10px_rgb(0_0_0/0)] origin-[var(--bleed)_50%] transform-[translateX(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--shrink)*100%)))_scale(var(--scale))] data-swiping:duration-0 [transition:transform_450ms_cubic-bezier(0.32,0.72,0,1),box-shadow_450ms_cubic-bezier(0.32,0.72,0,1)]':
        swipeDirection === 'left',
      // Right enter/exit
      'data-ending-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-starting-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)))]':
        swipeDirection === 'right',
      // Left enter/exit
      'data-ending-style:transform-[translateX(calc(-100%+var(--bleed)-var(--viewport-padding)))] data-starting-style:transform-[translateX(calc(-100%+var(--bleed)-var(--viewport-padding)))]':
        swipeDirection === 'left',
      // Shared vertical (up & down)
      'w-full max-h-[calc(95vh+var(--bleed))] px-6':
        swipeDirection === 'up' || swipeDirection === 'down',
      // Down-only (with stacking transform + transitions for height & box-shadow)
      '-mb-(--bleed) mx-2 pt-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px)+var(--bleed))] h-(--drawer-height,auto) shadow-[0_2px_10px_rgb(0_0_0/0.1)] data-ending-style:shadow-[0_2px_10px_rgb(0_0_0/0)] origin-[50%_calc(100%-var(--bleed))] transform-[translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))] data-swiping:duration-0 data-nested-drawer-open:h-[calc(var(--height)+var(--bleed))] [transition:transform_450ms_cubic-bezier(0.32,0.72,0,1),height_450ms_cubic-bezier(0.32,0.72,0,1),box-shadow_450ms_cubic-bezier(0.32,0.72,0,1)]':
        swipeDirection === 'down',
      // Up-only (with stacking transform + transitions for height & box-shadow)
      '-mt-(--bleed) pb-6 pt-[calc(2rem+env(safe-area-inset-top,0px)+var(--bleed))] h-(--drawer-height,auto) shadow-[0_-2px_10px_rgb(0_0_0/0.1)] data-ending-style:shadow-[0_-2px_10px_rgb(0_0_0/0)] origin-[50%_var(--bleed)] transform-[translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--shrink)*var(--height))))_scale(var(--scale))] data-swiping:duration-0 data-nested-drawer-open:h-[calc(var(--height)+var(--bleed))] [transition:transform_450ms_cubic-bezier(0.32,0.72,0,1),height_450ms_cubic-bezier(0.32,0.72,0,1),box-shadow_450ms_cubic-bezier(0.32,0.72,0,1)]':
        swipeDirection === 'up',
      // Down enter/exit
      'data-ending-style:transform-[translateY(calc(100%-var(--bleed)))] data-starting-style:transform-[translateY(calc(100%-var(--bleed)))]':
        swipeDirection === 'down',
      // Up enter/exit
      'data-ending-style:transform-[translateY(calc(-100%+var(--bleed)))] data-starting-style:transform-[translateY(calc(-100%+var(--bleed)))]':
        swipeDirection === 'up',
    }
  );
};

export function DrawerPopup({
  className,
  children,
  container,
  withHandle = true,
  ...props
}: DrawerPrimitive.Popup.Props & {
  container?: DrawerPrimitive.Portal.Props['container'];
  withHandle?: boolean;
}) {
  const dir = use(DrawerContext);

  return (
    <DrawerPortal container={container}>
      <DrawerBackdrop />
      <DrawerViewport>
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          className={(state) =>
            cn(drawerPopupClassName(state), resolveClassName(className, state))
          }
          {...props}
        >
          {withHandle && dir === 'down' && <DrawerHandle />}
          {children}
        </DrawerPrimitive.Popup>
      </DrawerViewport>
    </DrawerPortal>
  );
}

export function DrawerHandle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'shrink-0 w-12 h-1 mx-auto -mt-4 mb-5 rounded-full bg-gray-600 transition-opacity duration-200 group-data-nested-drawer-open/popup:opacity-0 group-data-nested-drawer-swiping/popup:opacity-100',
        className
      )}
      {...props}
    />
  );
}

export function DrawerViewport({
  className,
  ...props
}: DrawerPrimitive.Viewport.Props) {
  const dir = use(DrawerContext);
  return (
    <DrawerPrimitive.Viewport
      data-slot="drawer-viewport"
      className={(state) =>
        cn(
          'fixed flex inset-0 z-50',
          {
            '[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] items-stretch p-(--viewport-padding)':
              dir === 'left' || dir === 'right',
            'justify-end': dir === 'right',
            'justify-start': dir === 'left',
            'items-end justify-center': dir === 'down',
            'items-start justify-center': dir === 'up',
          },
          resolveClassName(className, state)
        )
      }
      {...props}
    />
  );
}

export function DrawerTitle({
  className,
  ...props
}: DrawerPrimitive.Title.Props) {
  const dir = use(DrawerContext);

  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={(state) =>
        cn(
          'text-base font-medium',
          {
            'text-center': dir === 'down' || dir === 'up',
          },
          resolveClassName(className, state)
        )
      }
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  const dir = use(DrawerContext);

  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={(state) =>
        cn(
          'mt-1.5 text-gray-600-black text-sm',
          {
            'text-center': dir === 'down' || dir === 'up',
          },
          resolveClassName(className, state)
        )
      }
      {...props}
    />
  );
}

export function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={(state) =>
        cn(
          '[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed z-50 inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute supports-backdrop-filter:backdrop-blur-3xl',
          resolveClassName(className, state)
        )
      }
      {...props}
    />
  );
}

export function DrawerIndentBackground({
  className,
  ...props
}: DrawerPrimitive.IndentBackground.Props) {
  return (
    <DrawerPrimitive.IndentBackground
      data-slot="drawer-indent-background"
      className={(state) =>
        cn(
          'isolate absolute inset-0 bg-black/70',
          resolveClassName(className, state)
        )
      }
      {...props}
    />
  );
}

export function DrawerIndent({
  className,
  ...props
}: DrawerPrimitive.Indent.Props) {
  return (
    <DrawerPrimitive.Indent
      className={(state) =>
        cn(
          'bg-white [--indent-progress:var(--drawer-swipe-progress)] [--indent-radius:calc(1rem*(1-var(--indent-progress)))] [--indent-transition:calc(1-clamp(0,calc(var(--drawer-swipe-progress)*100000),1))] relative border p-4 [transition:transform_0.4s_cubic-bezier(0.32,0.72,0,1),border-radius_0.25s_cubic-bezier(0.32,0.72,0,1)] origin-[center_top] will-change-transform transform-[scale(1)_translateY(0)] duration-[calc(400ms*var(--indent-transition)),calc(250ms*var(--indent-transition))] data-active:transform-[scale(calc(0.98+(0.02*var(--indent-progress))))_translateY(calc(0.5rem*(1-var(--indent-progress))))] data-active:rounded-tl-(--indent-radius) data-active:rounded-tr-(--indent-radius)',
          resolveClassName(className, state)
        )
      }
      {...props}
    />
  );
}
