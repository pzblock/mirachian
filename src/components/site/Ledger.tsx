import { useRef } from "react";
import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

const FACTS = [
  { k: "150 km", v: "The channel between Key West and the Cuban shelf." },
  { k: "500 yrs", v: "Spanish treasure fleets ran this water, season after season." },
  { k: "1,000+", v: "Ships lost to storm, reef, and war. Many still unfound." },
  { k: "1,000 m+", v: "Where the ledger actually lives — below any recreational line." },
] as const;

export function Ledger() {
  const frame = useRef<HTMLElement>(null);

  return (
    <section id="ledger">
      <div className="mx-auto max-w-6xl px-5 section-y md:px-8">
        <Reveal>
          <p className="kicker">The ledger</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.3rem)] text-fg">
            Half a millennium, unfinished.
          </h2>
          <p className="mt-6 max-w-2xl text-muted">
            Move across the silver. These bars came out of these waters. Most of
            the fleet never did. That is not a hunting license — it is a reason
            to look, carefully, at what the channel still holds.
          </p>
        </Reveal>
      </div>

      <article
        ref={frame}
        className="relative min-h-[64vh] overflow-hidden md:min-h-[80vh]"
        onMouseMove={(e) => {
          const el = frame.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--lx", `${((e.clientX - r.left) / r.width) * 100}%`);
          el.style.setProperty("--ly", `${((e.clientY - r.top) / r.height) * 100}%`);
        }}
      >
        <Cinema still="/images/silverbars.jpg" alt="Spanish silver bars recovered from these waters" veil="soft" ken />
        <div className="survey-light pointer-events-none absolute inset-0 mix-blend-soft-light" />
        <div className="relative z-10 mx-auto flex min-h-[64vh] max-w-6xl items-end px-5 py-14 md:min-h-[80vh] md:px-8 md:py-20">
          <div className="max-w-xl">
            <p className="font-display text-2xl text-fg md:text-4xl">
              Silver from the fleets. The rest is still below.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Move the light. We survey. We do not harvest. The unfinished ledger
              of these waters is the expedition — not a salvage claim.
            </p>
          </div>
        </div>
      </article>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:grid-cols-2 md:px-8 md:py-24 lg:grid-cols-4">
        {FACTS.map((f, i) => (
          <Reveal key={f.k} delay={i * 70}>
            <p className="font-display text-3xl text-fg">{f.k}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.v}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
