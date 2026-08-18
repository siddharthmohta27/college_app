import {
  Upload,
  ShoppingBag,
  BookOpen,
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
    id: "fab-upload-notes",
    label: "Upload Notes",
    icon: Upload,
    href: "/app/resources",
    ariaLabel: "Upload study notes & PYQs",
  },
  {
    id: "fab-marketplace-listing",
    label: "Sell on Marketplace",
    icon: ShoppingBag,
    href: "/app/marketplace",
    ariaLabel: "List an item for sale on Marketplace",
  },
  {
    id: "fab-book-room",
    label: "Book Study Room",
    icon: BookOpen,
    href: "/app/study",
    ariaLabel: "Book a study hall or start timer",
  },
  {
    id: "fab-explore-clubs",
    label: "Clubs & Events",
    icon: Calendar,
    href: "/app/clubs",
    ariaLabel: "Explore PEC clubs, societies & events",
  },
];
