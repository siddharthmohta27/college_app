import { Clock, X } from "lucide-react";
import { useSearch } from "./search-context";

export function RecentSearches() {
  const { recentSearches, clearRecentSearches, setQuery } = useSearch();

  if (recentSearches.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-primary" />
          Recent Searches
        </p>
        <button
          onClick={clearRecentSearches}
          className="text-[10px] text-muted-foreground transition hover:text-foreground"
        >
          Clear
        </button>
      </div>

      <div className="space-y-1">
        {recentSearches.map((item) => (
          <button
            key={item}
            onClick={() => setQuery(item)}
            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition hover:bg-surface-elevated"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-sm text-foreground/80">{item}</span>
            </div>
            <span className="text-xs text-muted-foreground">↵</span>
          </button>
        ))}
      </div>
    </div>
  );
}
