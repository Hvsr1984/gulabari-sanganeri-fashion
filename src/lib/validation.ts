/**
 * Small, dependency-free validation helpers shared by the API routes and the
 * client forms. Deliberately schema-free (no runtime dependency) — the rules
 * are tiny and explicit, which keeps the edge bundle honest.
 */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = {
  name: 120,
  email: 254,
  kind: 40,
  message: 4000,
} as const;

export type FieldError = { field: string; message: string };

export type ValidationResult<T> = { ok: true; data: T } | { ok: false; errors: FieldError[] };

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateEmail(value: unknown): ValidationResult<{ email: string }> {
  const email = str(value).toLowerCase();

  if (!email) {
    return { ok: false, errors: [{ field: "email", message: "Email is required." }] };
  }
  if (email.length > LIMITS.email) {
    return {
      ok: false,
      errors: [{ field: "email", message: "That email address is too long." }],
    };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, errors: [{ field: "email", message: "Enter a valid email address." }] };
  }
  return { ok: true, data: { email } };
}

export type ContactInput = {
  name: string;
  email: string;
  kind: string;
  message: string;
};

const CONTACT_KINDS = ["general", "wholesale", "stockist"] as const;

export function validateContact(payload: unknown): ValidationResult<ContactInput> {
  const body = (payload ?? {}) as Record<string, unknown>;
  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const message = str(body.message);
  const rawKind = str(body.kind);
  const errors: FieldError[] = [];

  if (name.length < 2) {
    errors.push({ field: "name", message: "Please tell us your name." });
  } else if (name.length > LIMITS.name) {
    errors.push({
      field: "name",
      message: `Please keep your name under ${LIMITS.name} characters.`,
    });
  }

  const emailResult = validateEmail(email);
  if (!emailResult.ok) errors.push(...emailResult.errors);

  if (message.length < 10) {
    errors.push({ field: "message", message: "Please write at least a short line or two." });
  } else if (message.length > LIMITS.message) {
    errors.push({
      field: "message",
      message: `Please keep your message under ${LIMITS.message} characters.`,
    });
  }

  if (errors.length) return { ok: false, errors };

  const kind = (CONTACT_KINDS as readonly string[]).includes(rawKind) ? rawKind : "general";
  return { ok: true, data: { name, email, kind, message } };
}
