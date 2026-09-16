import { useEffect, useState } from "react";
import { SITE_PHOTOS } from "@/lib/photos";
import { Mark } from "./Mark";
import { Mirachian } from "./Mirachian";

export function PreloadPhotos() {
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let n = 0;
    const total = SITE_PHOTOS.length;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(1);
      setReady(true);
    };

    const cap = window.setTimeout(finish, 4500);

    for (const src of SITE_PHOTOS) {
      const img = new Image();
      img.decoding = "async";
      const tick = () => {
        n += 1;
        setProgress(n / total);
        if (n >= total) finish();
      };
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    }

    return () => window.clearTimeout(cap);
  }, []);

  useEffect(() => {
    if (!ready) {
      document.documentElement.style.overflow = "hidden";
      return;
    }
    const t = window.setTimeout(() => {
      setGone(true);
      document.documentElement.style.overflow = "";
    }, 700);
    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [ready]);

  if (gone) return null;

  return (
    <div
      className="photo-loader"
      data-ready={ready ? "1" : "0"}
      aria-hidden={ready}
      role="status"
      aria-live="polite"
      aria-label={ready ? "Ready" : "Loading…"}
    >
      <div className="flex flex-col items-center gap-7">
        <span className="loader-mark text-pearl">
          <Mark className="size-16 md:size-[4.5rem]" />
        </span>
        <p className="font-display text-[0.82rem] tracking-[0.42em] text-fg uppercase">
          <Mirachian />
        </p>
        <p className="kicker">Loading…</p>
        <span className="loader-bar">
          <span className="loader-bar-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
        </span>
      </div>
    </div>
  );
}
