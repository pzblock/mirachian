import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      el.style.opacity = "1";
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    const loop = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] size-[160px] rounded-full opacity-0 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgb(185 208 217 / 0.08) 0%, rgb(185 208 217 / 0.03) 42%, transparent 70%)",
        transition: "opacity 400ms ease",
      }}
    />
  );
}
