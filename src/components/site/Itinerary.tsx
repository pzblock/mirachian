import { useState } from "react";
import { cn } from "@/lib/utils";
import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

const BEATS = [
  {
    t: "01 · Transfer",
    title: "Key West, then the ship",
    body: "A private transfer from Key West, a quiet briefing, and the first look at the craft. You are not processed. You are received.",
    img: "/images/cs7/cs7-front.jpg",
    alt: "The submersible at rest before the drop — first look at the craft",
    ken: false,
  },
  {
    t: "02 · Night aboard",
    title: "Sleep on the working water",
    body: "The Straits at night. Dinner, rest, the instruments already listening. Weather is watched with the same discipline as the descent.",
    img: "/images/vessel.jpg",
    alt: "The expedition ship at dusk, before the working day",
    ken: true,
    pos: "42% 55%",
  },
  {
    t: "03 · Descent",
    title: "The sphere takes you down",
    body: "Four guests. One pilot. Color leaves, then light. Recreational diving is already behind you. The search, and the record of it, has begun.",
    img: "/images/cs7/op-024.jpg",
    alt: "The submersible settling into the water as the descent begins",
    ken: false,
  },
  {
    t: "04 · Survey",
    title: "Terrain almost no one has seen",
    body: "Cinema-grade capture of wreck, slope, and channel floor. Historical research and patient search shape the route across square miles rather than single points. The looking is the reward.",
    img: "/images/cs7/op-022.jpg",
    alt: "The submersible close above the coral floor",
    ken: false,
  },
  {
    t: "05 · Return",
    title: "Surface, then home",
    body: "Back through the reef line. A last look at the water. You leave with the record of the day — and the knowledge of how much remains unseen.",
    img: "/images/wp/wp-bg-62.jpg",
    alt: "The Keys and the working water from the air",
    ken: true,
  },
] as const;

function BeatCopy({
  beat,
}: {
  beat: (typeof BEATS)[number];
}) {
  return (
    <>
      <p className="kicker">{beat.t}</p>
      <h3 className="mt-4 font-display text-3xl text-fg md:text-[2.6rem]">{beat.title}</h3>
      <p className="mt-6 leading-relaxed text-fg">{beat.body}</p>
    </>
  );
}

export function Itinerary() {
  const [i, setI] = useState(0);
  const beat = BEATS[i] ?? BEATS[0];

  return (
    <section id="day">
      <div className="mx-auto max-w-6xl px-5 section-lead md:px-8">
        <Reveal>
          <p className="kicker">The working day</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] text-fg">
            Arrival, night, depth, return.
          </h2>
        </Reveal>

        <div className="day-tabs mt-10 grid grid-cols-3 gap-2 md:mt-12 md:flex md:flex-wrap">
          {BEATS.map((b, idx) => (
            <button
              key={b.t}
              type="button"
              onClick={() => setI(idx)}
              className={cn(
                "min-h-11 border px-2 text-[0.62rem] leading-tight tracking-[0.1em] uppercase transition-colors duration-200 md:shrink-0 md:px-4 md:text-[0.68rem] md:tracking-[0.14em]",
                i === idx ? "border-pearl text-fg" : "border-line text-muted hover:border-pearl/50",
              )}
            >
              {b.t}
            </button>
          ))}
        </div>
      </div>

      <div className="cine-frame md:min-h-[78svh]">
        <div className="cine-media">
          <Cinema
            key={beat.img}
            still={beat.img}
            alt={beat.alt}
            veil="panel"
            ken={beat.ken}
            objectPosition={"pos" in beat ? beat.pos : undefined}
          />
        </div>
        <div className="cine-copy mx-auto max-w-6xl px-5 py-10 md:min-h-[78svh] md:px-8 md:py-24">
          <div className="copy-veil max-w-xl">
            <BeatCopy beat={beat} />
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
