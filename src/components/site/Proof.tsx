import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

function useCount(to: number, start: boolean, duration = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(to);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - (1 - p) ** 3;
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return n;
}

function Stat({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix?: string;
  label: string;
  start: boolean;
}) {
  const n = useCount(value, start);
  return (
    <div className="border-t border-line pt-7">
      <p className="font-display text-4xl text-fg tabular-nums md:text-5xl">
        {n.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-3 max-w-[16ch] text-sm leading-relaxed text-muted">{label}</p>
    </div>
  );
}

export function Proof() {
  const ref = useRef<HTMLElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStart(true);
      },
      { threshold: 0.32 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="proof" ref={ref}>
      <div className="mx-auto max-w-6xl px-5 section-y md:px-8">
        <Reveal>
          <aside className="aside-plate aside-plate-wide">
            <p className="kicker">Did you know</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.7rem,3.4vw,2.75rem)] text-fg">
              More people have traveled to space than have physically descended to
              1,000 meters.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-pearl/90">
              Submersible travel is quieter — and many orders of magnitude safer —
              than the myth suggests. The rarity is access, not danger. That is why
              a Mirachian expedition is reserved for four guests, never more, and
              for those who recognize that true adventure is most uncommon.
            </p>
          </aside>
        </Reveal>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={4} label="Guests in the sphere. Never more." start={start} />
          <Stat
            value={1140}
            suffix="m"
            label="Rated operating depth of the craft."
            start={start}
          />
          <Stat
            value={1000}
            suffix="+"
            label="Ships lost across these waters in five centuries."
            start={start}
          />
          <Stat
            value={150}
            suffix="km"
            label="The Straits of Florida — Key West toward Cuba."
            start={start}
          />
        </div>
      </div>
    </section>
  );
}
