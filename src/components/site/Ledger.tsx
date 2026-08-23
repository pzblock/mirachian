import { Cinema } from "./Cinema";
import { Reveal } from "./Reveal";

export function Ledger() {
  return (
    <section id="ledger">
      <div className="mx-auto max-w-6xl px-5 section-y md:px-8">
        <Reveal>
          <p className="kicker">Why these waters</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.2vw,3.4rem)] text-fg">
            The lost sterncastle
          </h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted">
            On the fourth of September 1622, the Tierra Firme fleet weighed
            anchor in Havana and stood out for Spain. Twenty-eight ships carried
            the accumulated treasure of a season’s work in the New World. Silver
            from the mountain of Potosí filled their holds in heavy bars. Gold,
            copper, indigo, tobacco, and the dark-green emeralds of Colombia
            traveled with them.
          </p>
        </Reveal>
      </div>

      <article className="group/wreck cine-frame md:min-h-[80vh]">
        <div className="cine-media md:min-h-[80vh]">
          <Cinema
            still="/images/silverbars.jpg"
            alt="Silver from these waters"
            veil="soft"
            objectPosition="50% 48%"
          />
        </div>
        <div className="cine-copy mx-auto max-w-6xl px-5 py-10 md:min-h-[80vh] md:px-8 md:py-20">
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

      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7 space-y-6 text-[1.05rem] leading-relaxed text-muted">
              <p>
                Among the principal vessels was the galleon{" "}
                <em className="text-fg">Nuestra Señora de Atocha</em>. Her
                registered cargo alone listed more than a thousand silver bars —
                nearly twenty-four tons — together with some one hundred eighty
                thousand silver coins, more than a hundred gold bars and discs,
                copper ingots, and twenty bronze cannons. Unregistered wealth
                moved with her as well: smuggled gold, personal jewels, and
                chests of fine emeralds that never appeared on the royal ledgers.
              </p>
              <p>
                The next day the weather turned without mercy. A hurricane rose
                in the Straits of Florida and seized the fleet. Driven northward
                before the wind, the ships were thrown upon the reefs and
                shallows west of the Keys. The Atocha struck an outer reef. Her
                hull opened in fifty-five feet of water. Of the two hundred
                sixty-five souls aboard, only five survived the night, clinging
                to the broken stump of the mizzenmast.
              </p>
              <p>
                A second storm, weeks later, completed the ruin. The high
                sterncastle — the elevated after-structure that held the
                captain’s cabin, the better passenger quarters, the finest
                emeralds, and those unregistered chests — was torn free and
                carried away into deeper water. The losses of the fleet were
                scattered across tens of miles of reef, sand, and channel, from
                the Marquesas Keys toward the Dry Tortugas.
              </p>
              <p>
                Three and a half centuries passed before Mel Fisher’s team
                located the main lower hull and brought up one of the richest
                cargoes ever recovered from the sea. The sterncastle was never
                found. Manifests and the long debris trail still indicate that
                hundreds of silver bars, tens of thousands of coins, gold, bronze
                cannons, and the greater share of the unregistered emeralds
                remain unaccounted for. The search area covers many square miles
                of complex bottom and the beginning of the deeper slope.
              </p>
              <p>
                Other vessels of the same fleet settled farther out. A private
                submersible can leave Key West with only a few people aboard and
                descend far beyond the limits of any scuba team. Historical
                research and patient, methodical search shape the route. Every
                moment can be recorded in cinema-grade clarity. The larger
                experience is the descent itself: the scale of the water, the
                knowledge of how much remains scattered and unseen, and the rare
                privilege of moving through it.
              </p>
            </div>
            <aside className="md:col-span-5">
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
              <dl className="mt-8 grid grid-cols-2 gap-6">
                {[
                  ["1622", "The Tierra Firme fleet sails from Havana."],
                  ["24 tons", "Registered silver bars aboard the Atocha."],
                  ["488", "Souls lost with the Valbanera, none recovered."],
                  ["1,000+", "Ships lost across these waters in five centuries."],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-display text-2xl text-fg">{k}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}