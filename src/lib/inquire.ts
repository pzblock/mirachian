import { createServerFn } from "@tanstack/react-start";
import { CONTACT_EMAIL } from "./contact";

export type Inquiry = {
  track: string | null;
  interest: string;
  guests: string;
  party: string;
  timing: string;
  name: string;
  email: string;
  phone: string;
  note: string;
  date: string | null;
  slot: string | null;
  preferEmail: boolean;
};

function clean(value: string, max: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export const sendInquiry = createServerFn({ method: "POST" })
  .validator((input: Inquiry) => input)
  .handler(async ({ data }) => {
    const name = clean(data.name, 120);
    const email = clean(data.email, 200);
    if (!name || !email.includes("@")) {
      return { ok: false as const };
    }

    const call = data.preferEmail
      ? "Prefer email first"
      : [data.date, data.slot].filter(Boolean).join(" ") || "—";

    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        _subject: `Mirachian inquiry — ${name}`,
        _template: "table",
        _captcha: "false",
        Passage: data.track ?? "unspecified",
        Interest: data.interest,
        Guests: data.guests,
        Party: data.party,
        Timing: data.timing,
        Call: call,
        Phone: clean(data.phone, 80) || "—",
        Note: clean(data.note, 4000) || "—",
      }),
    });

    if (!res.ok) return { ok: false as const };
    const body = (await res.json().catch(() => null)) as { success?: boolean | string } | null;
    if (body && body.success === false) return { ok: false as const };
    return { ok: true as const };
  });
