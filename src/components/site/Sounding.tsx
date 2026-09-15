import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Sounding({
  kicker = "Did you know",
  mark,
  unit,
  title,
  children,
  heading = false,
  className,
}: {
  kicker?: string;
  mark: string;
  unit?: string;
  title: string;
  children: ReactNode;
  heading?: boolean;
  className?: string;
}) {
  const Title = heading ? "h2" : "p";

  return (
    <aside className={cn("sounding", className)}>
      <p className="sounding-head">
        <span className="kicker">{kicker}</span>
      </p>
      <div className="sounding-body">
        <p className="sounding-mark">
          {mark}
          {unit ? <span className="sounding-unit">{unit}</span> : null}
        </p>
        <div className="min-w-0">
          <Title className="font-display text-[1.65rem] leading-[1.18] text-champagne md:text-[2rem]">
            {title}
          </Title>
          <div className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
