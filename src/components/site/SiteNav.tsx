import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DepthRail } from "./DepthRail";

const LINKS = [
  { href: "#voyage", label: "Voyage" },
  { href: "#descend", label: "Depth" },
  { href: "#craft", label: "Craft" },
  { href: "#reserve", label: "Reserve" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
        scrolled || open
          ? "border-b border-line bg-abyss/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="inline-flex size-8 items-center justify-center" aria-hidden>
            <svg viewBox="0 0 32 32" className="size-7 text-pearl">
              <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="16" cy="16" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
              <line
                x1="9.6"
                y1="16"
                x2="22.4"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="square"
              />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.05rem] tracking-[0.34em] text-fg uppercase">
              Mirachian
            </span>
            <span className="mt-1 text-[0.58rem] tracking-[0.38em] text-pearl uppercase">
              Undersea
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.7rem] tracking-[0.22em] text-muted uppercase transition-colors duration-200 hover:text-pearl"
            >
              {link.label}
            </a>
          ))}
          <DepthRail />
        </nav>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center text-fg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-abyss/95 px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="min-h-11 py-2 text-sm tracking-[0.18em] text-fg uppercase"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
