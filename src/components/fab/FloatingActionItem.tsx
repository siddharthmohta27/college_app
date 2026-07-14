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
      // fallback: log the action
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
        border border-border/60
        bg-surface/80 backdrop-blur-md
        px-4 py-2.5
        text-sm font-medium text-foreground
        shadow-lg
        transition-all duration-200 ease-out
        hover:border-primary/50 hover:bg-surface-elevated hover:-translate-y-0.5
        hover:shadow-[0_0_14px_oklch(0.84_0.18_85/0.2)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
        active:scale-95
      "
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Icon circle */}
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors duration-150 group-hover:bg-primary/20">
        <Icon className="h-3.5 w-3.5" />
      </span>

      {/* Label */}
      <span className="whitespace-nowrap">{action.label}</span>
    </button>
  );
}
