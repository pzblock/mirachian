import { useEffect } from "react";

const NAVY = "#234a6a";
const SIZE = 64;
const TURN_MS = 14000;
const PULSE_MS = 2600;

function easeOutSoft(t: number) {
  const cx = 3 * 0.22;
  const bx = 3 * (0.36 - 0.22) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * 1;
  const by = 3 * (1 - 1) - cy;
  const ay = 1 - cy - by;
  let x = t;
  for (let i = 0; i < 5; i += 1) {
    const xEst = ((ax * x + bx) * x + cx) * x - t;
    const d = (3 * ax * x + 2 * bx) * x + cx;
    if (Math.abs(d) < 1e-6) break;
    x -= xEst / d;
  }
  return ((ay * x + by) * x + cy) * x;
}

function pulse(now: number, rest: number, peak: number) {
  const p = (now % PULSE_MS) / PULSE_MS;
  const u = p < 0.5 ? easeOutSoft(p * 2) : easeOutSoft((p - 0.5) * 2);
  return p < 0.5 ? rest + (peak - rest) * u : peak + (rest - peak) * u;
}

export function FaviconPulse() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    const icon = link;
    icon.type = "image/png";

    const origin = performance.now();
    let raf = 0;
    let last = 0;

    const draw = (stamp: number) => {
      raf = requestAnimationFrame(draw);
      if (document.visibilityState === "hidden") return;
      if (stamp - last < 90) return;
      last = stamp;

      const elapsed = stamp - origin;
      const turn = ((elapsed % TURN_MS) / TURN_MS) * Math.PI * 2;
      const outerScale = pulse(elapsed, 1, 1.12);
      const outerOp = pulse(elapsed, 0.85, 1);
      const innerScale = pulse(elapsed, 1, 0.84);
      const innerOp = pulse(elapsed, 1, 0.7);

      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.save();
      ctx.translate(SIZE / 2, SIZE / 2);
      ctx.rotate(turn);
      ctx.strokeStyle = NAVY;
      ctx.lineCap = "square";

      ctx.save();
      ctx.globalAlpha = outerOp;
      ctx.scale(outerScale, outerScale);
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = innerOp;
      ctx.scale(innerScale, innerScale);
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 12.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.globalAlpha = 1;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-12.8, 0);
      ctx.lineTo(12.8, 0);
      ctx.stroke();
      ctx.restore();

      icon.href = canvas.toDataURL("image/png");
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      icon.type = "image/svg+xml";
      icon.href = "/favicon.svg?v=navy";
    };
  }, []);

  return null;
}
