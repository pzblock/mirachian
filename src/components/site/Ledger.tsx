import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

const BEATS = [
  {
    t: "Havana",
    title: "A season of the New World",
    body: "On the fourth of September, 1622, twenty-eight ships of the Tierra Firme fleet left Havana for Spain. Silver from the mountain of Potosí filled their holds in heavy bars. Gold, copper, indigo, tobacco, and the dark-green emeralds of Colombia traveled with them.",
  },
  {
    t: "The storm",
    title: "The Atocha, and what the wind tore free",
    body: "The next day a hurricane rose in the Straits and drove the fleet onto the reefs west of the Keys. Nuestra Señora de Atocha struck an outer reef and opened in fifty-five feet of water. Weeks later a second storm tore away her high sterncastle — the captain’s cabin, the finer quarters, the unregistered chests — and carried it into deeper channel.",
  },
  {
    t: "Unfinished",
    title: "The hull was found. The sterncastle was not.",
    body: "Manifests still leave hundreds of silver bars, tens of thousands of coins, gold, bronze, and the greater share of those unregistered emeralds unaccounted for — scattered from the Marquesas toward the Dry Tortugas, across reef, sand, and the beginning of the slope.",
  },
] as const;

const MARKS = [
  ["1622", "The Tierra Firme fleet sails from Havana."],
  ["24 tons", "Registered silver bars aboard the Atocha."],
  ["Never found", "The sterncastle, and the greater share of her cargo."],
  ["1,000+", "Ships lost across these waters in five centuries."],
] as const;

export function Ledger() {
  return (
    <section id="ledger">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 section-y md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Reveal>
            <p className="kicker">Why these waters</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.4rem)] text-fg">
              The lost
              <br />
              sterncastle.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-muted">
              The Straits of Florida carried the Spanish treasure fleets for five
              centuries. Storms took more than they returned. What remains of
              1622 — still unaccounted for, still in these waters — is why a
              Mirachian expedition leaves Key West at all.
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              We come not to repeat a museum. We come to look, with four guests,
              where scuba cannot: the unfinished cargo, the deeper channel, and
              the quiet possibility that the ledger is not yet closed.
            </p>
          </Reveal>
        </div>
      </div>

      <ol className="mx-auto max-w-6xl px-5 md:px-8">
        {BEATS.map((beat, i) => (
          <Reveal key={beat.t} delay={i * 60}>
            <li className="relative grid gap-5 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16">
              <p className="font-mono text-[0.62rem] tracking-[0.18em] text-pearl uppercase md:col-span-4">
                0{i + 1}
                <span className="mt-2 block tracking-[0.2em]">{beat.t}</span>
              </p>
              <div className="md:col-span-8">
                <h3 className="font-display text-2xl text-champagne md:text-[1.85rem]">
                  {beat.title}
                </h3>
                <p className="mt-5 max-w-2xl leading-relaxed text-muted">{beat.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <article className="cine-frame md:min-h-[78svh]">
        <div className="cine-media">
          <Cinema
            still="/images/silverbars.jpg"
            alt="Silver from these waters, still in the dark"
            veil="soft"
            objectPosition="50% 48%"
            ken
          />
        </div>
        <div className="cine-copy mx-auto max-w-6xl px-5 py-10 md:min-h-[78svh] md:px-8 md:py-20">
          <div className="copy-veil max-w-xl">
            <p className="kicker">4 September 1622</p>
            <p className="mt-4 font-display text-2xl text-fg md:text-[2.45rem]">
              The sterncastle was torn free. It was never found.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fg md:text-[0.95rem]">
              The lower hull of the Atocha was located. The greater share of
              what she carried — including chests the royal ledgers never named
              — remains in the Straits.
            </p>
          </div>
        </div>
      </article>

      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {MARKS.map(([k, v]) => (
            <div key={k} className="border-t border-line pt-7">
              <dt className="font-display text-2xl text-fg md:text-3xl">{k}</dt>
              <dd className="mt-3 max-w-[18ch] text-sm leading-relaxed text-muted">{v}</dd>
            </div>
          ))}
        </dl>

        <Reveal>
          <p className="mt-20 max-w-3xl leading-relaxed text-muted">
            A private submersible can leave Key West with four guests and a
            pilot, and descend far beyond the scuba line. Historical research
            and patient search shape the route. Cinema-grade imaging keeps the
            record. We go looking for treasure and artifacts — that hunt, in
            these waters, is the expedition.
          </p>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
            These same shallows took the Spanish steamship Valbanera in 1919 —
            thirty-seven miles west of Key West, four hundred eighty-eight
            souls. The Straits do not return what they are given. That is the
            water we came for.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
