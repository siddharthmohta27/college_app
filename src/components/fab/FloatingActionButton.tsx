import { useEffect, useCallback, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { FloatingActionMenu } from "./FloatingActionMenu";

export function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const close = useCallback(() => setOpen(false), []);

  // ── Close on route change ─────────────────────────────────────────────
  useEffect(() => {
    close();
  }, [location.pathname, close]);

  // ── Close on Escape ───────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // ── Close on outside click ────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    // Use capture so we catch events before they bubble
    document.addEventListener("pointerdown", onPointer, true);
    return () => document.removeEventListener("pointerdown", onPointer, true);
  }, [open, close]);

  return (
    /**
     * Positioning:
     *  - Desktop/Tablet (md+): fixed bottom-8 right-8, z-50
     *  - Mobile (<md): fixed bottom above the 56px bottom nav +
     *    safe-area, right-4, z-50
     *
     * The mobile bottom nav is ~56px + safe area. We use:
     *   bottom-[calc(56px+env(safe-area-inset-bottom)+16px)]  on mobile
     *   bottom-8 on md+
     */
    <div
      ref={containerRef}
      className="
        fixed z-50 right-4 md:right-8
        bottom-[calc(56px+env(safe-area-inset-bottom,0px)+16px)]
        md:bottom-8
        flex flex-col items-end
      "
    >
      {/* Speed-dial menu */}
      <FloatingActionMenu open={open} onClose={close} />

      {/* Main trigger button */}
      <button
        ref={triggerRef}
        id="fab-trigger"
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
          grid place-items-center
          h-[60px] w-[60px]
          max-sm:h-[56px] max-sm:w-[56px]
          rounded-full
          bg-[oklch(0.13_0.005_250)]
          border border-[oklch(0.84_0.18_85/0.55)]
          text-[oklch(0.84_0.18_85)]
          shadow-[0_8px_32px_oklch(0_0_0/0.5),0_0_0_1px_oklch(0.84_0.18_85/0.12),0_0_18px_oklch(0.84_0.18_85/0.18)]
          transition-all duration-200 ease-out
          hover:scale-105
          hover:shadow-[0_8px_36px_oklch(0_0_0/0.6),0_0_0_1px_oklch(0.84_0.18_85/0.25),0_0_28px_oklch(0.84_0.18_85/0.30)]
          hover:border-[oklch(0.84_0.18_85/0.8)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.84_0.18_85/0.7)]
          active:scale-95
        "
      >
        <Plus
          className="h-6 w-6 transition-transform duration-250 ease-out"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        />
      </button>
    </div>
  );
}
