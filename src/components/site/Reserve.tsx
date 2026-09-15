import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/lib/contact";
import { sendInquiry } from "@/lib/inquire";

type Track = "submersible" | "scuba" | "both" | "learn";
type Party = "couple" | "two-couples" | "advisor" | "other";
type Timing = "12" | "24" | "36" | "explore";
type Interest = "exploration" | "heritage" | "science" | "undecided";

const TRACKS: { id: Track; label: string; hint: string }[] = [
  { id: "submersible", label: "Private submersible", hint: "The flagship passage" },
  { id: "scuba", label: "Private scuba", hint: "The same voyage, on fins" },
  { id: "both", label: "Both / undecided", hint: "We will help you choose" },
  { id: "learn", label: "Simply to learn more", hint: "No commitment" },
];

const INTERESTS: { id: Interest; label: string; hint: string }[] = [
  { id: "exploration", label: "Adventure / exploration", hint: "Unvisited terrain" },
  { id: "heritage", label: "Maritime heritage", hint: "The unfinished ledger" },
  { id: "science", label: "Research / science", hint: "The working record" },
  { id: "undecided", label: "Not sure yet", hint: "Tell us in the conversation" },
];

const GUESTS = ["2", "3", "4", "5+"] as const;
const TIMES = ["10:00", "14:00", "16:00"] as const;

