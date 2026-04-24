import type { Belt } from '@/consts/belts';

/** Franjas de cinturón en tarjetas de teoría: cuerpo + punta, o una sola franja si no hay punta (p. ej. Dan). */
export function TheoryBeltStripes({ belt }: { belt: Belt }) {
  const style = {
    '--belt': belt.color,
    '--buckle': belt.buckle ?? 'transparent',
  } as React.CSSProperties;

  return (
    <span
      className="absolute -top-1 inset-x-0 flex justify-end px-2 gap-1 pointer-events-none"
      style={style}
    >
      <span className="bg-(--belt) w-5 h-14 block rounded-sm border border-primary-500" />
      {belt.buckle != null && belt.buckle !== '' ? (
        <span className="bg-(--belt) w-5 h-14 block rounded-sm border border-primary-500 relative overflow-hidden after:absolute after:bottom-0 after:inset-x-0 after:w-6 after:h-4 after:bg-(--buckle)" />
      ) : null}
    </span>
  );
}
