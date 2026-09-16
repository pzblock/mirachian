import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

function PassageOffer({
  price,
  terms,
  href,
  label,
}: {
  price: string;
  terms: string;
  href: string;
  label: string;
}) {
  return (
    <div className="hover-row mt-6">
      <p className="text-sm text-champagne">{price}</p>
      <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted">{terms}</p>
      <a
        href={href}
        className="cta-ghost mt-6 inline-flex min-h-11 w-fit items-center border border-line px-7 py-3 text-[0.7rem] tracking-[0.2em] text-pearl uppercase"
      >
        {label}
      </a>
    </div>
  );
}

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

      <article
        id="passage-submersible"
        className="passages-cine cine-frame flex flex-col md:block md:min-h-[72svh]"
      >
        <div className="cine-media order-2">
          <Cinema
            still="/images/cs7/op-025.jpg"
            alt="The submersible hovering over living coral"
            veil="panel"
            objectPosition="50% 62%"
            snow
          />
        </div>
        <div className="cine-copy order-1 mx-auto max-w-6xl px-5 py-8 md:min-h-[72svh] md:px-8 md:py-16">
          <Reveal className="copy-veil max-w-xl">
            <p className="kicker">Flagship</p>
            <h3 className="mt-3 font-display text-3xl text-fg md:text-[2.6rem]">
              The submersible passage
            </h3>
            <p className="mt-5 leading-relaxed text-fg">
              Aboard a comfortable, deep-rated craft, four guests and one pilot
              make a guided descent far beyond the limits of recreational diving.
              Wide views, deliberate movement, and cinema-grade imaging of
              unvisited terrain — including the Pourtalès slope and the deeper
              channels below 1,000 meters.
            </p>
            <PassageOffer
              price="From $18,500 a couple. Terms may be arranged privately."
              terms="A $250 deposit per couple holds the place. Fully refundable until the booking is confirmed."
              href="#reserve"
              label="Inquire — submersible"
            />
            <ul className="mt-6 space-y-2.5 text-sm text-fg">
              <li className="hover-rail border-l border-pearl/70 pl-5">Maximum four guests per dive</li>
              <li className="hover-rail border-l border-pearl/70 pl-5">Cinema-grade imaging of unvisited terrain</li>
              <li className="hover-rail border-l border-pearl/70 pl-5">Rated to 1,140 meters</li>
              <li className="hover-rail border-l border-pearl/70 pl-5">Conservative weather discipline</li>
            </ul>
          </Reveal>
        </div>
      </article>

      <article
        id="passage-scuba"
        className="passages-cine cine-frame flex flex-col md:block md:min-h-[72svh]"
      >
        <div className="cine-media order-2">
          <Cinema
            still="/images/scuba.jpg"
            alt="Clear reef water on the scuba line"
            veil="panel-end"
            objectPosition="50% 55%"
            snow
          />
        </div>
        <div className="cine-copy order-1 mx-auto max-w-6xl justify-end px-5 py-8 md:min-h-[72svh] md:px-8 md:py-16">
          <Reveal className="copy-veil max-w-xl">
            <p className="kicker">Private diving</p>
            <h3 className="mt-3 font-display text-3xl text-fg md:text-[2.6rem]">
              The scuba passage
            </h3>
            <p className="mt-5 leading-relaxed text-fg">
              The same expedition, the same ship. Your day on fins — two couples
              only — held to the same standard as the deep craft. Clear Keys
              water and private sites, while the sphere works the drop.
            </p>
            <PassageOffer
              price="From $11,500 a couple. Observer places from $3,950."
              terms="A $250 deposit per couple holds the place. Fully refundable until the booking is confirmed."
              href="#reserve"
              label="Inquire — scuba"
            />
            <ul className="mt-6 space-y-2.5 text-sm text-fg">
              <li className="hover-rail border-l border-pearl/70 pl-5">Two couples, never a crowd</li>
              <li className="hover-rail border-l border-pearl/70 pl-5">Clear Keys water, private sites</li>
              <li className="hover-rail border-l border-pearl/70 pl-5">Observer places on the ship</li>
            </ul>
          </Reveal>
        </div>
      </article>
    </section>
  );
}
