import { Reveal } from "./Reveal";

const FRAMES = [
  { src: "/images/sub.jpg", cap: "The craft, below the light" },
  { src: "/images/viewport.jpg", cap: "Through the viewport" },
  { src: "/images/trench.jpg", cap: "Twilight water" },
  { src: "/images/scuba.jpg", cap: "The scuba passage" },
  { src: "/images/vessel.jpg", cap: "Ninety feet of support" },
  { src: "/images/wp-form-c.jpg", cap: "On the working line" },
  { src: "/images/silverbars.jpg", cap: "From these waters" },
] as const;

export function Stills() {
  return (
    <section id="stills" className="section-y">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="kicker">Stills</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] text-fg">
            From the working day.
          </h2>
        </Reveal>
      </div>
      <div className="mt-12 flex gap-4 overflow-x-auto px-5 pb-2 hide-scroll snap-x snap-mandatory md:gap-5 md:px-8">
        {FRAMES.map((f) => (
          <figure
            key={f.src}
            className="w-[74vw] shrink-0 snap-start sm:w-[48vw] md:w-[34vw] lg:w-[26vw]"
          >
            <img src={f.src} alt={f.cap} className="frame aspect-4/5 w-full object-cover" />
            <figcaption className="mt-4 text-[0.68rem] tracking-[0.18em] text-muted uppercase">
              {f.cap}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
