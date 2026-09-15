import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

const ACCOUNT = [
  {
    n: "01",
    title: "Nuestra Señora de Atocha",
    body: (
      <p>
        Among the principal vessels was the galleon{" "}
        <em className="text-fg">Nuestra Señora de Atocha</em>. Her registered
        cargo alone listed more than a thousand silver bars — nearly twenty-four
        tons — together with some one hundred eighty thousand silver coins, more
        than a hundred gold bars and discs, copper ingots, and twenty bronze
        cannons. Unregistered wealth moved with her as well: smuggled gold,
        personal jewels, and chests of fine emeralds that never appeared on the
        royal ledgers.
      </p>
    ),
  },
  {
    n: "02",
    title: "The weather turned without mercy",
    bodies: [
      "The next day the weather turned without mercy. A hurricane rose in the Straits of Florida and seized the fleet. Driven northward before the wind, the ships were thrown upon the reefs and shallows west of the Keys. The Atocha struck an outer reef. Her hull opened in fifty-five feet of water. Of the two hundred sixty-five souls aboard, only five survived the night, clinging to the broken stump of the mizzenmast.",
      "A second storm, weeks later, completed the ruin. The high sterncastle — the elevated after-structure that held the captain’s cabin, the better passenger quarters, the finest emeralds, and those unregistered chests — was torn free and carried away into deeper water. The losses of the fleet were scattered across tens of miles of reef, sand, and channel, from the Marquesas Keys toward the Dry Tortugas.",
    ],
  },
  {
    n: "03",
    title: "The sterncastle was never found",
    body: (
      <p>
        Three and a half centuries passed before Mel Fisher’s team located the
        main lower hull and brought up one of the richest cargoes ever recovered
        from the sea. The sterncastle was never found. Manifests and the long
        debris trail still indicate that hundreds of silver bars, tens of
        thousands of coins, gold, bronze cannons, and the greater share of the
        unregistered emeralds remain unaccounted for. The search area covers many
        square miles of complex bottom and the beginning of the deeper slope.
      </p>
    ),
  },
] as const;

const MARKS = [
  ["1622", "The Tierra Firme fleet sails from Havana."],
  ["24 tons", "Registered silver bars aboard the Atocha."],
  ["488", "Souls lost with the Valbanera, none recovered."],
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
              The lost sterncastle
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-muted">
              On the fourth of September 1622, the Tierra Firme fleet weighed
              anchor in Havana and stood out for Spain. Twenty-eight ships
              carried the accumulated treasure of a season’s work in the New
              World. Silver from the mountain of Potosí filled their holds in
              heavy bars. Gold, copper, indigo, tobacco, and the dark-green
              emeralds of Colombia traveled with them.
            </p>
          </Reveal>
        </div>
      </div>

      <ol className="mx-auto max-w-6xl px-5 md:px-8">
        {ACCOUNT.map((beat) => (
          <Reveal key={beat.n}>
            <li className="relative grid gap-5 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16">
              <p className="font-mono text-[0.62rem] tracking-[0.18em] text-pearl uppercase md:col-span-4">
                {beat.n}
              </p>
              <div className="md:col-span-8">
                <h3 className="font-display text-2xl text-champagne md:text-[1.85rem]">
                  {beat.title}
                </h3>
                {"bodies" in beat ? (
                  <div className="mt-5 max-w-2xl space-y-5 leading-relaxed text-muted">
                    {beat.bodies.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 max-w-2xl leading-relaxed text-muted">
                    {beat.body}
                  </div>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <article className="group/wreck cine-frame md:min-h-[78svh]">
        <div className="cine-media">
          <Cinema
            still="/images/silverbars.jpg"
            alt="Silver from these waters"
            veil="soft"
            objectPosition="50% 48%"
            ken
          />
        </div>
        <div className="cine-copy mx-auto max-w-6xl px-5 py-10 md:min-h-[78svh] md:px-8 md:py-20">
          <div className="copy-veil max-w-xl">
            <p className="kicker">The unfinished cargo</p>
            <p className="mt-4 font-display text-2xl text-fg md:text-[2.45rem]">
              Silver from Potosí. Gold. Emeralds that never reached Spain.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fg md:text-[0.95rem]">
              The Atocha left Havana with more than a thousand silver bars —
              nearly twenty-four tons — and chests the royal ledgers never named.
              The hull was found. The sterncastle, and the greater share of what
              it held, is still in these waters.
            </p>
          </div>
        </div>
      </article>

      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <p className="leading-relaxed text-muted">
              Other vessels of the same fleet settled farther out. A private
              submersible can leave Key West with only a few people aboard and
              descend far beyond the limits of any scuba team. Historical
              research and patient, methodical search shape the route. Every
              moment can be recorded in cinema-grade clarity. The larger
              experience is the descent itself: the scale of the water, the
              knowledge of how much remains scattered and unseen, and the rare
              privilege of moving through it.
            </p>
          </Reveal>
          <aside className="md:col-span-5">
            <Reveal delay={80}>
              <div className="border border-line p-7 md:p-8">
                <p className="kicker">Did you know</p>
                <p className="mt-5 font-display text-2xl text-fg">
                  The Valbanera, 1919
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  In September 1919 the Spanish steamship Valbanera — sometimes
                  called the “poor man’s Titanic” — was lost in a hurricane near
                  Rebecca Shoal and Halfmoon Shoal, about thirty-seven nautical
                  miles west of Key West. She was carrying immigrants from Spain
                  and the Canary Islands bound for Cuba. All 488 passengers and
                  crew perished. No bodies were ever recovered from the wreck.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>

        <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {MARKS.map(([k, v]) => (
            <div key={k} className="border-t border-line pt-7">
              <dt className="font-display text-2xl text-fg md:text-3xl">{k}</dt>
              <dd className="mt-3 max-w-[18ch] text-sm leading-relaxed text-muted">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
