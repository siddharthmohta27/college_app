import {
  Compass,
  CheckSquare,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  type LucideIcon,
} from "lucide-react";

export interface FabAction {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  /** aria-label for the button */
  ariaLabel: string;
}

export const FAB_ACTIONS: FabAction[] = [
  {
    id: "fab-orientation",
    label: "Orientation Schedule",
    icon: Compass,
    href: "/app/orientation",
    ariaLabel: "View Freshers 7-day orientation schedule & venues",
  },
  {
    id: "fab-attendance",
    label: "Track Attendance",
    icon: CheckSquare,
    href: "/app/attendance",
    ariaLabel: "Track 75% semester attendance",
  },
  {
    id: "fab-mess-menu",
    label: "Hostel Mess Menu",
    icon: UtensilsCrossed,
    href: "/app/canteen",
    ariaLabel: "Check today's hostel mess menu",
  },
  {
    id: "fab-marketplace-listing",
    label: "Sell on Marketplace",
    icon: ShoppingBag,
    href: "/app/marketplace",
    ariaLabel: "List an item for sale on Marketplace",
  },
  {
    id: "fab-explore-clubs",
    label: "Clubs & Societies",
    icon: Calendar,
    href: "/app/clubs",
    ariaLabel: "Explore PEC clubs, societies & events",
  },
];
