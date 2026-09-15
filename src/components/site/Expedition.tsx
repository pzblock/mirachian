import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

export function Expedition() {
  return (
    <section id="voyage">
      <div className="mx-auto max-w-6xl px-5 section-y md:px-8">
        <Reveal>
          <p className="kicker">Voyage</p>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4.2vw,3.4rem)] text-fg">
            Join us on the frontier
            <br />
            of the unexplored.
          </h2>
        </Reveal>
      </div>

      <div className="cine-frame md:min-h-[82svh]">
        <div className="cine-media">
          <Cinema
            still="/images/cs7/op-023.jpg"
            alt="The submersible among reef fish in Key West water"
            veil="soft"
            objectPosition="78% 68%"
          />
        </div>
        <div className="cine-copy mx-auto max-w-6xl px-5 py-10 md:min-h-[82svh] md:px-8 md:py-20">
          <p className="copy-veil max-w-3xl font-display text-[clamp(1.55rem,3.2vw,2.7rem)] leading-[1.18] text-fg">
            The Straits of Florida stretch between Key West and Cuba as a virgin
            frontier — nearly 150 kilometers of open water, and tens of thousands
            of square miles of reef, sand, and deep channel.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <Reveal>
          <p className="max-w-3xl leading-relaxed text-muted">
            For five centuries this relatively narrow channel carried the great
            Spanish treasure fleets. Historical records suggest well over a
            thousand vessels have been lost across the Keys and Straits; many
            still lie undiscovered, buried, or resting at depths far beyond
            ordinary diving. Ocean currents, vast distances, and the limits of
            earlier technology kept them hidden. A private, deep-rated
            submersible changes this completely — allowing a safe, peaceful, and
            precise adventure below 1,000 meters, with cinema-grade imaging of
            terrain almost no one has seen.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Four guests. Never more.",
              body: "The sphere holds four, and a pilot. Two couples may remain on scuba while the others go below. Observers travel by arrangement. Nothing here is built for volume.",
            },
            {
              title: "A day given to depth",
              body: "Arrival, briefing, a night at sea, a full working day below, then return. Weather writes the line. The standard of calm does not.",
            },
            {
              title: "The search is the reward",
              body: "We go looking for treasure and artifacts — that hunt, in these waters, is the expedition. Whatever else the channel yields is a gift on top of it.",
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