import { useState } from "react";
import { cn } from "@/lib/utils";
import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

const PIECES = [
  {
    id: "sphere",
    kicker: "The sphere",
    title: "Four guests. One pilot. Still water.",
    body: "An acrylic viewport that makes depth feel composed, not theatrical. You sit. The sea does the moving. The day is filmed as it happens.",
    img: "/images/viewport.jpg",
    alt: "Coral through the submersible viewport",
    fit: "cover" as const,
    specs: [
      ["Guests", "Four, never five"],
      ["Pilot", "One, always"],
      ["Depth", "Beyond 1,000 m"],
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
    body: "A custom imaging array for terrain no one has filmed this way — quiet, precise, and made for the record of the day. You leave with more than a memory.",
    img: "/images/wp-206.jpg",
    alt: "Custom cinema imaging array for the submersible",
    fit: "contain" as const,
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
      <div className="mx-auto max-w-6xl px-5 section-y md:px-8">
        <Reveal>
          <p className="kicker">Craft</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] text-fg">
            Built for the work. Finished for the guest.
          </h2>
          <p className="mt-6 max-w-2xl text-muted">
            A dedicated support vessel and a deep-rated submersible, operated as
            one expedition system — with cinema-grade imaging designed for these
            waters.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-2">
          {PIECES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setId(p.id)}
              className={cn(
                "min-h-11 border px-5 text-[0.7rem] tracking-[0.16em] uppercase transition-colors duration-200",
                id === p.id
                  ? "border-pearl bg-surface text-fg"
                  : "border-line text-muted hover:border-pearl/50",
              )}
            >
              {p.kicker}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[82svh] overflow-hidden">
        {PIECES.map((p) => (
          <div
            key={p.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              id === p.id ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <Cinema still={p.img} alt={p.alt} veil="panel" fit={p.fit} />
          </div>
        ))}
        <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-6xl items-end px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-xl">
            <p className="kicker">{piece.kicker}</p>
            <h3 className="mt-4 font-display text-3xl text-fg md:text-[2.6rem]">{piece.title}</h3>
            <p className="mt-6 leading-relaxed text-muted">{piece.body}</p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-7">
              {piece.specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.62rem] tracking-[0.16em] text-muted uppercase">{k}</dt>
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
            <p key={item} className="border-l border-pearl/70 pl-5 text-sm leading-relaxed text-muted">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
