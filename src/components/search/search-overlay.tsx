import { Search } from "lucide-react";
import { useSearch } from "./search-context";
import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { filterSearchResults, type SearchResult } from "./mock-data";
import { SearchResults } from "./SearchResults";
import { QuickActions } from "./QuickActions";
import { RecentSearches } from "./RecentSearches";
import { TrendingSearches } from "./TrendingSearches";

export function SearchOverlay() {
  const { open, setOpen, toggle, query, setQuery, addRecentSearch } =
    useSearch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  const results: SearchResult[] = query.trim()
    ? filterSearchResults(query)
    : [];

  // ── Animation state ─────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setActiveIndex(-1);
    } else {
      // tiny delay so fade-out completes before removing from DOM
      const t = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ── Global keyboard shortcuts ────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
        return;
      }
      // "/" to open
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      // Escape
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle, setOpen]);

  // ── Auto-focus input when open ───────────────────────────────────────────
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // ── Keyboard navigation inside overlay ──────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          results.length === 0 ? -1 : Math.min(prev + 1, results.length - 1),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          handleSelect(results[activeIndex]);
        } else if (query.trim()) {
          // store as recent even if no item selected
          addRecentSearch(query.trim());
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [open, activeIndex, results, query],
  );

  // ── Scroll active item into view ─────────────────────────────────────────
  useEffect(() => {
    if (activeIndex >= 0) {
      const el = document.getElementById(`search-result-${activeIndex}`);
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // ── Select a result ──────────────────────────────────────────────────────
  const handleSelect = useCallback(
    (result: SearchResult) => {
      addRecentSearch(result.title);
      if (result.href) {
        navigate({ to: result.href as never });
      }
      setOpen(false);
    },
    [addRecentSearch, navigate, setOpen],
  );

  // ── Focus trap (Tab / Shift+Tab) ─────────────────────────────────────────
  const handleTrapFocus = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
      "button, input, [tabindex]:not([tabindex='-1'])",
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  if (!isVisible) return null;

  const isEmpty = !query.trim();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global search"
      className={`
        fixed inset-0 z-[100] flex items-start justify-center
        bg-black/70 backdrop-blur-md
        px-4 sm:px-6
        transition-opacity duration-200
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      onClick={() => setOpen(false)}
      onKeyDown={handleTrapFocus}
    >
      {/* Modal panel */}
      <div
        ref={overlayRef}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        className={`
          mt-16 sm:mt-20 w-full
          max-w-[720px]
          overflow-hidden rounded-2xl
          border border-border
          bg-surface shadow-2xl
          transition-all duration-200
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"}
        `}
        style={{
          boxShadow:
            open
              ? "0 25px 60px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)"
              : undefined,
        }}
      >
        {/* ── Search Input ─────────────────────────────────── */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-4.5 w-4.5 shrink-0 text-primary" />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoFocus
            placeholder="Search Campus Connect..."
            aria-label="Search"
            aria-autocomplete="list"
            aria-controls="search-results-list"
            className="
              flex-1 bg-transparent text-sm outline-none
              placeholder:text-muted-foreground
              transition-colors duration-150
            "
          />

          {query && (
            <button
              onClick={() => { setQuery(""); setActiveIndex(-1); }}
              className="text-xs text-muted-foreground transition hover:text-foreground px-1"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          <kbd className="rounded border border-border bg-surface-elevated px-2 py-1 text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* ── Body ─────────────────────────────────────────── */}
        <div
          ref={resultsRef}
          id="search-results-list"
          className="max-h-[480px] overflow-y-auto overscroll-contain p-4 space-y-5"
        >
          {isEmpty ? (
            <>
              <QuickActions />
              <RecentSearches />
              <TrendingSearches />
            </>
          ) : (
            <SearchResults
              results={results}
              activeIndex={activeIndex}
              onSelect={handleSelect}
              onHover={(index) => setActiveIndex(index)}
              query={query}
            />
          )}
        </div>

        {/* ── Footer ───────────────────────────────────────── */}
        <div className="flex items-center justify-between border-t border-border px-5 py-2.5 text-[11px] text-muted-foreground">
          <div className="flex gap-4">
            <span>
              <kbd className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono">↑↓</kbd>{" "}
              Navigate
            </span>
            <span>
              <kbd className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono">↵</kbd>{" "}
              Select
            </span>
          </div>
          <span>
            <kbd className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono">Esc</kbd>{" "}
            Close
          </span>
        </div>
      </div>
    </div>
  );
}