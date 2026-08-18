import { useNavigate } from "@tanstack/react-router";
import type { FabAction } from "./mock-actions";

interface FloatingActionItemProps {
  action: FabAction;
  index: number;
  total: number;
  onSelect: () => void;
}

export function FloatingActionItem({ action, index, total, onSelect }: FloatingActionItemProps) {
  const navigate = useNavigate();
  const Icon = action.icon;

  // Stagger delay — items appear top-to-bottom so reverse the index
  const delay = (total - 1 - index) * 40;

  const handleClick = () => {
    if (action.href) {
      navigate({ to: action.href as never });
    } else {
      console.log(`[FAB] ${action.label}`);
    }
    onSelect();
  };

  return (
    <button
      id={action.id}
      aria-label={action.ariaLabel}
      onClick={handleClick}
      className="
        fab-item
        group flex items-center gap-3
        rounded-full
        border border-border/90
        bg-surface
        px-4 py-2.5
        text-xs sm:text-sm font-semibold text-foreground
        shadow-xl
        transition-all duration-180 ease-out
        hover:border-primary/60 hover:bg-surface-elevated hover:-translate-y-0.5
        hover:shadow-2xl hover:text-primary
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
        active:scale-95
      "
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Icon circle */}
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors duration-150 group-hover:bg-primary/20 group-hover:scale-110">
        <Icon className="h-3.5 w-3.5" />
      </span>

      {/* Label */}
      <span className="whitespace-nowrap font-medium text-foreground">{action.label}</span>
    </button>
  );
}

