import { useRef } from "react";
import { Cinema } from "./Cinema";

const WORDS = ["The", "Art", "of", "Undersea", "Exploration"];

export function Hero() {
  const layer = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      className="relative isolate min-h-dvh overflow-hidden"
      onMouseMove={(e) => {
        const el = layer.current;
        if (!el) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 4;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2.5;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={() => {
        const el = layer.current;
        if (el) el.style.transform = "translate3d(0,0,0)";
      }}
    >
      <div
        ref={layer}
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <Cinema
          still="/images/wp-form-b.jpg"
          alt="The Florida Keys from above, looking toward the Straits"
          veil="hero"
        />
      </div>
      <div className="caustics pointer-events-none absolute inset-0 z-[2] opacity-[0.14]" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-20 pt-28 md:justify-end md:px-8 md:pb-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <p className="kicker">Private Passage · Rare Discoveries</p>
          <p className="font-mono text-[0.62rem] tracking-[0.18em] text-pearl/75 uppercase">
            24°33′N · 81°46′W · Key West
          </p>
        </div>

        <h1 className="max-w-3xl font-display text-[clamp(2.7rem,7.4vw,5.8rem)] leading-[0.96] text-fg">
          {WORDS.map((w, i) => (
            <span
              key={w}
              className="hero-word mr-[0.28em] last:mr-0"
              style={{ animationDelay: `${220 + i * 110}ms` }}
            >
              {w}
            </span>
          ))}
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Four guests. One pilot. A ninety-foot ship waiting off Key West. Below,
          a hundred-and-fifty-kilometer channel that carried the Spanish treasure
          fleets — and still has not finished speaking.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href="#reserve"
            className="inline-flex min-h-11 items-center bg-pearl px-7 py-3 text-[0.7rem] tracking-[0.2em] text-abyss uppercase transition-[background-color,transform] duration-150 hover:bg-fg active:scale-[0.96]"
          >
            Reserve passage
          </a>
          <a
            href="#descend"
            className="inline-flex min-h-11 items-center border border-line px-7 py-3 text-[0.7rem] tracking-[0.2em] text-pearl uppercase transition-colors duration-200 hover:border-pearl"
          >
            Draw the depth
          </a>
        </div>
      </div>
    </section>
  );
}
