import { useEffect, useState } from "react";
import { DESCENT_STATIONS } from "./DescentPath";

const MAX_M = 1140;

const ZONES = [
  { p: 0, label: "Surface" },
  { p: 0.22, label: "Reef" },
  { p: 0.45, label: "Twilight" },
  { p: 0.72, label: "Drop" },
  { p: 1, label: "Frontier" },
] as const;

/**
 * Nav depth voice — scroll fill + quiet lock to the active descent station.
 * Pearl fill only (no champagne bead) so seam ticks own the continue cue.
 */
export function DepthRail() {
  const [p, setP] = useState(0);
  const [stationM, setStationM] = useState<number | null>(null);
  const [stationZone, setStationZone] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sync = () => {
      const id = document.documentElement.dataset.descent;
      const hit = DESCENT_STATIONS.find((s) => s.id === id);
      if (hit) {
        setStationM(hit.meters);
        setStationZone(hit.zone);
      } else {
        setStationM(null);
        setStationZone(null);
      }
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-descent"],
    });
    return () => mo.disconnect();
  }, []);

  const scrollM = Math.round((p * MAX_M) / 10) * 10;
  const meters = stationM ?? scrollM;
  const zone =
    stationZone ??
    ([...ZONES].reverse().find((z) => p >= z.p - 0.001) ?? ZONES[0]).label;
  const fill = Math.min(1, meters / MAX_M);

  return (
    <div
      className="depth-rail pointer-events-none hidden items-center gap-3 md:flex"
      aria-hidden
    >
      <div className="text-right">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] text-pearl uppercase tabular-nums transition-colors duration-500">
          {meters}m
        </p>
        <p className="text-[0.55rem] tracking-[0.18em] text-pearl/80 uppercase transition-colors duration-500">
          {zone}
        </p>
      </div>
      <div className="relative h-9 w-px bg-line">
        {ZONES.map((z) =>
          z.p === 0 || z.p === 1 ? null : (
            <span
              key={z.label}
              className="absolute left-1/2 h-px w-[4px] -translate-x-1/2 bg-pearl/28"
              style={{ top: `${z.p * 100}%` }}
            />
          ),
        )}
        <span
          className="depth-rail-fill absolute top-0 left-0 w-px bg-pearl/90 transition-[height] duration-500 ease-out"
          style={{ height: `${fill * 100}%` }}
        />
      </div>
    </div>
  );
}
