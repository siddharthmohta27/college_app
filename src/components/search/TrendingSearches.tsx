import { TrendingUp } from "lucide-react";
import { TRENDING_SEARCHES } from "./mock-data";
import { useSearch } from "./search-context";

export function TrendingSearches() {
  const { setQuery } = useSearch();

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5 text-primary" />
        Trending
      </p>

      <div className="flex flex-wrap gap-2">
        {TRENDING_SEARCHES.map((term) => (
          <button
            key={term}
            onClick={() => setQuery(term)}
            className="
              rounded-full border border-border bg-background px-3 py-1.5 text-xs
              transition-all duration-150
              hover:border-primary/40 hover:bg-surface-elevated hover:-translate-y-0.5
              hover:shadow-sm active:scale-95
            "
          >
            🔥 {term}
          </button>
        ))}
      </div>
    </div>
  );
}
