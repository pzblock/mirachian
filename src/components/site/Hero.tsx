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
          priority
        />
      </div>
      <div className="caustics pointer-events-none absolute inset-0 z-[2] opacity-[0.05]" aria-hidden />
      <div className="hero-shade pointer-events-none absolute inset-0 z-[3]" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col px-5 pt-[5.75rem] pb-12 md:px-8 md:pt-28 md:pb-16">
        <div className="max-w-xl">
          <div className="hero-meta-pair">
            <p className="hero-meta text-[0.68rem] tracking-[0.16em] text-pearl uppercase">
              Private Passage · Rare Discoveries
            </p>
            <p className="hero-meta font-mono text-[0.68rem] tracking-[0.14em] text-pearl uppercase">
              24°33′N · 81°46′W · Key West
            </p>
          </div>

          <h1 className="tagline mt-4 max-w-[11ch] font-display text-[clamp(2.35rem,11vw,5.2rem)] leading-[0.98] text-fg md:mt-5">
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

          <p className="on-photo mt-6 max-w-md text-[0.98rem] leading-[1.65] text-fg md:mt-7 md:text-lg">
            Ultra-private submersible expeditions from Key West, for a maximum of
            four guests. Each journey is a carefully guided exploration of waters
            few will ever see — where history, uncharted terrain, and the quiet
            possibility of discovery still converge.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
            <a
              href="#reserve"
              className="cta-fill inline-flex min-h-11 items-center border border-pearl bg-pearl px-7 py-3 text-[0.7rem] tracking-[0.2em] text-abyss uppercase hover:bg-fg hover:border-fg"
            >
              Reserve passage
            </a>
            <a
              href="#descend"
              className="cta-ghost inline-flex min-h-11 items-center border border-pearl/45 bg-transparent px-7 py-3 text-[0.7rem] tracking-[0.2em] text-fg uppercase backdrop-blur-[2px]"
            >
              Draw the depth
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
