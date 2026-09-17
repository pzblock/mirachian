import { useEffect, useRef } from "react";
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
 * Guided descent — station observer + champagne sounding line.
 * Hairline draws with scroll between seam ticks, soft flow + tip mote.
 * Depth language only — no arrows or pills.
 */
export function DescentPath() {
  const reduce = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGLineElement>(null);
  const drawRef = useRef<SVGLineElement>(null);
  const flowRef = useRef<SVGLineElement>(null);
  const moteRef = useRef<SVGCircleElement>(null);

  /* Station / seam observer */
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

      const idx = DESCENT_STATIONS.findIndex((s) => s.id === id);

      for (const el of stations) {
        const sIdx = DESCENT_STATIONS.findIndex((s) => s.id === el.id);
        el.classList.toggle("is-descent-current", el.id === id);
        el.classList.toggle(
          "is-descent-past",
          idx >= 0 && sIdx >= 0 && sIdx < idx,
        );
      }

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
      for (const el of stations) {
        el.classList.remove("is-descent-current", "is-descent-past");
      }
      for (const seam of seams()) seam.classList.remove("is-seam-next");
    };
  }, [reduce]);

  /* Sounding line geometry + scroll-tied draw */
  useEffect(() => {
    const host = hostRef.current;
    const track = trackRef.current;
    const draw = drawRef.current;
    const flow = flowRef.current;
    const mote = moteRef.current;
    if (!host || !track || !draw || !flow || !mote) return;

    const root = document.documentElement;
    root.dataset.sounding = "1";

    let raf = 0;
    let firstY = 0;
    let lastY = 0;
    let cx = 0;
    let ready = false;

    const anchors = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>("[data-seam-anchor]"),
      );

    const layout = () => {
      const main = host.closest("main") ?? document.body;
      const mainRect = main.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const mainTop = mainRect.top + scrollY;
      const h = Math.max(main.scrollHeight, mainRect.height);
      const w = mainRect.width;

      host.style.height = `${h}px`;

      const ticks = anchors();
      if (ticks.length < 2) {
        ready = false;
        host.classList.remove("is-ready");
        return;
      }

      const ys = ticks.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + scrollY + r.height / 2 - mainTop;
      });

      firstY = ys[0]!;
      lastY = ys[ys.length - 1]!;
      cx = w / 2;

      const x = cx.toFixed(1);
      for (const line of [track, draw, flow]) {
        line.setAttribute("x1", x);
        line.setAttribute("x2", x);
        line.setAttribute("y1", firstY.toFixed(1));
      }
      track.setAttribute("y2", lastY.toFixed(1));

      ready = lastY - firstY > 40;
      host.classList.toggle("is-ready", ready);
      paint();
    };

    const paint = () => {
      if (!ready) return;
      const main = host.closest("main") ?? document.body;
      const mainRect = main.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const mainTop = mainRect.top + scrollY;
      const reading = scrollY + window.innerHeight * 0.38 - mainTop;
      const span = Math.max(1, lastY - firstY);
      const p = Math.min(1, Math.max(0, (reading - firstY) / span));
      const tip = firstY + p * span;

      draw.setAttribute("y2", tip.toFixed(1));
      flow.setAttribute("y2", tip.toFixed(1));
      flow.setAttribute("y1", firstY.toFixed(1));
      mote.setAttribute("cx", cx.toFixed(1));
      mote.setAttribute("cy", tip.toFixed(1));

      root.style.setProperty("--descent-progress", p.toFixed(4));
      host.style.setProperty("--descent-tip", `${tip}px`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        paint();
      });
    };

    const onHover = (e: Event) => {
      const t = e.target as Element | null;
      if (e.type === "mouseover" || e.type === "focusin") {
        if (t?.closest?.(".section-seam-wrap")) {
          host.classList.add("is-seam-hot");
        }
        return;
      }
      const related =
        ((e as FocusEvent).relatedTarget as Element | null) ??
        ((e as MouseEvent).relatedTarget as Element | null);
      if (!related?.closest?.(".section-seam-wrap")) {
        host.classList.remove("is-seam-hot");
      }
    };

    layout();
    const t0 = window.setTimeout(layout, 80);
    const t1 = window.setTimeout(layout, 400);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout, { passive: true });
    document.addEventListener("mouseover", onHover, true);
    document.addEventListener("mouseout", onHover, true);
    document.addEventListener("focusin", onHover, true);
    document.addEventListener("focusout", onHover, true);

    const ro = new ResizeObserver(layout);
    const main = host.closest("main");
    if (main) ro.observe(main);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      document.removeEventListener("mouseover", onHover, true);
      document.removeEventListener("mouseout", onHover, true);
      document.removeEventListener("focusin", onHover, true);
      document.removeEventListener("focusout", onHover, true);
      ro.disconnect();
      delete root.dataset.sounding;
      root.style.removeProperty("--descent-progress");
    };
  }, [reduce]);

  return (
    <div
      ref={hostRef}
      className={
        reduce
          ? "descent-sounding descent-sounding--static"
          : "descent-sounding"
      }
      aria-hidden
    >
      <svg
        className="descent-sounding-svg"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <line
          ref={trackRef}
          className="descent-sounding-track"
          vectorEffect="non-scaling-stroke"
        />
        <line
          ref={drawRef}
          className="descent-sounding-draw"
          vectorEffect="non-scaling-stroke"
        />
        <line
          ref={flowRef}
          className="descent-sounding-flow"
          vectorEffect="non-scaling-stroke"
        />
        <circle ref={moteRef} className="descent-sounding-mote" r="2.25" />
      </svg>
    </div>
  );
}
