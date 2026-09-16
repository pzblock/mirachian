import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-frame]");
    const marker = el.scrollLeft + el.clientWidth * 0.28;
    let next = 0;
    cards.forEach((card, i) => {
      if (card.offsetLeft <= marker) next = i;
    });
    setActive(next);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    syncActive();
    el.addEventListener("scroll", syncActive, { passive: true });
    return () => el.removeEventListener("scroll", syncActive);
  }, [syncActive]);

  const go = (index: number) => {
    const el = scroller.current;
    const card = el?.querySelectorAll<HTMLElement>("[data-frame]")[index];
    card?.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" });
  };

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
              <div className="hover-frame relative overflow-hidden">
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

      <div className="relative mt-6">
        <div
          ref={scroller}
          className="stills-rail flex gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 hide-scroll snap-x snap-mandatory md:gap-5 md:px-8"
        >
          {FRAMES.map((f) => (
            <figure
              key={f.src}
              data-frame
              className="w-[64vw] shrink-0 snap-start md:w-[34vw] lg:w-[22vw]"
            >
              <div className="hover-frame relative overflow-hidden">
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

        <div className="mx-auto mt-5 flex max-w-6xl items-center justify-between px-5 md:hidden">
          <div className="flex items-center gap-2" role="tablist" aria-label="Gallery frames">
            {FRAMES.map((f, i) => (
              <button
                key={f.src}
                type="button"
                role="tab"
                aria-label={`Show ${f.cap}`}
                aria-current={active === i}
                onClick={() => go(i)}
                className={cn(
                  "size-2 rounded-full transition-colors duration-200",
                  active === i ? "bg-pearl" : "bg-line",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous frame"
              disabled={active === 0}
              onClick={() => go(Math.max(0, active - 1))}
              className="cta-ghost inline-flex size-11 items-center justify-center border border-line text-pearl disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next frame"
              disabled={active === FRAMES.length - 1}
              onClick={() => go(Math.min(FRAMES.length - 1, active + 1))}
              className="cta-ghost inline-flex size-11 items-center justify-center border border-line text-pearl disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
