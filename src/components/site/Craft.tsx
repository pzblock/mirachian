import { useState } from "react";
import { cn } from "@/lib/utils";
import { Cinema } from "./Cinema";
import { ImageVoidFeather } from "./SectionSeam";
import { Reveal } from "./Reveal";

const PIECES = [
  {
    id: "sphere",
    kicker: "The sphere",
    title: "Four guests. One pilot. Still water.",
    body: "An acrylic viewport that makes extraordinary depth feel composed. You sit. The sea does the moving. Cinema-grade imaging records the day as it happens — quiet, precise, and yours to keep.",
    img: "/images/cs7/cs7-seats.jpg",
    alt: "The passenger sphere — seats, viewport, still water beyond",
    fit: "cover" as const,
    specs: [
      ["Guests", "Four"],
      ["Pilot", "One"],
      ["Depth", "1,140 m"],
      ["Tone", "Quiet. Deliberate."],
    ],
  },
  {
    id: "vessel",
    kicker: "The ship",
    title: "Ninety feet. Ten days of endurance.",
    body: "A dedicated ocean-going support vessel — 90 feet, 2,700 nautical miles of range, rebuilt for work at sea. Transfer, sleep, meals, and the winch that sends the craft down. When the ocean refuses the plan, she waits.",
    img: "/images/vessel.jpg",
    alt: "The support vessel at dusk",
    fit: "cover" as const,
    pos: "50% 52%",
    specs: [
      ["Length", "90 ft"],
      ["Range", "2,700 nm"],
      ["Endurance", "10 days"],
      ["Winch", "2,000 m wire"],
    ],
  },
  {
    id: "eye",
    kicker: "The eye",
    title: "Cinema-grade capture, purpose-built.",
    body: "A custom imaging array for terrain no one has filmed this way. Quiet, precise, and made for the record of the day — so that whatever is encountered is preserved with the highest fidelity.",
    img: "/images/cs7/cs7-camera.jpg",
    alt: "Cinema imaging array on the submersible",
    fit: "cover" as const,
    specs: [
      ["Grade", "Cinema"],
      ["Purpose", "Unvisited terrain"],
      ["Record", "Yours to keep"],
      ["Light", "Built for the drop"],
    ],
  },
] as const;

export function Craft() {
  const [id, setId] = useState<(typeof PIECES)[number]["id"]>("sphere");
  const piece = PIECES.find((p) => p.id === id) ?? PIECES[0];

  return (
    <section id="craft">
      <div className="mx-auto max-w-6xl px-5 section-lead md:px-8">
        <Reveal>
          <p className="kicker">Craft</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] text-fg">
            Elite luxury. Uncompromising safety.
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            A dedicated support vessel and a deep-rated submersible, operated as
            one expedition system. Cinema-grade imaging. Conservative weather
            discipline. Pairing exceptional experience with the proficiency that
            makes extraordinary depth feel effortless.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-2">
          {PIECES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setId(p.id)}
              className={cn(
                "chip min-h-11 border px-5 text-[0.7rem] tracking-[0.16em] uppercase",
                id === p.id
                  ? "border-pearl bg-surface text-fg"
                  : "border-line text-muted",
              )}
            >
              {p.kicker}
            </button>
          ))}
        </div>
      </div>

      <div className="cine-frame md:min-h-[82svh]">
        <div className="cine-media">
          <Cinema
            key={piece.img}
            still={piece.img}
            alt={piece.alt}
            veil="panel"
            fit={piece.fit}
            objectPosition={
              piece.id === "sphere" ? "48% 36%" : piece.id === "vessel" ? "50% 52%" : undefined
            }
          />
          <ImageVoidFeather />
        </div>
        <div className="cine-copy mx-auto max-w-6xl px-5 py-10 md:min-h-[82svh] md:px-8 md:py-24">
          <div className="copy-veil max-w-xl">
            <p className="kicker">{piece.kicker}</p>
            <h3 className="mt-4 font-display text-3xl text-fg md:text-[2.6rem]">{piece.title}</h3>
            <p className="mt-6 leading-relaxed text-fg">{piece.body}</p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-7">
              {piece.specs.map(([k, v]) => (
                <div key={k} className="hover-spec">
                  <dt className="text-[0.62rem] tracking-[0.16em] text-pearl uppercase">{k}</dt>
                  <dd className="mt-1.5 text-sm text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div id="craft-safety" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <Reveal>
          <h3 className="font-display text-2xl text-fg md:text-3xl">
            Composure is part of the design
          </h3>
          <p className="mt-5 max-w-2xl text-muted">
            Depth demands discipline. When the ocean refuses the plan, we
            reschedule. We do not perform for the calendar.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Professional vessel and submersible operations",
            "Conservative environmental limits",
            "Briefings before every working day",
            "Track-appropriate guest screening",
          ].map((item) => (
            <p key={item} className="hover-rail border-l border-pearl/70 text-sm leading-relaxed text-muted">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
