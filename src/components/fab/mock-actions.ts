import {
  Upload,
  Tag,
  BookOpen,
  Calendar,
  ShoppingBag,
  AlertCircle,
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
    ariaLabel: "Upload study notes",
  },
  {
    id: "fab-sell-item",
    label: "Sell Item",
    icon: Tag,
    href: "/app/marketplace",
    ariaLabel: "List an item for sale",
  },
  {
    id: "fab-book-room",
    label: "Book Study Room",
    icon: BookOpen,
    href: "/app/study",
    ariaLabel: "Book a study room",
  },
  {
    id: "fab-create-event",
    label: "Create Event",
    icon: Calendar,
    href: "/app/clubs",
    ariaLabel: "Create a new event",
  },
  {
    id: "fab-marketplace-listing",
    label: "Add Marketplace Listing",
    icon: ShoppingBag,
    href: "/app/marketplace",
    ariaLabel: "Add a new marketplace listing",
  },
  {
    id: "fab-report-lost",
    label: "Report Lost Item",
    icon: AlertCircle,
    ariaLabel: "Report a lost item",
  },
];
