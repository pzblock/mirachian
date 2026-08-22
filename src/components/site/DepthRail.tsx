import { useEffect, useState } from "react";

const ZONES = [
  { p: 0, label: "Surface" },
  { p: 0.22, label: "Reef" },
  { p: 0.45, label: "Twilight" },
  { p: 0.72, label: "Drop" },
  { p: 1, label: "Frontier" },
] as const;

export function DepthRail() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const meters = Math.round(p * 1700);
  const zone = [...ZONES].reverse().find((z) => p >= z.p - 0.001) ?? ZONES[0];

  return (
    <div
      className="pointer-events-none hidden items-center gap-3 md:flex"
      aria-hidden
    >
      <div className="text-right">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] text-pearl uppercase tabular-nums">
          {meters}m
        </p>
        <p className="text-[0.55rem] tracking-[0.18em] text-muted uppercase">{zone.label}</p>
      </div>
      <div className="relative h-8 w-px bg-line">
        <span
          className="absolute bottom-0 left-0 w-px bg-pearl"
          style={{ height: `${p * 100}%` }}
        />
      </div>
    </div>
  );
}
