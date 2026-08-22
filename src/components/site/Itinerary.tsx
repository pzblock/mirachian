import { useState } from "react";
import { cn } from "@/lib/utils";
import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

const BEATS = [
  {
    t: "01 · Transfer",
    title: "Key West, then the ship",
    body: "A private transfer, a quiet briefing, and the first look at the craft. You are not processed. You are received.",
    img: "/images/cs7/op-009.jpg",
    alt: "The submersible leaving the stern for the drop",
    ken: false,
    video: undefined as string | undefined,
  },
  {
    t: "02 · Night aboard",
    title: "Sleep on the working water",
    body: "The Straits at night. Dinner, rest, the instruments already listening. Weather is watched, not hoped for.",
    img: "/images/wp-form-b.jpg",
    alt: "The Keys from the air at the edge of evening",
    ken: true,
    video: undefined,
  },
  {
    t: "03 · Descent",
    title: "The sphere takes you down",
    body: "Four guests. One pilot. Color leaves, then light. The ordinary sea is already behind you.",
    img: "/images/cs7/cs7-underwater.jpg",
    alt: "The submersible in deep water",
    ken: false,
    video: undefined,
  },
  {
    t: "04 · Survey",
    title: "Terrain almost no one has seen",
    body: "Cinema-grade capture of wreck, slope, and channel floor. Look. Record. Leave it as you found it.",
    img: "/images/cs7/op-023.jpg",
    alt: "The submersible among the reef",
    ken: false,
    video: undefined,
  },
  {
    t: "05 · Return",
    title: "Surface, then home",
    body: "Back through the reef line. A last look at the water. You leave with the record of the day — and nothing taken from the ledger.",
    img: "/images/wp-form-e.jpg",
    alt: "Clear reef water in the Keys",
    ken: true,
    video: "/videos/water-column.mp4",
  },
] as const;

export function Itinerary() {
  const [i, setI] = useState(0);
  const beat = BEATS[i];

  return (
    <section id="day">
      <div className="mx-auto max-w-6xl px-5 section-y md:px-8">
        <Reveal>
          <p className="kicker">The working day</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] text-fg">
            Arrival, night, depth, return.
          </h2>
        </Reveal>

        <div className="mt-12 flex gap-2 overflow-x-auto hide-scroll pb-1">
          {BEATS.map((b, idx) => (
            <button
              key={b.t}
              type="button"
              onClick={() => setI(idx)}
              className={cn(
                "min-h-11 shrink-0 border px-4 text-[0.68rem] tracking-[0.14em] uppercase transition-colors duration-200",
                i === idx ? "border-pearl text-fg" : "border-line text-muted hover:border-pearl/50",
              )}
            >
              {b.t}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[78svh] overflow-hidden">
        {BEATS.map((b, idx) => (
          <div
            key={b.t}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              i === idx ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <Cinema
              still={b.img}
              video={b.video}
              alt={b.alt}
              veil="panel"
              ken={b.ken}
              videoOpacity={0.08}
              rate={0.48}
            />
          </div>
        ))}
        <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-6xl items-end px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-xl">
            <p className="kicker">{beat.t}</p>
            <h3 className="mt-4 font-display text-3xl text-fg md:text-[2.6rem]">{beat.title}</h3>
            <p className="mt-6 leading-relaxed text-muted">{beat.body}</p>
            <div className="mt-10 flex gap-3">
              <button
                type="button"
                disabled={i === 0}
                onClick={() => setI((n) => Math.max(0, n - 1))}
                className="min-h-11 border border-line px-5 text-[0.7rem] tracking-[0.16em] text-muted uppercase disabled:opacity-30"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={i === BEATS.length - 1}
                onClick={() => setI((n) => Math.min(BEATS.length - 1, n + 1))}
                className="min-h-11 bg-pearl px-5 text-[0.7rem] tracking-[0.16em] text-abyss uppercase disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
