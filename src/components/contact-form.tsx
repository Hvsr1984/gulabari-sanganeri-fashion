"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    kind: "general",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [shake, setShake] = useState(false);
  const reduce = useReducedMotion();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || !form.message.trim()) {
      setStatus("error");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full border-b border-teak/30 bg-transparent py-3 text-ink outline-none transition-colors focus:border-indigo placeholder:text-ink-soft/60";

  if (status === "done") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-teak/15 bg-bone/60 py-16 text-center">
        <motion.svg
          viewBox="0 0 64 64"
          className="h-16 w-16 text-indigo"
          fill="none"
          initial="hidden"
          animate="show"
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
              show: { pathLength: 1, transition: { duration: 0.4, delay: 0.5 } },
            }}
          />
        </motion.svg>
        <p className="mt-5 font-serif text-2xl">Message received</p>
        <p className="mt-2 max-w-sm text-ink-soft">
          Thank you — we read every note and will reply within two working days.
        </p>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={submit}
      animate={shake ? { x: [0, -4, 4, -3, 3, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm text-ink-soft">Name</label>
          <input
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft">Email</label>
          <input
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-ink-soft">I&rsquo;m writing about</label>
        <select
          className={`${field} appearance-none`}
          value={form.kind}
          onChange={(e) => setForm({ ...form, kind: e.target.value })}
        >
          <option value="general">A general enquiry</option>
          <option value="wholesale">Wholesale</option>
          <option value="stockist">Becoming a stockist</option>
        </select>
      </div>

      <div>
        <label className="text-sm text-ink-soft">Message</label>
        <textarea
          rows={5}
          className={`${field} resize-none`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us what you have in mind…"
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-madder"
          >
            Please add your name, a valid email and a message.
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-indigo px-8 py-3 text-sm text-bone transition-colors hover:bg-indigo-deep disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </motion.form>
  );
}
