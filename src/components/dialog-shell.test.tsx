// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DialogShell } from "./dialog-shell";

// RTL cleanup is not automatic without vitest globals.
afterEach(cleanup);

/**
 * Regression guard for the accessibility contract the whole storefront relies
 * on: every overlay must be dismissable with Escape, must move focus into the
 * panel when it opens, and must hand focus back to the trigger when it closes.
 */
function Harness({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <DialogShell
      open={open}
      onClose={onClose}
      label="Shopping cart"
      variant="right"
      panelClassName="panel"
    >
      <button type="button">Close cart</button>
      <a href="#continue">Continue shopping</a>
    </DialogShell>
  );
}

describe("DialogShell", () => {
  it("renders nothing while closed", () => {
    render(<Harness open={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("exposes an accessible modal dialog when open", async () => {
    render(<Harness open onClose={() => {}} />);
    const dialog = screen.getByRole("dialog", { name: "Shopping cart" });
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    await waitFor(() => expect(document.activeElement).toBe(dialog));
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(<Harness open onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("locks background scroll while open and restores it on unmount", async () => {
    const { unmount } = render(<Harness open onClose={() => {}} />);
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    await waitFor(() => expect(document.body.style.overflow).toBe(""));
  });

  it("returns focus to the element that opened it", async () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(<Harness open={false} onClose={() => {}} />);
    rerender(<Harness open onClose={() => {}} />);
    rerender(<Harness open={false} onClose={() => {}} />);

    await waitFor(() => expect(document.activeElement).toBe(trigger));
    trigger.remove();
  });
});
