import { Reveal } from "./Reveal";

const FEATURED = [
  { src: "/images/cs7/cs7-in-01.jpg", cap: "The view from inside", pos: "52% 46%" },
  { src: "/images/cs7/cs7-in-03.jpg", cap: "Through the ports", pos: "48% 46%" },
] as const;

const FRAMES = [
  { src: "/images/wp-form-c.jpg", cap: "The sphere, at rest", pos: "50% 42%" },
  { src: "/images/wp-form-d.jpg", cap: "Four seats. The sea beyond.", pos: "50% 52%" },
  { src: "/images/wp-form-a.jpg", cap: "The working cabin", pos: "50% 42%" },
  { src: "/images/cs7/cs7-chairs.jpg", cap: "Held for the guest", pos: "50% 40%" },
  { src: "/images/cs7/cs7-lamps.jpg", cap: "Lamps at rest", pos: "50% 42%" },
  { src: "/images/wp-form-b.jpg", cap: "Ready for the drop", pos: "50% 48%" },
] as const;

export function Stills() {
  return (
    <section id="stills" className="section-y">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="kicker">From the water</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] text-fg">
            Undersea, and the craft that takes you there.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {FEATURED.map((f) => (
            <figure key={f.src}>
              <div className="relative overflow-hidden">
                <img
                  src={f.src}
                  alt={f.cap}
                  className="frame aspect-3/2 w-full object-cover"
                  style={{ objectPosition: f.pos }}
                />
              </div>
              <figcaption className="mt-3.5 text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                {f.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="stills-rail mt-6 flex gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 hide-scroll snap-x snap-mandatory md:gap-5 md:px-8">
        {FRAMES.map((f) => (
          <figure
            key={f.src}
            className="w-[86vw] shrink-0 snap-start md:w-[34vw] lg:w-[22vw]"
          >
            <div className="relative overflow-hidden">
              <img
                src={f.src}
                alt={f.cap}
                className="frame aspect-4/5 w-full object-cover"
                style={{ objectPosition: f.pos }}
              />
            </div>
            <figcaption className="mt-3.5 text-[0.68rem] tracking-[0.18em] text-muted uppercase">
              {f.cap}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}