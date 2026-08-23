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
          still="/images/cs7/op-028.jpg"
          alt="The submersible seen from below in deep blue water"
          veil="hero"
          objectPosition="82% 8%"
          priority
        />
      </div>
      <div className="caustics pointer-events-none absolute inset-0 z-[2] opacity-[0.06]" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col px-5 pt-28 pb-14 md:px-8 md:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <p className="kicker">Private Passage · Rare Discoveries</p>
          <p className="font-mono text-[0.62rem] tracking-[0.18em] text-pearl/80 uppercase">
            24°33′N · 81°46′W · Key West
          </p>
        </div>

        <div className="copy-veil mt-auto max-w-xl pt-8">
          <h1 className="max-w-[11ch] font-display text-[clamp(2.55rem,6.6vw,5.2rem)] leading-[0.98] text-fg">
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

          <p className="mt-8 max-w-md text-base leading-relaxed text-fg md:mt-10 md:text-lg">
            Ultra-private submersible expeditions from Key West, for a maximum of
            four guests. Each journey is a carefully guided exploration of waters
            few will ever see — where history, uncharted terrain, and the quiet
            possibility of discovery still converge.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
            <a
              href="#reserve"
              className="inline-flex min-h-11 items-center border border-line px-7 py-3 text-[0.7rem] tracking-[0.2em] text-pearl uppercase transition-colors duration-200 hover:border-pearl"
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
      </div>
    </section>
  );
}
