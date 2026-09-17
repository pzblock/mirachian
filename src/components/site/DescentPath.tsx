import { useEffect } from "react";
import { useReducedMotion } from "@/lib/motion";

/** Major lander stations — order matches the guided descent. */
export const DESCENT_STATIONS = [
  { id: "proof", meters: 0, zone: "Surface" },
  { id: "voyage", meters: 70, zone: "Reef" },
  { id: "passages", meters: 140, zone: "Reef" },
  { id: "descend", meters: 200, zone: "Twilight" },
  { id: "ledger", meters: 600, zone: "Drop" },
  { id: "craft", meters: 780, zone: "Drop" },
  { id: "day", meters: 900, zone: "Drop" },
  { id: "stills", meters: 1000, zone: "Frontier" },
  { id: "reserve", meters: 1140, zone: "Frontier" },
] as const;

/**
 * Quiet active-path observer. Marks the current station on <html>,
 * emphasizes that section, and flags the next SectionSeam as the obvious step.
 * No arrows / pills — depth language only.
 */
export function DescentPath() {
  const reduce = useReducedMotion();

  useEffect(() => {
    const stations = DESCENT_STATIONS.map((s) =>
      document.getElementById(s.id),
    ).filter((el): el is HTMLElement => !!el);

    if (!stations.length) return;

    const seams = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-seam-next]"));

    let currentId: string | null = null;

    const apply = (id: string | null) => {
      if (id === currentId) return;
      currentId = id;

      const root = document.documentElement;
      if (id) root.dataset.descent = id;
      else delete root.dataset.descent;

      for (const el of stations) {
        el.classList.toggle("is-descent-current", el.id === id);
      }

      const idx = DESCENT_STATIONS.findIndex((s) => s.id === id);
      let marked = false;
      for (const seam of seams()) {
        const target = seam.dataset.seamNext ?? "";
        const tIdx = DESCENT_STATIONS.findIndex((s) => s.id === target);
        const isNext = !marked && idx >= 0 && tIdx > idx;
        if (isNext) marked = true;
        seam.classList.toggle("is-seam-next", isNext);
      }
    };

    const ratios = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        let bestId: string | null = null;
        let best = 0;
        for (const s of DESCENT_STATIONS) {
          const r = ratios.get(s.id) ?? 0;
          if (r > best) {
            best = r;
            bestId = s.id;
          }
        }
        if (best >= 0.18) apply(bestId);
        else if (!currentId && bestId) apply(bestId);
      },
      {
        threshold: [0.12, 0.28, 0.45, 0.62],
        rootMargin: reduce ? "-8% 0px -42% 0px" : "-10% 0px -38% 0px",
      },
    );

    for (const el of stations) io.observe(el);

    const seed = () => {
      const mid = window.innerHeight * 0.38;
      let pick: string | null = null;
      for (const el of stations) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          pick = el.id;
          break;
        }
      }
      if (!pick) {
        for (const el of stations) {
          if (el.getBoundingClientRect().top > mid) break;
          pick = el.id;
        }
      }
      apply(pick ?? stations[0]?.id ?? null);
    };
    seed();
    const t = window.setTimeout(seed, 120);

    return () => {
      window.clearTimeout(t);
      io.disconnect();
      delete document.documentElement.dataset.descent;
      for (const el of stations) el.classList.remove("is-descent-current");
      for (const seam of seams()) seam.classList.remove("is-seam-next");
    };
  }, [reduce]);

  return null;
}