function futureDates(n = 10) {
  const out: { iso: string; label: string }[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + 2);
  let guard = 0;
  while (out.length < n && guard < 40) {
    guard += 1;
    if (d.getDay() !== 0) {
      out.push({
        iso: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export function Reserve() {
  const [dates, setDates] = useState<{ iso: string; label: string }[]>([]);
  const [step, setStep] = useState(1);
  const [track, setTrack] = useState<Track | null>(null);
  const [interest, setInterest] = useState<Interest>("exploration");
  const [guests, setGuests] = useState<string>("2");
  const [party, setParty] = useState<Party>("couple");
  const [timing, setTiming] = useState<Timing>("24");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [preferEmail, setPreferEmail] = useState(false);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  useEffect(() => {
    setDates(futureDates());
  }, []);

  const submit = async () => {
    if (sending) return;
    setSending(true);
    setSendError(false);
    const payload = {
      track,
      interest,
      guests,
      party,
      timing,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      note: note.trim(),
      date: preferEmail ? null : date,
      slot: preferEmail ? null : slot,
      preferEmail,
    };
    try {
      const prev = JSON.parse(localStorage.getItem("mirachian-inquiries") || "[]") as unknown[];
      localStorage.setItem(
        "mirachian-inquiries",
        JSON.stringify([{ ...payload, at: new Date().toISOString() }, ...prev].slice(0, 40)),
      );
    } catch {
      /* ignore */
    }
    try {
      const result = await sendInquiry(payload);
      if (!result) throw new Error("undelivered");
      setDone(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="reserve" className="bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 section-y md:grid-cols-12 md:gap-16 md:px-8">
        <div className="order-2 md:order-1 md:col-span-5">
          <p className="kicker">Reserve</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] text-fg">
            Begin with interest. Then a private conversation.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted">
            Capacity is limited by design. This form opens a private conversation
            — not a cabin. A $250 deposit per couple holds the place, and is fully
            refundable until the booking is confirmed. The expedition itself is
            settled when arrangements are complete.
          </p>
          <ol className="mt-12 hidden space-y-6 text-sm text-muted md:block">
            {[
              ["Inquire", "The shape of your party, and the water that calls you."],
              [
                "Reserve",
                "A $250 deposit per couple holds your place. Fully refundable until the booking is confirmed.",
              ],
              ["Settle", "When the passage is arranged, the calendar opens."],
              ["Sail", "Priority follows completion — not who asked first."],
            ].map(([t, b], i) => (
              <li key={t} className="border-l border-line pl-5">
                <span className="font-display text-pearl">0{i + 1} · </span>
                <span className="font-display text-fg">{t}</span>
                <p className="mt-1.5">{b}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="order-1 md:order-2 md:col-span-7">
          <div className="border border-line bg-abyss/60 p-5 md:p-11">
            {done ? (
              <div>
                <p className="kicker">Received</p>
                <h3 className="mt-4 font-display text-3xl text-fg">
                  Thank you — we will be in touch.
                </h3>
                <p className="mt-5 text-muted">
                  Your interest was delivered to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-pearl hover:text-fg">
                    {CONTACT_EMAIL}
                  </a>
                  . We will follow with details matched to what you shared
                  {preferEmail
                    ? " by email."
                    : date
                      ? `, including your requested time of ${slot || "day"} on ${date}.`
                      : "."}
                </p>
              </div>
            ) : (
              <>
                <ol className="mb-6 grid grid-cols-4 gap-2 md:hidden">
                  {(
                    [
                      ["01", "Inquire"],
                      ["02", "Reserve"],
                      ["03", "Settle"],
                      ["04", "Sail"],
                    ] as const
                  ).map(([n, t], idx) => (
                    <li
                      key={t}
                      className={cn(
                        "border-t pt-2",
                        idx < step ? "border-pearl" : "border-line",
                      )}
                    >
                      <span className="font-mono text-[0.58rem] tracking-[0.14em] text-pearl">
                        {n}
                      </span>
                      <p
                        className={cn(
                          "mt-1 font-display text-[0.82rem] leading-tight",
                          idx < step ? "text-fg" : "text-muted",
                        )}
                      >
                        {t}
                      </p>
                    </li>
                  ))}
                </ol>
                <div className="mb-8 hidden gap-2 md:mb-10 md:flex" aria-hidden>
                  {[1, 2, 3, 4].map((n) => (
                    <span
                      key={n}
                      className={cn("h-px flex-1", n <= step ? "bg-pearl" : "bg-line")}
                    />
                  ))}
                </div>

                {step === 1 && (
                  <fieldset>
                    <legend className="font-display text-xl text-fg md:text-2xl">
                      What draws you to the passage?
                    </legend>
                    <div className="mt-5 grid gap-2 md:mt-7 md:gap-3">
                      {TRACKS.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTrack(t.id)}
                          className={cn(
                            "min-h-12 border px-4 py-2.5 text-left transition-colors duration-200 md:min-h-14 md:py-3",
                            track === t.id
                              ? "border-pearl bg-surface text-fg"
                              : "border-line text-muted hover:border-pearl/50",
                          )}
                        >
                          <span className="block text-sm tracking-[0.08em] uppercase">
                            {t.label}
                          </span>
                          <span className="mt-1 block text-xs text-muted">{t.hint}</span>
                        </button>
                      ))}
                    </div>
                    <p className="mt-6 text-sm text-muted md:mt-9">What interests you most?</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {INTERESTS.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setInterest(item.id)}
                          className={cn(
                            "min-h-11 border px-3 text-left text-sm md:px-4",
                            interest === item.id
                              ? "border-pearl text-fg"
                              : "border-line text-muted",
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end md:mt-10">
                      <button
                        type="button"
                        disabled={!track}
                        onClick={() => setStep(2)}
                        className="min-h-11 bg-pearl px-7 text-[0.7rem] tracking-[0.16em] text-abyss uppercase disabled:opacity-40"
                      >
                        Continue
                      </button>
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset>
                    <legend className="font-display text-2xl text-fg">
                      The shape of the voyage
                    </legend>
                    <p className="mt-3 text-sm text-muted">Guests</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {GUESTS.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGuests(g)}
                          className={cn(
                            "min-h-11 min-w-11 border px-4 text-sm",
                            guests === g ? "border-pearl text-fg" : "border-line text-muted",
                          )}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                    <p className="mt-7 text-sm text-muted">Traveling as</p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {(
                        [
                          ["couple", "Couple"],
                          ["two-couples", "Two couples"],
                          ["advisor", "With an advisor"],
                          ["other", "Other"],
                        ] as const
                      ).map(([pid, label]) => (
                        <button
                          key={pid}
                          type="button"
                          onClick={() => setParty(pid)}
                          className={cn(
                            "min-h-11 border px-4 text-left text-sm",
                            party === pid ? "border-pearl text-fg" : "border-line text-muted",
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <p className="mt-7 text-sm text-muted">Timing</p>
                    <div className="mt-2 grid gap-2">
                      {(
                        [
                          ["12", "Within 12 months"],
                          ["24", "12–24 months"],
                          ["36", "24–36 months"],
                          ["explore", "Flexible / exploring"],
                        ] as const
                      ).map(([tid, label]) => (
                        <button
                          key={tid}
                          type="button"
                          onClick={() => setTiming(tid)}
                          className={cn(
                            "min-h-11 border px-4 text-left text-sm",
                            timing === tid ? "border-pearl text-fg" : "border-line text-muted",
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-10 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="min-h-11 text-[0.7rem] tracking-[0.16em] text-muted uppercase"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="min-h-11 bg-pearl px-7 text-[0.7rem] tracking-[0.16em] text-abyss uppercase"
                      >
                        Continue
                      </button>
                    </div>
                  </fieldset>
                )}

                {step === 3 && (
                  <fieldset>
                    <legend className="font-display text-2xl text-fg">
                      Where should we reach you?
                    </legend>
                    <p className="mt-3 text-sm text-muted">
                      We will follow privately at {CONTACT_EMAIL} with details
                      matched to what you shared — not a generic brochure.
                    </p>
                    <label className="mt-7 block text-[0.7rem] tracking-[0.14em] text-muted uppercase">
                      First name
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 min-h-11 w-full border border-line bg-transparent px-3 text-fg outline-none focus:border-pearl"
                      />
                    </label>
                    <label className="mt-5 block text-[0.7rem] tracking-[0.14em] text-muted uppercase">
                      Email
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 min-h-11 w-full border border-line bg-transparent px-3 text-fg outline-none focus:border-pearl"
                      />
                    </label>
                    <label className="mt-5 block text-[0.7rem] tracking-[0.14em] text-muted uppercase">
                      Phone
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-2 min-h-11 w-full border border-line bg-transparent px-3 text-fg outline-none focus:border-pearl"
                      />
                    </label>
                    <label className="mt-5 block text-[0.7rem] tracking-[0.14em] text-muted uppercase">
                      Anything we should know
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        className="mt-2 w-full border border-line bg-transparent px-3 py-2 text-sm font-sans tracking-normal text-fg normal-case outline-none focus:border-pearl"
                      />
                    </label>
                    <div className="mt-10 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="min-h-11 text-[0.7rem] tracking-[0.16em] text-muted uppercase"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        disabled={!name.trim() || !email.includes("@")}
                        onClick={() => setStep(4)}
                        className="min-h-11 bg-pearl px-7 text-[0.7rem] tracking-[0.16em] text-abyss uppercase disabled:opacity-40"
                      >
                        Continue
                      </button>
                    </div>
                  </fieldset>
                )}

                {step === 4 && (
                  <fieldset>
                    <legend className="font-display text-2xl text-fg">
                      When would you like to speak?
                    </legend>
                    <p className="mt-3 text-sm text-muted">
                      Choose a time for a private call, or ask us to write first.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {dates.map((d) => (
                        <button
                          key={d.iso}
                          type="button"
                          disabled={preferEmail}
                          onClick={() => setDate(d.iso)}
                          className={cn(
                            "min-h-11 border px-3 text-xs",
                            date === d.iso ? "border-pearl text-fg" : "border-line text-muted",
                            preferEmail && "opacity-40",
                          )}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      {TIMES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          disabled={preferEmail}
                          onClick={() => setSlot(t)}
                          className={cn(
                            "min-h-11 border px-4 text-sm",
                            slot === t ? "border-pearl text-fg" : "border-line text-muted",
                            preferEmail && "opacity-40",
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <label className="mt-7 flex min-h-11 items-center gap-3 text-sm text-muted">
                      <input
                        type="checkbox"
                        checked={preferEmail}
                        onChange={(e) => setPreferEmail(e.target.checked)}
                        className="size-4 accent-pearl"
                      />
                      Prefer email first
                    </label>
                    {sendError ? (
                      <p className="mt-6 text-sm text-muted">
                        The card could not be delivered just now. Please write us
                        directly at{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-pearl hover:text-fg">
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </p>
                    ) : null}
                    <div className="mt-10 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="min-h-11 text-[0.7rem] tracking-[0.16em] text-muted uppercase"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        disabled={sending || (!preferEmail && (!date || !slot))}
                        onClick={() => void submit()}
                        className="min-h-11 bg-pearl px-7 text-[0.7rem] tracking-[0.16em] text-abyss uppercase disabled:opacity-40"
                      >
                        {sending ? "Sending…" : "Request appointment"}
                      </button>
                    </div>
                  </fieldset>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
