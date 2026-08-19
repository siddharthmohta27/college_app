import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  Plus,
  Heart,
  MapPin,
  Clock,
  Tag,
  X,
  Star,
  Trash2,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Copy,
  Mail,
  Send,
  Check,
} from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const formatListingTime = (dateStr: string) => {
  if (!dateStr) return "recently";
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "recently" : formatDistanceToNow(d, { addSuffix: true });
  } catch {
    return "recently";
  }
};

export const Route = createFileRoute("/app/marketplace")({
  head: () => ({
    meta: [{ title: "Marketplace — Campus Connect" }],
  }),
  component: Marketplace,
});

type Listing = {
  id: number;
  title: string;
  price: number;
  category: string;
  condition: string;
  description: string;
  emoji: string;
  location: string;
  seller_auth_id: string;
  seller_name: string;
  seller_initials: string;
  seller_color: string;
  seller_email: string;
  is_sold: boolean;
  created_at: string;
  saved: boolean;
};

const CATEGORIES = ["All", "Books", "Electronics", "Dorm Gear", "Tickets", "Clothes", "Others"];
const CONDITIONS = ["New", "Like New", "Good", "Acceptable"];
const EMOJI_MAP: Record<string, string> = {
  Books: "📚",
  Electronics: "💻",
  "Dorm Gear": "🛏️",
  Tickets: "🎟️",
  Clothes: "👕",
  Others: "📦",
};

// Derive display name initials from displayName or email
function getInitials(name: string | null, email: string | null): string {
  if (name) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "??";
}

const AVATAR_COLORS = [
  "from-violet-500 to-purple-700",
  "from-blue-500 to-indigo-700",
  "from-emerald-500 to-teal-700",
  "from-rose-500 to-pink-700",
  "from-amber-500 to-orange-700",
  "from-cyan-500 to-sky-700",
];

