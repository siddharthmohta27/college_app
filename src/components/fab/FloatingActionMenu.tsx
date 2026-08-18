import { FAB_ACTIONS } from "./mock-actions";
import { FloatingActionItem } from "./FloatingActionItem";

interface FloatingActionMenuProps {
  open: boolean;
  onClose: () => void;
}

export function FloatingActionMenu({ open, onClose }: FloatingActionMenuProps) {
  if (!open) return null;

  return (
    <>
      {/* Full screen backdrop click-away and dim */}
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="menu"
        aria-label="Quick actions"
        className="
          fab-menu
          absolute bottom-[calc(100%+14px)] right-0
          z-50
          flex flex-col items-end gap-2.5
          w-max
          sm:w-auto
          max-sm:right-0
          max-sm:items-end
        "
      >
        {FAB_ACTIONS.map((action, i) => (
          <FloatingActionItem
            key={action.id}
            action={action}
            index={i}
            total={FAB_ACTIONS.length}
            onSelect={onClose}
          />
        ))}
      </div>
    </>
  );
}

