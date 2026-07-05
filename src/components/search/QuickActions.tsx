import { useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { QUICK_ACTIONS } from "./mock-data";
import { useSearch } from "./search-context";

export function QuickActions() {
  const { setOpen } = useSearch();
  const navigate = useNavigate();

  const handleAction = (href?: string) => {
    if (href) {
      navigate({ to: href as never });
      setOpen(false);
    }
  };

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        Quick Actions
      </p>

      <div className="grid grid-cols-2 gap-2.5">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              id={`qa-${action.id}`}
              onClick={() => handleAction(action.href)}
              className="
                group flex items-start gap-3 rounded-xl border border-border bg-background p-3
                text-left transition-all duration-150
                hover:border-primary/30 hover:bg-surface-elevated hover:-translate-y-0.5
                hover:shadow-md active:scale-[0.98]
              "
            >
              <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  {action.label}
                </p>
                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
