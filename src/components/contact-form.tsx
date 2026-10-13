"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LIMITS, validateContact, type FieldError } from "@/lib/validation";

type Status = "idle" | "loading" | "done" | "error";

const KINDS = [
  { value: "general", label: "General enquiry" },
  { value: "wholesale", label: "Wholesale" },
  { value: "stockist", label: "Become a stockist" },
];

const FIELD =
  "w-full border-b border-teak/30 bg-transparent py-3 text-ink placeholder:text-ink-soft/60 transition-colors focus:border-indigo";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", kind: "general", message: "" });
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [shake, setShake] = useState(false);
  const reduce = useReducedMotion();

  const errorFor = (field: string) => errors.find((error) => error.field === field)?.message;

  const update = (key: keyof typeof form) => (value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (errors.length) setErrors((previous) => previous.filter((error) => error.field !== key));
    if (status === "error") setStatus("idle");
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const honeypot = (
      event.currentTarget.elements.namedItem("company") as HTMLInputElement | null
    )?.value;

    // Validate with the exact same rules the API route enforces, so the client
    // can never disagree with the server about what a valid message looks like.
    const parsed = validateContact(form);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      setStatus("error");
      setShake(true);
      setTimeout(() => setShake(false), 420);
      return;
    }

    setErrors([]);
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, company: honeypot ?? "" }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrors([{ field: "form", message: body?.error ?? "Something went wrong." }]);
        throw new Error("contact failed");
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setShake(true);
      setTimeout(() => setShake(false), 420);
    }
  }

  if (status === "done") {
    return (
      <div className="border-teak/15 bg-cotton/70 flex flex-col items-center rounded-2xl border py-16 text-center">
        <motion.svg
          viewBox="0 0 64 64"
          className="text-indigo h-16 w-16"
          fill="none"
          initial="hidden"
          animate="show"
          aria-hidden="true"
        >
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="2.5"
            variants={{
              hidden: reduce ? { opacity: 1 } : { pathLength: 0 },
              show: { pathLength: 1, transition: { duration: 0.6 } },
            }}
          />
          <motion.path
            d="M20 33l8 8 16-18"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: reduce ? { opacity: 1 } : { pathLength: 0 },
              show: { pathLength: 1, transition: { duration: 0.4, delay: 0.45 } },
            }}
          />
        </motion.svg>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-5 font-serif text-2xl"
        >
          Message received
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="text-ink-soft mt-2 max-w-sm"
        >
          Thank you — we read every note and will reply within two working days.
        </motion.p>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={submit}
      noValidate
      animate={shake && !reduce ? { x: [0, -4, 4, -3, 3, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="relative space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="text-ink-soft text-[11px] font-medium tracking-[0.16em] uppercase"
          >
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name")(event.target.value)}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={errorFor("name") ? "contact-name-error" : undefined}
            className={`mt-1 ${FIELD}`}
            placeholder="Meera Chippa"
            required
          />
          <FieldError id="contact-name-error" message={errorFor("name")} />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="text-ink-soft text-[11px] font-medium tracking-[0.16em] uppercase"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email")(event.target.value)}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={errorFor("email") ? "contact-email-error" : undefined}
            className={`mt-1 ${FIELD}`}
            placeholder="you@example.com"
            required
          />
          <FieldError id="contact-email-error" message={errorFor("email")} />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-kind"
          className="text-ink-soft text-[11px] font-medium tracking-[0.16em] uppercase"
        >
          How can we help
        </label>
        <select
          id="contact-kind"
          name="kind"
          value={form.kind}
          onChange={(event) => update("kind")(event.target.value)}
          className={`mt-1 ${FIELD}`}
        >
          {KINDS.map((kind) => (
            <option key={kind.value} value={kind.value}>
              {kind.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="contact-message"
            className="text-ink-soft text-[11px] font-medium tracking-[0.16em] uppercase"
          >
            Message
          </label>
          <span className="text-ink-faint font-mono text-[10px]" aria-hidden="true">
            {form.message.length}/{LIMITS.message}
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          value={form.message}
          onChange={(event) => update("message")(event.target.value)}
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={errorFor("message") ? "contact-message-error" : undefined}
          className={`mt-1 resize-none ${FIELD}`}
          placeholder="Tell us about the pieces you are interested in, or the collection you have in mind."
          required
        />
        <FieldError id="contact-message-error" message={errorFor("message")} />
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-editorial bg-indigo text-bone hover:bg-indigo-deep inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold tracking-widest uppercase disabled:opacity-70"
        >
          {status === "loading" && (
            <motion.span
              className="border-bone/40 border-t-bone h-3 w-3 rounded-full border-2"
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
          )}
          {status === "loading" ? "Sending…" : "Send message"}
        </button>

        <p aria-live="polite" className="text-xs">
          <AnimatePresence mode="wait">
            {errorFor("form") && (
              <motion.span
                key="form-error"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-madder font-medium"
              >
                {errorFor("form")}
              </motion.span>
            )}
            {errors.length > 0 && !errorFor("form") && (
              <motion.span
                key="field-error"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-madder font-medium"
              >
                Please check the highlighted fields.
              </motion.span>
            )}
          </AnimatePresence>
        </p>
      </div>
    </motion.form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-madder mt-1.5 text-xs font-medium"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
