import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";
import { Reveal } from "./Reveal";

const MAX = 1140;

type Zone = {
  m: number;
  title: string;
  body: string;
  img: string;
};

const ZONES: Zone[] = [
  {
    m: 0,
    title: "Surface",
    body: "Key West light. The support vessel. Transfer is calm, briefed, and private.",
    img: "/images/cs7/op-009.jpg",
  },
  {
    m: 30,
    title: "The reef line",
    body: "Where scuba still belongs — clarity, coral, and the last of ordinary tourism.",
    img: "/images/cs7/op-010.jpg",
  },
  {
    m: 200,
    title: "Twilight",
    body: "Color leaves. Recreational diving has already ended. The passage has not.",
    img: "/images/trench.jpg",
  },
  {
    m: 600,
    title: "The drop",
    body: "South of Key West the seafloor falls into a corridor few platforms can enter.",
    img: "/images/cs7/op-021.jpg",
  },
  {
    m: 1000,
    title: "The frontier",
    body: "Fewer people have been here than have been to space. This is the ledger scuba cannot open.",
    img: "/images/cs7/op-028.jpg",
  },
  {
    m: 1140,
    title: "Mirachian depth",
    body: "Four guests. One pilot. Cinema-grade capture. Deliberate, quiet, beyond the crowd.",
    img: "/images/cs7/cs7-lounge.jpg",
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

  return (
    <section id="descend" className="relative overflow-hidden">
      {ZONES.map((z) => (
        <img
          key={z.img}
          src={z.img}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
            zone.img === z.img ? "opacity-45" : "opacity-0",
          )}
        />
      ))}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `linear-gradient(to bottom, rgb(4 7 10 / ${0.42 + (m / MAX) * 0.42}), rgb(4 7 10 / ${0.68 + (m / MAX) * 0.26}))`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgb(4 7 10 / 0.45) 0%, transparent 28%, transparent 78%, rgb(4 7 10 / 0.35) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 section-y md:px-8">
        <Reveal>
          <p className="kicker">Interactive depth</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.3rem)] text-fg">
            Draw the line yourself.
          </h2>
          <p className="mt-6 max-w-xl text-muted">
            Drag the water column — or play the descent. This is the difference
            between a dive trip and a Mirachian passage.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-[clamp(3.4rem,8vw,6.4rem)] leading-none text-fg tabular-nums">
              {m}
              <span className="ml-1 font-display text-2xl text-pearl md:text-3xl">m</span>
            </p>
            <p className="mt-6 font-display text-2xl text-champagne md:text-3xl">{zone.title}</p>
            <p className="mt-4 max-w-sm text-muted">{zone.body}</p>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-7">
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
              className="mt-10 inline-flex min-h-11 items-center gap-2 border border-line px-5 text-[0.7rem] tracking-[0.18em] text-pearl uppercase transition-colors duration-200 hover:border-pearl"
            >
              {playing ? <Pause size={14} /> : <Play size={14} className="ml-px" />}
              {playing ? "Hold" : m >= MAX - 10 ? "Replay descent" : "Play the descent"}
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="flex gap-8">
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
                className="water-column relative hidden h-[440px] w-10 shrink-0 cursor-ns-resize overflow-hidden lg:block"
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
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                {ZONES.map((z) => (
                  <button
                    key={z.m}
                    type="button"
                    onClick={() => {
                      stopPlay();
                      setM(z.m);
                    }}
                    className={cn(
                      "flex min-h-11 items-baseline justify-between gap-4 border-b border-line py-2.5 text-left last:border-0 transition-colors duration-200",
                      zone.m === z.m ? "text-fg" : "text-muted hover:text-pearl",
                    )}
                  >
                    <span className="font-display text-lg md:text-xl">{z.title}</span>
                    <span className="font-mono text-[0.65rem] tracking-wider uppercase tabular-nums">
                      {z.m}m
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-5 hidden text-[0.7rem] tracking-[0.12em] text-muted uppercase lg:block">
              Drag the column · Sport diving ends near 40m
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
