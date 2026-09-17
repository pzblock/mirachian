import "./section-seam.css";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";

/**
 * Depth-tick section wayfinding — one quiet continue-deeper cue.
 * Champagne tick + faded hairline + depth whisper, aligned to the
 * far-right sounding guide. Tap scrolls next.
 * No step numbers, chevrons, or scroll pills.
 */
export function SectionSeam({
  meters,
  zone,
  next,
}: {
  meters: number;
  zone: string;
  /** Section id to scroll into on activate */
  next?: string;
}) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (reduce) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const goNext = () => {
    if (!next) return;
    const target = document.getElementById(next);
    if (!target) return;
    target.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  const whisper = `${meters}M · ${zone}`;
  const label = next ? `Continue deeper — ${whisper}` : whisper;

  return (
    <div
      ref={root}
      data-seam-next={next || undefined}
      className={cn(
        "section-seam-wrap relative flex flex-col items-end",
        inView && "is-in",
      )}
    >
      <button
        type="button"
        onClick={goNext}
        disabled={!next}
        aria-label={label}
        className={cn(
          "section-seam group relative flex w-full select-none flex-col items-end",
          "min-h-11 border-0 bg-transparent py-2.5 md:min-h-10 md:py-2.5",
          next ? "cursor-pointer" : "cursor-default",
          "focus-visible:outline-none",
        )}
      >
        <span
          className="section-seam-mark flex w-full items-center justify-end"
          aria-hidden
        >
          <span className="section-seam-hair section-seam-hair-l" />
          <span className="section-seam-tick-stack">
            <span className="section-seam-tick" data-seam-anchor />
            {next ? <span className="section-seam-stem" /> : null}
          </span>
        </span>

        <span className="section-seam-whisper mt-2 text-right leading-tight">
          <span className="font-mono text-[0.65rem] tracking-[0.14em] text-pearl/70 uppercase tabular-nums transition-colors duration-500 group-hover:text-pearl group-focus-visible:text-pearl group-active:text-pearl md:text-[0.62rem]">
            {meters}M
          </span>
          <span className="text-[0.55rem] tracking-[0.16em] text-pearl/45 uppercase transition-colors duration-500 group-hover:text-pearl/65 group-focus-visible:text-pearl/65">
            {" "}
            · {zone}
          </span>
        </span>
      </button>
      <div className="section-seam-dissolve pointer-events-none w-full" aria-hidden />
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

/** Sparse editorial hairline — only between dense in-section beats. */
export function BeatCap({ className }: { className?: string }) {
  return (
    <div className={cn("beat-cap", className)} aria-hidden>
      <span className="beat-cap-line" />
    </div>
  );
}
