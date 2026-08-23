import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

const COUNT = 40;

const SPECKS = Array.from({ length: COUNT }, (_, i) => {
  const sizeRoll = (i * 17) % 100;
  const size = sizeRoll > 92 ? 14 : sizeRoll > 72 ? 9 : 6;
  const top = (i * 13) % 96;
  const left = ((i * 37) % 97) + (i % 5) * 0.4;
  const dur = 22 + (i % 18);
  const pulse = 3.6 + (i % 7) * 0.45;
  const delay = -((i * 1.37) % dur);
  const sx = `${(i % 2 === 0 ? 1 : -1) * (8 + (i % 11))}px`;
  const opacity = 0.18 + (i % 5) * 0.05;
  const tone = i % 5 === 0 ? "aqua" : i % 3 === 0 ? "ice" : "pearl";
  return { i, size, top, left, dur, pulse, delay, sx, opacity, tone };
});

export function BioParticles() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.opacity = String(0.16 + p * 0.28);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={ref} className="bio-field" style={{ opacity: 0.16 }} aria-hidden>
      {SPECKS.map((s) => (
        <span
          key={s.i}
          className={`bio-speck bio-${s.tone}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.dur}s, ${s.pulse}s`,
            animationDelay: `${s.delay}s, ${s.delay * 0.4}s`,
            ["--sx" as string]: s.sx,
            ["--o" as string]: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
