import { describe, expect, it } from "vitest";
import { EMAIL_PATTERN, LIMITS, validateContact, validateEmail } from "./validation";

describe("email validation", () => {
  it("accepts ordinary addresses and normalises case", () => {
    const result = validateEmail("  Buyer@Example.CO.UK ");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.email).toBe("buyer@example.co.uk");
  });

  it.each([
    ["", "empty"],
    ["   ", "whitespace only"],
    ["hello", "no @"],
    ["hello@", "no domain"],
    ["hello@localhost", "no TLD"],
    ["a b@example.com", "embedded space"],
  ])("rejects %s (%s)", (input) => {
    expect(validateEmail(input).ok).toBe(false);
  });

  it("rejects addresses longer than the RFC-safe limit", () => {
    const long = `${"a".repeat(LIMITS.email)}@example.com`;
    expect(validateEmail(long).ok).toBe(false);
  });

  it("keeps the exported pattern in step with the validator", () => {
    expect(EMAIL_PATTERN.test("studio@gulabari.in")).toBe(true);
    expect(EMAIL_PATTERN.test("studio@gulabari")).toBe(false);
  });
});

describe("contact validation", () => {
  const valid = {
    name: "Meera Chippa",
    email: "meera@example.com",
    kind: "wholesale",
    message: "We would like to stock the Sanganeri kurta range in our Jaipur storefront.",
  };

  it("accepts a well-formed enquiry and trims the payload", () => {
    const result = validateContact({ ...valid, name: "  Meera Chippa  " });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("Meera Chippa");
      expect(result.data.kind).toBe("wholesale");
    }
  });

  it("falls back to the general kind when an unknown value is supplied", () => {
    const result = validateContact({ ...valid, kind: "not-a-real-kind" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.kind).toBe("general");
  });

  it("reports every problem at once rather than one at a time", () => {
    const result = validateContact({
      name: "A",
      email: "nope",
      kind: "general",
      message: "hi",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.map((error) => error.field).sort()).toEqual([
        "email",
        "message",
        "name",
      ]);
    }
  });

  it("caps message length so the table cannot be flooded", () => {
    const result = validateContact({ ...valid, message: "x".repeat(LIMITS.message + 1) });
    expect(result.ok).toBe(false);
  });

  it("survives a null / non-object body", () => {
    expect(validateContact(null).ok).toBe(false);
    expect(validateContact("nonsense").ok).toBe(false);
    expect(validateContact(undefined).ok).toBe(false);
  });
});
