/**
 * Depth-tick section wayfinding — Ivy DEFAULT.
 * Champagne tick + faded hairline + muted meter whisper + soft dissolve.
 * No scroll arrows / chevrons / pills. Uses existing nav depth voice.
 */
export function SectionSeam({
  meters,
  zone,
}: {
  meters: number;
  zone: string;
}) {
  return (
    <div
      className="pointer-events-none relative flex select-none flex-col items-center py-5 md:py-6"
      aria-hidden
    >
      <div className="flex w-full items-center justify-center">
        <span className="block h-px w-12 max-w-[22vw] bg-gradient-to-r from-transparent to-champagne/55 md:w-[108px] md:max-w-none" />
        <span className="block h-2.5 w-px shrink-0 bg-champagne shadow-[0_0_10px_color-mix(in_oklab,var(--color-champagne)_35%,transparent)] md:h-[11px]" />
        <span className="block h-px w-12 max-w-[22vw] bg-gradient-to-l from-transparent to-champagne/55 md:w-[108px] md:max-w-none" />
      </div>
      <p className="mt-[0.55rem] text-center leading-tight">
        <span className="font-mono text-[0.65rem] tracking-[0.14em] text-pearl/70 uppercase tabular-nums">
          {meters}M
        </span>
        <span className="text-[0.55rem] tracking-[0.12em] text-pearl/45"> / </span>
        <span className="text-[0.55rem] tracking-[0.18em] text-pearl/70 uppercase">
          {zone}
        </span>
      </p>
      <div className="mt-[0.85rem] h-12 w-full bg-gradient-to-b from-[rgb(4_7_10_/_0.55)] via-[rgb(4_7_10_/_0.22)] to-transparent md:h-14" />
    </div>
  );
}

/** Treatment 2 — image→void feather (no tick). Bottom 64–80px into #000. */
export function ImageVoidFeather() {
  return (
    <span
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-16 bg-gradient-to-b from-transparent via-black/55 to-[#000] md:h-20"
      aria-hidden
    />
  );
}
