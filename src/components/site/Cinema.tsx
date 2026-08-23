import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";
import { WaterSnow } from "./WaterSnow";

type Veil = "hero" | "panel" | "panel-end" | "soft" | "none";

export function Cinema({
  still,
  video,
  alt,
  className,
  ken = false,
  loop = true,
  veil = "panel",
  videoOpacity = 0.12,
  fit = "cover",
  rate = 0.55,
  blend = "soft",
  objectPosition,
  snow = false,
  hoverStill,
  priority = false,
}: {
  still: string;
  video?: string;
  alt: string;
  className?: string;
  ken?: boolean;
  loop?: boolean;
  veil?: Veil;
  videoOpacity?: number;
  fit?: "cover" | "contain";
  rate?: number;
  blend?: "soft" | "normal";
  objectPosition?: string;
  snow?: boolean;
  hoverStill?: string;
  priority?: boolean;
}) {
  const vref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = vref.current;
    if (!v || reduce) return;
    v.playbackRate = rate;
    const play = () => {
      void v.play().catch(() => {});
    };
    if (v.readyState >= 2) play();
    else v.addEventListener("canplay", play, { once: true });
    return () => v.removeEventListener("canplay", play);
  }, [reduce, rate, video]);

  return (
    <div className={cn("cinema", className)}>
      <div
        className={cn(
          "cinema-stage",
          ken && !reduce && "cinema-ken",
          fit === "contain" && "cinema-contain",
        )}
      >
        <img
          src={still}
          alt={alt}
          className="cinema-still"
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "low"}
          style={objectPosition ? { objectPosition } : undefined}
        />
        {hoverStill ? (
          <img
            src={hoverStill}
            alt=""
            className="cinema-still cinema-lit"
            style={objectPosition ? { objectPosition } : undefined}
          />
        ) : null}
        {video && !reduce ? (
          <video
            ref={vref}
            className={cn("cinema-video", blend === "normal" && "cinema-video-normal")}
            style={{ opacity: videoOpacity }}
            autoPlay
            muted
            playsInline
            loop={loop}
            preload="metadata"
            poster={still}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : null}
      </div>
      {veil !== "none" ? <div className={cn("cinema-veil", `veil-${veil}`)} aria-hidden /> : null}
      {snow ? (
        <WaterSnow count={70} />
      ) : null}
    </div>
  );
}
