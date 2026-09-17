import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";

/**
 * Depth-tick section wayfinding — Ivy DEFAULT.
 * Champagne tick + faded hairline + muted meter whisper + soft dissolve.
 * Interactive: hover/focus brightens & extends; tap scrolls to next section.
 * Soft scroll-reveal. No chevrons / scroll pills / literal ↓.
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

  const label = next
    ? `Continue — ${meters}M / ${zone}`
    : `${meters}M / ${zone}`;

  return (
    <div
      ref={root}
      className={cn(
        "section-seam-wrap relative flex flex-col items-center",
        inView && "is-in",
      )}
    >
      <button
        type="button"
        onClick={goNext}
        disabled={!next}
        aria-label={label}
        className={cn(
          "section-seam group relative flex w-full select-none flex-col items-center",
          "min-h-11 border-0 bg-transparent px-5 py-2.5 md:py-3",
          next ? "cursor-pointer" : "cursor-default",
          "focus-visible:outline-none",
        )}
      >
        <span className="section-seam-mark flex w-full items-center justify-center" aria-hidden>
          <span className="section-seam-hair section-seam-hair-l" />
          <span className="section-seam-tick" />
          <span className="section-seam-hair section-seam-hair-r" />
        </span>
        <span className="section-seam-whisper mt-2 text-center leading-tight">
          <span className="font-mono text-[0.65rem] tracking-[0.14em] text-pearl/70 uppercase tabular-nums transition-colors duration-500 group-hover:text-pearl group-focus-visible:text-pearl group-active:text-pearl">
            {meters}M
          </span>
          <span className="text-[0.55rem] tracking-[0.12em] text-pearl/45"> / </span>
          <span className="text-[0.55rem] tracking-[0.18em] text-pearl/70 uppercase transition-colors duration-500 group-hover:text-pearl/85 group-focus-visible:text-pearl/85 group-active:text-pearl/85">
            {zone}
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
