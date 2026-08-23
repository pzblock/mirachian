import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

export function Passages() {
  return (
    <section id="passages">
      <div className="mx-auto max-w-6xl px-5 section-lead md:px-8">
        <Reveal>
          <p className="kicker">Passages</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] text-fg">
            One expedition. Two ways to enter the sea.
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            The same ship, the same waters, the same standard of calm. Four
            guests may take the sphere to depths scuba cannot touch — or remain
            on fins along the reef while the others go below the line.
          </p>
        </Reveal>
      </div>

      <article id="passage-submersible" className="cine-frame md:min-h-[88svh]">
        <div className="cine-media">
          <Cinema
            still="/images/cs7/op-025.jpg"
            alt="The submersible hovering over living coral"
            veil="panel"
            objectPosition="50% 62%"
            snow
          />
        </div>
        <div className="cine-copy mx-auto max-w-6xl px-5 py-10 md:min-h-[88svh] md:px-8 md:py-24">
          <Reveal className="copy-veil max-w-xl">
            <p className="kicker">Flagship</p>
            <h3 className="mt-4 font-display text-3xl text-fg md:text-[2.6rem]">
              The submersible passage
            </h3>
            <p className="mt-6 leading-relaxed text-fg">
              Aboard a comfortable, deep-rated craft, four guests and one pilot
              make a guided descent far beyond the limits of recreational diving.
              Wide views, deliberate movement, and cinema-grade imaging of
              unvisited terrain — including the Pourtalès slope and the deeper
              channels below 1,000 meters.
            </p>
            <ul className="mt-10 space-y-3 text-sm text-fg">
              <li className="border-l border-pearl/70 pl-5">Maximum four guests per dive</li>
              <li className="border-l border-pearl/70 pl-5">Cinema-grade imaging of unvisited terrain</li>
              <li className="border-l border-pearl/70 pl-5">Rated to 1,140 meters</li>
              <li className="border-l border-pearl/70 pl-5">Conservative weather discipline</li>
            </ul>
            <p className="mt-10 text-sm text-champagne">
              From $18,500 a couple. Terms may be arranged privately.
            </p>
            <a
              href="#reserve"
              className="mt-8 inline-flex min-h-11 w-fit items-center border border-line px-7 py-3 text-[0.7rem] tracking-[0.2em] text-pearl uppercase transition-colors duration-200 hover:border-pearl"
            >
              Inquire — submersible
            </a>
          </Reveal>
        </div>
      </article>

      <article id="passage-scuba" className="cine-frame md:min-h-[88svh]">
        <div className="cine-media">
          <Cinema
            still="/images/scuba.jpg"
            alt="Clear reef water on the scuba line"
            veil="panel-end"
            objectPosition="50% 55%"
            snow
          />
        </div>
        <div className="cine-copy mx-auto max-w-6xl justify-end px-5 py-10 md:min-h-[88svh] md:px-8 md:py-24">
          <Reveal className="copy-veil max-w-xl">
            <p className="kicker">Private diving</p>
            <h3 className="mt-4 font-display text-3xl text-fg md:text-[2.6rem]">
              The scuba passage
            </h3>
            <p className="mt-6 leading-relaxed text-fg">
              The same expedition, the same ship. Your day on fins — two couples
              only — held to the same standard as the deep craft. Clear Keys
              water and private sites, while the sphere works the drop.
            </p>
            <ul className="mt-10 space-y-3 text-sm text-fg">
              <li className="border-l border-pearl/70 pl-5">Two couples, never a crowd</li>
              <li className="border-l border-pearl/70 pl-5">Clear Keys water, private sites</li>
              <li className="border-l border-pearl/70 pl-5">Observer places on the ship</li>
            </ul>
            <p className="mt-10 text-sm text-champagne">
              From $11,500 a couple. Observer places from $3,950.
            </p>
            <a
              href="#reserve"
              className="mt-8 inline-flex min-h-11 w-fit items-center border border-line px-7 py-3 text-[0.7rem] tracking-[0.18em] text-pearl uppercase transition-colors duration-200 hover:border-pearl"
            >
              Inquire — scuba
            </a>
          </Reveal>
        </div>
      </article>
    </section>
  );
}
