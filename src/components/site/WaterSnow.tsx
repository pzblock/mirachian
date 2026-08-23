import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

const COLORS: [number, number, number][] = [
  [0, 255, 220],
  [0, 210, 255],
  [60, 255, 190],
  [130, 255, 255],
  [40, 180, 255],
];

type Particle = {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  baseSize: number;
  swayOffset: number;
  swaySpeed: number;
  swayStrength: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  depth: number;
  glow: number;
};

function makeEl(color: [number, number, number]) {
  const el = document.createElement("span");
  const [r, g, b] = color;
  el.className = "bio-mote";
  el.style.background = `radial-gradient(circle, rgba(${r},${g},${b},1) 0%, rgba(${r},${g},${b},0.45) 18%, rgba(${r},${g},${b},0.22) 40%, rgba(${r},${g},${b},0) 70%)`;
  return el;
}

export function WaterSnow({ count = 70 }: { count?: number; seed?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = wrap.current;
    if (!root || reduce) return;

    let width = Math.max(1, root.clientWidth);
    let height = Math.max(1, root.clientHeight);
    let running = false;
    let raf = 0;
    const particles: Particle[] = [];

    const reset = (p: Particle, initial = false) => {
      p.x = Math.random() * width;
      p.y = initial ? height * 0.45 + Math.random() * height * 0.6 : -30;
      const sizeRoll = Math.random();
      p.baseSize = sizeRoll > 0.92 ? Math.random() * 3.2 + 2.2 : Math.random() * 1.8 + 0.6;
      p.vx = (Math.random() - 0.5) * 0.18;
      p.vy = Math.random() * 0.28 + 0.08;
      p.ax = 0;
      p.ay = 0;
      p.swayOffset = Math.random() * Math.PI * 2;
      p.swaySpeed = Math.random() * 0.008 + 0.004;
      p.swayStrength = Math.random() * 0.35 + 0.15;
      p.opacity = Math.random() * 0.55 + 0.25;
      p.pulse = Math.random() * Math.PI * 2;
      p.pulseSpeed = Math.random() * 0.015 + 0.005;
      p.depth = Math.random();
      p.glow = p.baseSize * 3.5 * 1.2;
      p.el.style.width = `${p.glow * 2}px`;
      p.el.style.height = `${p.glow * 2}px`;
    };

    for (let i = 0; i < count; i++) {
      const el = makeEl(COLORS[Math.floor(Math.random() * COLORS.length)]!);
      root.appendChild(el);
      const p = { el } as Particle;
      reset(p, true);
      particles.push(p);
    }

    const tick = () => {
      for (const p of particles) {
        p.ax = Math.sin(p.swayOffset) * p.swayStrength * 0.02;
        p.swayOffset += p.swaySpeed;
        p.ax += (Math.random() - 0.5) * 0.008;
        p.ay += (Math.random() - 0.5) * 0.004;
        p.vx += p.ax;
        p.vy += p.ay;
        p.vx *= 0.97;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        const pulseFactor = 0.55 + Math.sin(p.pulse) * 0.45;
        const currentOpacity = p.opacity * pulseFactor * (0.7 + p.depth * 0.3);
        const size = p.baseSize * (0.85 + Math.sin(p.pulse * 0.7) * 0.15);
        const scale = size / p.baseSize;
        p.el.style.opacity = String(currentOpacity);
        p.el.style.transform = `translate3d(${p.x - p.glow}px, ${p.y - p.glow}px, 0) scale(${scale})`;
        if (p.y > height + 40 || p.x < -40 || p.x > width + 40) reset(p);
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(() => {
      width = Math.max(1, root.clientWidth);
      height = Math.max(1, root.clientHeight);
    });
    ro.observe(root);

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(root);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      particles.forEach((p) => p.el.remove());
    };
  }, [count, reduce]);

  if (reduce) return null;

  return <div ref={wrap} className="water-snow" aria-hidden />;
}
