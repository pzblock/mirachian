import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";
import { Reveal } from "./Reveal";
import { WaterSnow } from "./WaterSnow";
import { withMirachian } from "./Mirachian";

const MAX = 1140;

type Zone = {
  m: number;
  title: string;
  body: string;
  img: string;
  alt: string;
  pos?: string;
  hover?: string;
};

const ZONES: Zone[] = [
  {
    m: 0,
    title: "Surface",
    body: "Key West light, a private transfer, and the first look at the craft. You are received, briefed, and put to sea.",
    img: "/images/cs7/op-021.jpg",
    alt: "The submersible over the reef, seen from the air",
    pos: "50% 48%",
  },
  {
    m: 30,
    title: "The reef line",
    body: "Living coral and clear Keys water — where scuba still belongs, and where the ordinary sea has not yet been left behind.",
    img: "/images/cs7/op-026.jpg",
    alt: "The submersible settling over living coral",
    pos: "50% 50%",
  },
  {
    m: 200,
    title: "Twilight",
    body: "Color leaves. Recreational diving has already ended. The Pourtalès slope and the deeper channel are only beginning.",
    img: "/images/wp/wp-bg-61.jpg",
    alt: "The submersible in deeper blue as the light leaves",
    pos: "50% 42%",
  },
  {
    m: 600,
    title: "The drop",
    body: "Open-water ground few platforms can enter. Persistent currents bury and expose sites over decades. This is where the chart goes blank.",
    img: "/images/trench.jpg",
    alt: "Open water falling into the deeper channel",
    pos: "50% 50%",
  },
  {
    m: 1000,
    title: "The frontier",
    body: "A wreck on the channel floor. Hover — the light finds the hull. Fewer people have been here than have been to space.",
    img: "/images/seabed.jpg",
    hover: "/images/seabed2.jpg",
    alt: "A wreck on the seafloor — hover to bring up the light",
    pos: "50% 50%",
  },
  {
    m: 1140,
    title: "Mirachian depth",
    body: "The rated depth of the craft. Cinema-grade capture. Four guests, one pilot, and a methodical search across square miles of slope and channel.",
    img: "/images/cs7/cs7-underwater.jpg",
    alt: "The Cruise Sub in open water at working depth",
    pos: "42% 38%",
  },
];

function pressureAta(m: number) {
  return 1 + m / 10;
}
function lightPct(m: number) {
  return Math.max(0, Math.round(100 * Math.exp(-m / 38)));
}
function tempC(m: number) {
  return Math.max(5.2, 27.4 - m / 52);
}

