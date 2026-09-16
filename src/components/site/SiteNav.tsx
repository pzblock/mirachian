import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DepthRail } from "./DepthRail";
import { Mark } from "./Mark";
import { Mirachian } from "./Mirachian";

const LINKS = [
  { href: "#voyage", label: "Voyage" },
  { href: "#passages", label: "Passages" },
  { href: "#descend", label: "Depth" },
  { href: "#craft", label: "Craft" },
  { href: "#reserve", label: "Reserve" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [barH, setBarH] = useState(72);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const measure = () => setBarH(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
          scrolled || open
            ? "border-b border-line bg-abyss/92 backdrop-blur-md"
            : "border-b border-transparent nav-top",
        )}
      >
        <div
          ref={barRef}
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8"
        >
          <a href="#top" className="group/mark flex items-center gap-3">
            <span className="inline-flex size-8 items-center justify-center text-pearl" aria-hidden>
              <Mark className="size-7" />
            </span>
            <span className="flex flex-col leading-none">
              <Mirachian className="mark-word font-display text-[1.05rem] tracking-[0.34em] text-fg uppercase transition-colors duration-500" />
              <span className="mt-1 text-[0.58rem] tracking-[0.38em] text-pearl uppercase">
                Undersea
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-[0.7rem] tracking-[0.22em] text-pearl uppercase hover:text-fg"
              >
                {link.label}
              </a>
            ))}
            <DepthRail />
          </nav>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {open ? (
        <div
          id="site-menu"
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-line bg-abyss lg:hidden"
          style={{ top: barH }}
        >
          <nav className="flex flex-col gap-2 px-5 py-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link min-h-11 py-2 text-sm tracking-[0.18em] text-fg uppercase"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
