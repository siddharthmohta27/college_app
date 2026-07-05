import { SearchX } from "lucide-react";
import type { SearchResult } from "./mock-data";
import { SearchItem } from "./SearchItem";

interface SearchResultsProps {
  results: SearchResult[];
  activeIndex: number;
  onSelect: (result: SearchResult) => void;
  onHover: (index: number) => void;
  query: string;
}

export function SearchResults({
  results,
  activeIndex,
  onSelect,
  onHover,
  query,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-elevated">
          <SearchX className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold">No results found</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            No results for{" "}
            <span className="font-medium text-foreground">"{query}"</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div role="listbox" aria-label="Search results" className="space-y-1">
      <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {results.length} result{results.length !== 1 ? "s" : ""}
      </p>
      {results.map((result, index) => (
        <SearchItem
          key={result.id}
          result={result}
          isActive={index === activeIndex}
          index={index}
          onSelect={onSelect}
          onHover={() => onHover(index)}
        />
      ))}
    </div>
  );
}
