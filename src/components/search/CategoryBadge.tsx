import type { SearchResult } from "./mock-data";

interface CategoryBadgeProps {
  category: SearchResult["category"];
}

const CATEGORY_COLORS: Record<SearchResult["category"], string> = {
  Pages:
    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Resources:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Marketplace:
    "bg-yellow-500/10 text-primary border border-yellow-500/20",
  Clubs:
    "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Events:
    "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  Students:
    "bg-pink-500/10 text-pink-400 border border-pink-500/20",
  Chat:
    "bg-sky-500/10 text-sky-400 border border-sky-500/20",
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[category]}`}
    >
      {category}
    </span>
  );
}