function hashColor(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// Sample seed listings shown when table is empty
const SEED_LISTINGS = [
  {
    title: "Calculus by Thomas (12th ed.)",
    description: "Barely used, all pages intact. Great for first-years.",
    price: 350,
    category: "Books",
    condition: "Like New",
    location: "Main Library lobby",
    emoji: "📚",
    seller_auth_id: "seed",
    seller_name: "Rahul Sharma",
    seller_initials: "RS",
    seller_color: "from-violet-500 to-purple-700",
    seller_email: "rahul@pec.edu.in",
    is_sold: false,
  },
  {
    title: "Dell Laptop Charger 65W",
    description: "Works perfectly. Lost my laptop so selling the charger.",
    price: 500,
    category: "Electronics",
    condition: "Good",
    location: "Hostel D, Room 12",
    emoji: "💻",
    seller_auth_id: "seed",
    seller_name: "Priya Singh",
    seller_initials: "PS",
    seller_color: "from-blue-500 to-indigo-700",
    seller_email: "priya@pec.edu.in",
    is_sold: false,
  },
  {
    title: "Badminton Racket (Yonex)",
    description: "Used for one semester. Strings are good.",
    price: 800,
    category: "Others",
    condition: "Good",
    location: "Sports Complex",
    emoji: "📦",
    seller_auth_id: "seed",
    seller_name: "Arjun Mehta",
    seller_initials: "AM",
    seller_color: "from-emerald-500 to-teal-700",
    seller_email: "arjun@pec.edu.in",
    is_sold: false,
  },
];

function Marketplace() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");
  const [showPost, setShowPost] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const [contactingListing, setContactingListing] = useState<Listing | null>(null);
  const [contactMessage, setContactMessage] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null>(null);

  // Track auth state
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({ uid: user.uid, email: user.email, displayName: user.displayName });
      } else {
        setCurrentUser(null);
      }
    });
    return unsub;
  }, []);

  // Fetch listings from Supabase
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch listings
      const { data: rows, error } = await supabase
        .from("marketplace_listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // If empty, seed with sample data
      if (!rows || rows.length === 0) {
        const { data: seeded, error: seedError } = await supabase
          .from("marketplace_listings")
          .insert(SEED_LISTINGS)
          .select("*");
        if (seedError) console.warn("Seed failed:", seedError.message);
        setListings((seeded || []).map((l) => ({ ...l, saved: false })));
        setLoading(false);
        return;
      }

      // Fetch saves for current user
      const uid = firebaseAuth.currentUser?.uid;
      let savedIds = new Set<number>();
      if (uid) {
        const { data: saves } = await supabase
          .from("marketplace_saves")
          .select("listing_id")
          .eq("saver_auth_id", uid);
        if (saves) savedIds = new Set(saves.map((s: { listing_id: number }) => s.listing_id));
      }

      setListings(rows.map((l) => ({ ...l, saved: savedIds.has(l.id) })));
    } catch (err: any) {
      console.error("Failed to fetch listings:", err?.message ?? err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Toggle save/unsave listing
  const toggleSave = async (id: number) => {
    if (!currentUser) return;
    const listing = listings.find((l) => l.id === id);
    if (!listing) return;

    // Optimistic update
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, saved: !l.saved } : l)));

    try {
      if (listing.saved) {
        // Unsave
        await supabase
          .from("marketplace_saves")
          .delete()
          .eq("listing_id", id)
          .eq("saver_auth_id", currentUser.uid);
      } else {
        // Save
        await supabase
          .from("marketplace_saves")
          .insert({ listing_id: id, saver_auth_id: currentUser.uid });
      }
    } catch (_) {
      // Revert on error
      setListings((prev) => prev.map((l) => (l.id === id ? { ...l, saved: !l.saved } : l)));
    }
  };

  // Delete listing (owner only)
  const deleteListing = async (id: number) => {
    if (!confirm("Delete this listing?")) return;
    try {
      const { error } = await supabase.from("marketplace_listings").delete().eq("id", id);
      if (error) throw error;
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err: any) {
      alert("Failed to delete listing: " + (err?.message ?? "Unknown error"));
    }
  };

  // Mark listing as sold (owner only)
  const markSold = async (id: number) => {
    try {
      const { error } = await supabase
        .from("marketplace_listings")
        .update({ is_sold: true })
        .eq("id", id);
      if (error) throw error;
      setListings((prev) => prev.map((l) => (l.id === id ? { ...l, is_sold: true } : l)));
    } catch (err: any) {
      alert("Failed to mark as sold: " + (err?.message ?? "Unknown error"));
    }
  };

  // Post new listing
  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const category = data.get("category") as string;

    setPosting(true);
    setPostError(null);

    const sellerName = currentUser.displayName || currentUser.email?.split("@")[0] || "Anonymous";
    const sellerInitials = getInitials(currentUser.displayName, currentUser.email);
    const sellerColor = hashColor(currentUser.uid);

    try {
      const { data: inserted, error } = await supabase
        .from("marketplace_listings")
        .insert({
          title: data.get("title") as string,
          description: (data.get("description") as string) || "",
          price: Number(data.get("price")),
          category,
          condition: data.get("condition") as string,
          location: (data.get("location") as string) || "",
          emoji: EMOJI_MAP[category] || "📦",
          seller_auth_id: currentUser.uid,
          seller_name: sellerName,
          seller_initials: sellerInitials,
          seller_color: sellerColor,
          seller_email: currentUser.email || "",
        })
        .select("*")
        .single();

      if (error) throw error;

      setListings((prev) => [{ ...inserted, saved: false }, ...prev]);
      setShowPost(false);
      form.reset();
    } catch (err: any) {
      setPostError(err?.message || "Failed to post listing");
    } finally {
      setPosting(false);
    }
  };

  const filtered = listings
    .filter((l) => {
      if (l.is_sold) return false;
      const matchCat = selectedCategory === "All" || l.category === selectedCategory;
      const matchSearch =
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        (l.description || "").toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 animate-fade-up">
        <div>
          <h2 className="text-xl font-bold">Student Marketplace</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Buy, sell and swap with your campus peers
          </p>
        </div>
        <button
          id="post-listing-btn"
          onClick={() => setShowPost(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition glow-primary btn-press"
        >
          <Plus className="h-4 w-4" /> Post Listing
        </button>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-wrap gap-3 animate-fade-up">
        <div className="relative flex-1 min-w-52">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="marketplace-search"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary"
          />
        </div>
        <select
          id="marketplace-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-primary"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
        </select>
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-muted-foreground transition hover:text-foreground">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 animate-fade-up">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`cat-${cat.toLowerCase().replace(/ /g, "-")}`}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">
        {loading ? (
          "Loading listings..."
        ) : (
          <>
            Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            listings{search && ` for "${search}"`}
          </>
        )}
      </p>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading marketplace...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
          <ShoppingBag className="h-10 w-10 opacity-30" />
          <p className="text-sm">No listings found. Be the first to post!</p>
        </div>
      ) : (
        /* Grid */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing, i) => {
            const isOwner = currentUser?.uid === listing.seller_auth_id;
            return (
              <div
                key={listing.id}
                id={`listing-${listing.id}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border glass transition-all duration-200 animate-fade-up card-hover"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Image area */}
                <div className="relative flex h-32 items-center justify-center bg-surface-elevated text-5xl">
                  {listing.emoji}
                  {isOwner && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => markSold(listing.id)}
                        title="Mark as sold"
                        className="rounded-full bg-emerald-500/20 p-1.5 text-emerald-400 hover:bg-emerald-500/40 transition"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteListing(listing.id)}
                        title="Delete listing"
                        className="rounded-full bg-rose-500/20 p-1.5 text-rose-400 hover:bg-rose-500/40 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  {isOwner && (
                    <span className="absolute top-2 left-2 rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-semibold text-primary">
                      Your listing
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="truncate font-semibold text-sm">{listing.title}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {listing.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSave(listing.id)}
                      className={`shrink-0 transition ${listing.saved ? "text-rose-400" : "text-muted-foreground hover:text-rose-400"}`}
                    >
                      <Heart className={`h-4 w-4 ${listing.saved ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] text-muted-foreground">
                      {listing.category}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        listing.condition === "New" || listing.condition === "Like New"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {listing.condition}
                    </span>
                  </div>

                  <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${listing.seller_color} text-[9px] font-bold text-white`}
                      >
                        {listing.seller_initials}
                      </div>
                      <p className="text-xs font-medium">{listing.seller_name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-primary">₹{listing.price}</div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />
                        {formatListingTime(listing.created_at)}
                      </div>
                    </div>
                  </div>

                  {listing.location && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="h-2.5 w-2.5" />
                      {listing.location}
                    </div>
                  )}

                  {!isOwner && (
                    <button
                      onClick={() => {
                        setContactingListing(listing);
                        const sellerFirstName = listing.seller_name.split(" ")[0] || "there";
                        setContactMessage(
                          `Hi ${sellerFirstName}! I'm interested in your listing "${listing.title}" (₹${listing.price}). Is it still available?`
                        );
                        setCopiedEmail(false);
                      }}
                      className="mt-3 w-full rounded-lg bg-primary/15 py-2 text-xs font-semibold text-primary transition-all duration-150 hover:bg-primary hover:text-primary-foreground btn-press inline-flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="h-3 w-3" /> Contact Seller
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Contact Seller Modal */}
      {contactingListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl glass-strong neon-border p-6 animate-fade-up max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/20 text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Contact Seller</h3>
                  <p className="text-xs text-muted-foreground">
                    Connect directly regarding this listing
                  </p>
                </div>
              </div>
              <button
                onClick={() => setContactingListing(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Listing Summary Preview */}
            <div className="flex items-center gap-3.5 rounded-2xl border border-border/80 bg-surface/70 p-3.5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface-elevated text-2xl shadow-inner border border-border/50">
                {contactingListing.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-semibold">{contactingListing.title}</h4>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-primary font-mono">₹{contactingListing.price}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-[11px] text-muted-foreground">{contactingListing.condition}</span>
                  {contactingListing.location && (
                    <>
                      <span className="text-muted-foreground">·</span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground truncate">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {contactingListing.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Seller Profile Card */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${contactingListing.seller_color} text-xs font-bold text-white shadow-sm`}
                  >
                    {contactingListing.seller_initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {contactingListing.seller_name}
                      </p>
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-500 shrink-0">
                        Verified Student
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      {contactingListing.seller_email || "Campus Student"}
                    </p>
                  </div>
                </div>

                {contactingListing.seller_email && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(contactingListing.seller_email);
                      setCopiedEmail(true);
                      toast.success(`Copied ${contactingListing.seller_email} to clipboard!`);
                      setTimeout(() => setCopiedEmail(false), 2500);
                    }}
                    className="flex items-center gap-1 shrink-0 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition shadow-sm"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-medium text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Message Area & Quick Templates */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Inquiry Message
              </label>

              {/* Quick Suggestion Chips */}
              <div className="flex flex-wrap gap-1.5 pb-1">
                {[
                  "Hi! Is this still available?",
                  `Can you do ₹${Math.round(contactingListing.price * 0.9)} for this?`,
                  "Where on campus can we meet to pick this up?",
                  "Can I check the item in person first?",
                ].map((template) => (
                  <button
                    key={template}
                    type="button"
                    onClick={() => setContactMessage(template)}
                    className="rounded-lg border border-border bg-surface/60 px-2.5 py-1 text-[11px] text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-foreground transition text-left"
                  >
                    💬 {template}
                  </button>
                ))}
              </div>

              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={3}
                placeholder="Type your message to the seller..."
                className="w-full rounded-2xl border border-border bg-input/60 p-3 text-sm outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => {
                  navigate({
                    to: "/app/chat",
                    search: {
                      channel: "marketplace",
                      sellerName: contactingListing.seller_name,
                      sellerId: contactingListing.seller_auth_id,
                      listingTitle: contactingListing.title,
                      listingPrice: String(contactingListing.price),
                      draft: contactMessage,
                    },
                  });
                  toast.success(`Opening chat with ${contactingListing.seller_name}...`);
                  setContactingListing(null);
                }}
                className="w-full rounded-xl bg-primary py-2.5 px-4 text-xs font-semibold text-primary-foreground transition hover:opacity-90 glow-primary inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat in Campus App</span>
              </button>

              {contactingListing.seller_email && (
                <a
                  href={`mailto:${contactingListing.seller_email}?subject=${encodeURIComponent(
                    `[Campus Connect Marketplace] Inquiry for "${contactingListing.title}"`
                  )}&body=${encodeURIComponent(contactMessage)}`}
                  onClick={() => setContactingListing(null)}
                  className="w-full rounded-xl border border-border bg-surface py-2.5 px-4 text-xs font-semibold text-foreground transition hover:border-primary/50 hover:bg-surface-elevated inline-flex items-center justify-center gap-2 text-center"
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Send Email</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post Listing Modal */}
      {showPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl glass-strong neon-border p-6 animate-fade-up max-h-[90vh] overflow-y-auto">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" /> Post a Listing
              </h3>
              <button
                id="close-post-modal"
                onClick={() => {
                  setShowPost(false);
                  setPostError(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!currentUser ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Please sign in to post a listing.
              </p>
            ) : (
              <form className="space-y-4" onSubmit={handlePost}>
                {postError && (
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 px-3 py-2 text-xs text-rose-400">
                    {postError}
                  </div>
                )}
                <div>
                  <label
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                    htmlFor="post-title"
                  >
                    Title *
                  </label>
                  <input
                    id="post-title"
                    name="title"
                    required
                    placeholder="e.g. Calculus textbook 3rd ed."
                    className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-medium text-muted-foreground"
                      htmlFor="post-price"
                    >
                      Price (₹) *
                    </label>
                    <input
                      id="post-price"
                      name="price"
                      required
                      type="number"
                      min={0}
                      placeholder="500"
                      className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-medium text-muted-foreground"
                      htmlFor="post-category"
                    >
                      Category
                    </label>
                    <select
                      id="post-category"
                      name="category"
                      defaultValue="Books"
                      className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                    htmlFor="post-condition"
                  >
                    Condition
                  </label>
                  <select
                    id="post-condition"
                    name="condition"
                    defaultValue="Good"
                    className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                    htmlFor="post-desc"
                  >
                    Description
                  </label>
                  <textarea
                    id="post-desc"
                    name="description"
                    rows={3}
                    placeholder="Describe your item..."
                    className="w-full resize-none rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                    htmlFor="post-location"
                  >
                    <MapPin className="inline h-3 w-3 mr-1" />
                    Pickup Location
                  </label>
                  <input
                    id="post-location"
                    name="location"
                    placeholder="e.g. Hostel Block A, Room 204"
                    className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <button
                  id="post-submit-btn"
                  type="submit"
                  disabled={posting}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {posting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Posting...
                    </>
                  ) : (
                    "Post Listing"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
