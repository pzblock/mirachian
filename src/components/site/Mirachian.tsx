import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Visible “Mirachian” wordmark — champagne caustic on hover, screen-reader text unchanged. */
export function Mirachian({ className }: { className?: string }) {
  return <span className={cn("mirachian-word", className)}>Mirachian</span>;
}

export function withMirachian(text: string): ReactNode {
  const parts = text.split(/(Mirachian)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (part === "Mirachian" ? <Mirachian key={i} /> : part));
}
