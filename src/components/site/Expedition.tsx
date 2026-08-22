import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

export function Expedition() {
  return (
    <section id="voyage">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 section-y md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Reveal>
            <p className="kicker">Voyage</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.4rem)] text-fg">
              Not a tour.
              <br />
              A passage.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-muted">
              Mirachian Undersea offers ultra-private submersible expeditions from
              Key West — four guests, never more. Aboard a comfortable, deep-rated
              craft, each journey is a guided exploration of waters few will ever
              see, where history, uncharted terrain, and the quiet possibility of
              discovery still converge.
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              The Straits of Florida stretch toward Cuba as a genuine frontier:
              nearly 150 kilometers of open water, and tens of thousands of square
              miles of reef, sand, and deep channel. Every element of the day,
              from the ship itself to the proficiency that supports it, is
              arranged to feel effortless, intimate, and entirely exclusive.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative min-h-[72svh] overflow-hidden md:min-h-[82svh]">
        <Cinema
          still="/images/wp-form-b.jpg"
          alt="The Florida Keys from the air, looking toward the Straits"
          veil="soft"
          ken
        />
        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-6xl items-end px-5 py-14 md:min-h-[82svh] md:px-8 md:py-20">
          <p className="max-w-3xl font-display text-[clamp(1.7rem,3.4vw,3rem)] leading-[1.14] text-fg">
            A narrow channel. Five centuries of treasure fleets. A thousand lost
            ships. The bottom has not finished speaking.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <Reveal>
          <p className="max-w-3xl text-muted">
            For five hundred years this relatively narrow channel carried the
            great Spanish treasure fleets. Many wrecks still lie undiscovered —
            buried, or resting at depths far beyond ordinary diving. Currents,
            distance, and the limits of earlier technology kept them there. A
            luxury submersible changes the equation: safe, peaceful, precise
            exploration below 1,000 meters, with cinema-grade imaging of terrain
            almost no one has seen.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {[
            {
              title: "A handful of guests",
              body: "Four in the sphere. Two couples on scuba. Observers by arrangement. Nothing is built for volume.",
            },
            {
              title: "A day given to depth",
              body: "Arrival, briefing, a night at sea, a full working day below, then return. Weather writes the line. The standard does not.",
            },
            {
              title: "History, not harvest",
              body: "We approach wrecks and terrain with respect — for the law, the sites, and the fact that not everything below is meant to be taken.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="border-t border-line pt-7">
                <h3 className="font-display text-xl text-champagne">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
