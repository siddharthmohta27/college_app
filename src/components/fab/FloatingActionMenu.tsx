import { FAB_ACTIONS } from "./mock-actions";
import { FloatingActionItem } from "./FloatingActionItem";

interface FloatingActionMenuProps {
  open: boolean;
  onClose: () => void;
}

export function FloatingActionMenu({ open, onClose }: FloatingActionMenuProps) {
  if (!open) return null;

  return (
    <div
      role="menu"
      aria-label="Quick actions"
      /**
       * Desktop/Tablet: vertical stack above the FAB trigger.
       * Mobile: pill menu centred above the bottom nav, max-w-[320px] w-[90%].
       */
      className="
        fab-menu
        absolute bottom-[calc(100%+12px)] right-0
        flex flex-col items-end gap-2
        w-max
        sm:w-auto
        max-sm:right-1/2 max-sm:translate-x-1/2
        max-sm:w-[90vw] max-sm:max-w-[320px]
        max-sm:items-stretch
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
  );
}
