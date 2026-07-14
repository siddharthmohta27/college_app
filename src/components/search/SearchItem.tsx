import type { SearchResult } from "./mock-data";
import { CategoryBadge } from "./CategoryBadge";

interface SearchItemProps {
  result: SearchResult;
  isActive: boolean;
  onSelect: (result: SearchResult) => void;
  onHover: () => void;
  index: number;
}

export function SearchItem({ result, isActive, onSelect, onHover, index }: SearchItemProps) {
  const Icon = result.icon;

  return (
    <button
      id={`search-result-${index}`}
      role="option"
      aria-selected={isActive}
      onClick={() => onSelect(result)}
      onMouseEnter={onHover}
      className={`
        group flex w-full items-center gap-3 rounded-xl px-3 py-2.5
        text-left transition-all duration-150
        ${
          isActive
            ? "border border-primary/50 bg-primary/8 shadow-[0_0_12px_rgba(0,0,0,0.3)] ring-1 ring-primary/20"
            : "border border-transparent hover:border-border hover:bg-surface-elevated"
        }
      `}
      style={{ animationDelay: `${index * 25}ms` }}
    >
      {/* Icon */}
      <div
        className={`
          grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-150
          ${isActive ? "bg-primary/15 text-primary" : "bg-surface-elevated text-muted-foreground group-hover:text-foreground"}
        `}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-semibold ${isActive ? "text-foreground" : "text-foreground/90"}`}
        >
          {result.title}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{result.subtitle}</p>
      </div>

      {/* Badge */}
      <CategoryBadge category={result.category} />

      {/* Enter hint */}
      {isActive && <span className="shrink-0 text-[10px] text-muted-foreground">↵</span>}
    </button>
  );
}
