import { Search } from "lucide-react";
import { useSearch } from "./search-context";

export function SearchTrigger() {
  const { setOpen } = useSearch();

  return (
    <button
      onClick={() => setOpen(true)}
      className="relative w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-14 text-left text-xs text-muted-foreground transition hover:border-primary/40 hover:bg-surface-elevated"
    >
      <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />

      Quick search...

      <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-surface-elevated px-1.5 py-0.5 text-[9px] md:block">
        Ctrl K
      </kbd>
    </button>
  );
}