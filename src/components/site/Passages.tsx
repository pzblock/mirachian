import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

export function Passages() {
  return (
    <section id="passages">
      <div className="mx-auto max-w-6xl px-5 section-y md:px-8">
        <Reveal>
          <p className="kicker">Passages</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] text-fg">
            One expedition. Two ways to enter the sea.
          </h2>
          <p className="mt-6 max-w-xl text-muted">
            The same ship. The same waters. Choose the sphere — or stay on fins
            in the shallows while the others go below the line.
          </p>
        </Reveal>
      </div>

      <article id="passage-submersible" className="relative min-h-[88svh] overflow-hidden">
        <Cinema
          still="/images/cs7/op-023.jpg"
          alt="The submersible among the reef"
          veil="panel"
        />
        <div className="caustics pointer-events-none absolute inset-0 z-[2] opacity-[0.12]" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl items-end px-5 py-20 md:px-8 md:py-24">
          <Reveal className="max-w-xl">
            <p className="kicker">Flagship</p>
            <h3 className="mt-4 font-display text-3xl text-fg md:text-[2.6rem]">
              The submersible passage
            </h3>
            <p className="mt-6 leading-relaxed text-muted">
              Four guests. One pilot. Wide views, deliberate movement, and the
              rare sensation of leaving the ordinary sea behind — including
              reaches recreational diving cannot touch.
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
              className="mt-8 inline-flex min-h-11 w-fit items-center bg-pearl px-7 py-3 text-[0.7rem] tracking-[0.18em] text-abyss uppercase transition-transform duration-150 active:scale-[0.96]"
            >
              Inquire — submersible
            </a>
          </Reveal>
        </div>
      </article>

      <article id="passage-scuba" className="relative min-h-[88svh] overflow-hidden">
        <Cinema
          still="/images/cs7/op-010.jpg"
          alt="A diver alongside the submersible in clear water"
          veil="panel"
        />
        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl items-end justify-end px-5 py-20 md:px-8 md:py-24">
          <Reveal className="max-w-xl">
            <p className="kicker">Private diving</p>
            <h3 className="mt-4 font-display text-3xl text-fg md:text-[2.6rem]">
              The scuba passage
            </h3>
            <p className="mt-6 leading-relaxed text-muted">
              The same expedition. The same ship. Your day on fins — two couples
              only — held to the same standard of calm as the deep craft. The
              reef line, while the sphere works the drop.
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