export function Descend() {
  const reduce = useReducedMotion();
  const [m, setM] = useState(0);
  const [playing, setPlaying] = useState(false);
  const column = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLElement>(null);
  const playRef = useRef<number>(0);

  const zone = useMemo(() => {
    let current = ZONES[0];
    for (const z of ZONES) {
      if (m >= z.m) current = z;
    }
    return current;
  }, [m]);

  const stopPlay = useCallback(() => {
    cancelAnimationFrame(playRef.current);
    setPlaying(false);
  }, []);

  const showZone = (depth: number) => {
    stopPlay();
    setM(depth);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      stage.current?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    }
  };

  const play = () => {
    if (playing) {
      stopPlay();
      return;
    }
    if (reduce) {
      setM(MAX);
      return;
    }
    setPlaying(true);
    const from = m >= MAX - 10 ? 0 : m;
    if (m >= MAX - 10) setM(0);
    const start = performance.now();
    const span = 9000 * (1 - from / MAX);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / Math.max(1400, span));
      const eased = 1 - (1 - p) ** 2;
      setM(Math.round((from + (MAX - from) * eased) / 10) * 10);
      if (p < 1) playRef.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    playRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(playRef.current), []);

  const setFromClientY = (clientY: number) => {
    const el = column.current;
    if (!el) return;
    stopPlay();
    const r = el.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
    setM(Math.round((p * MAX) / 10) * 10);
  };

  const ata = pressureAta(m);
  const light = lightPct(m);
  const temp = tempC(m);
  const depthP = m / MAX;
  const grade = Math.round(3 + depthP * 9);

  return (
    <section id="descend" className="relative">
      <div className="mx-auto max-w-6xl px-5 section-y-foot md:px-8">
        <Reveal>
          <p className="kicker">Interactive depth</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.3rem)] text-fg">
            Draw the depth yourself.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            Drag the water column — or play the descent. Sport diving ends near
            forty meters. The Pourtalès slope and the deeper channels fall well
            below a thousand. That is the water we came for.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 lg:flex lg:justify-center">
            <div className="w-full max-w-sm">
              <p className="font-display text-[clamp(3.4rem,8vw,6.4rem)] leading-none text-fg tabular-nums">
                {m}
                <span className="ml-1 font-display text-2xl text-pearl md:text-3xl">m</span>
              </p>
              <p className="mt-5 font-display text-2xl text-champagne md:text-3xl">
                {withMirachian(zone.title)}
              </p>
              <p className="mt-3 max-w-sm text-muted">{zone.body}</p>

              <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-5">
                <div>
                  <dt className="text-[0.62rem] tracking-[0.16em] text-muted uppercase">Pressure</dt>
                  <dd className="mt-1.5 font-mono text-sm text-fg tabular-nums">{ata.toFixed(1)} ata</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] tracking-[0.16em] text-muted uppercase">Light</dt>
                  <dd className="mt-1.5 font-mono text-sm text-fg tabular-nums">{light}%</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] tracking-[0.16em] text-muted uppercase">Temp</dt>
                  <dd className="mt-1.5 font-mono text-sm text-fg tabular-nums">{temp.toFixed(1)}°C</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={play}
                className="cta-ghost mt-7 inline-flex min-h-11 items-center gap-2 border border-line px-5 text-[0.7rem] tracking-[0.18em] text-pearl uppercase"
              >
                {playing ? <Pause size={14} /> : <Play size={14} className="ml-px" />}
                {playing ? "Hold" : m >= MAX - 10 ? "Replay descent" : "Play the descent"}
              </button>

              <div className="mt-6 hidden lg:flex lg:flex-col">
                {ZONES.map((z) => (
                  <button
                    key={z.m}
                    type="button"
                    onClick={() => showZone(z.m)}
                    className={cn(
                      "zone-line flex min-h-10 items-baseline justify-between gap-4 border-b border-line py-2 text-left last:border-0",
                      zone.m === z.m ? "text-fg" : "text-muted hover:text-pearl",
                    )}
                  >
                    <span className="font-display text-lg">{withMirachian(z.title)}</span>
                    <span className="font-mono text-[0.65rem] tracking-wider uppercase tabular-nums">
                      {z.m}m
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-4 hidden text-[0.7rem] tracking-[0.12em] text-muted uppercase lg:block">
                Drag the column · Sport diving ends near 40m
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center gap-6 md:gap-8">
              <div
                ref={column}
                role="slider"
                aria-valuemin={0}
                aria-valuemax={MAX}
                aria-valuenow={m}
                aria-label="Depth in meters"
                tabIndex={0}
                onPointerDown={(e) => {
                  (e.target as HTMLElement).setPointerCapture(e.pointerId);
                  setFromClientY(e.clientY);
                }}
                onPointerMove={(e) => {
                  if (e.buttons) setFromClientY(e.clientY);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    e.preventDefault();
                    stopPlay();
                    setM((v) => Math.min(MAX, v + 20));
                  }
                  if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    stopPlay();
                    setM((v) => Math.max(0, v - 20));
                  }
                }}
                className="water-column relative hidden h-[520px] w-10 shrink-0 cursor-ns-resize overflow-hidden lg:block"
              >
                <span
                  className="absolute inset-x-0 h-px bg-pearl"
                  style={{ top: `${(m / MAX) * 100}%` }}
                />
                <span
                  className="absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pearl"
                  style={{ top: `${(m / MAX) * 100}%` }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <figure
                  ref={stage}
                  className="group/wreck relative h-[42svh] overflow-hidden bg-ink sm:h-[48svh] lg:h-[520px] lg:aspect-auto"
                >
                  {ZONES.map((z) => (
                    <img
                      key={z.img}
                      src={z.img}
                      alt={z.alt}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        zone.img === z.img ? "opacity-100" : "opacity-0",
                      )}
                      style={{ objectPosition: z.pos ?? "50% 50%" }}
                    />
                  ))}
                  {zone.hover ? (
                    <img
                      src={zone.hover}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover/wreck:opacity-100"
                      style={{ objectPosition: zone.pos ?? "50% 50%" }}
                    />
                  ) : null}
                  <div
                    className="pointer-events-none absolute inset-0 transition-colors duration-700"
                    style={{
                      background: `color-mix(in oklab, var(--color-abyss) ${grade}%, transparent)`,
                    }}
                    aria-hidden
                  />
                  {zone.m === 200 ? <WaterSnow count={70} /> : null}
                  <figcaption className="descend-caption absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-4 py-4 md:px-5 md:py-5">
                    <span className="font-display text-lg text-fg md:text-xl">
                      {withMirachian(zone.title)}
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-wider text-pearl uppercase tabular-nums">
                      {zone.m}m
                    </span>
                  </figcaption>
                </figure>

                <div className="mt-5 flex flex-col lg:hidden">
                  {ZONES.map((z) => (
                    <button
                      key={z.m}
                      type="button"
                      onClick={() => showZone(z.m)}
                      className={cn(
                        "zone-line flex min-h-11 items-baseline justify-between gap-4 border-b border-line py-2.5 text-left last:border-0",
                        zone.m === z.m ? "text-fg" : "text-muted hover:text-pearl",
                      )}
                    >
                      <span className="font-display text-lg md:text-xl">{withMirachian(z.title)}</span>
                      <span className="font-mono text-[0.65rem] tracking-wider uppercase tabular-nums">
                        {z.m}m
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
