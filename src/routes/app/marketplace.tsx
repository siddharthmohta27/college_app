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
} from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";
import { formatDistanceToNow } from "date-fns";

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const API = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api/marketplace`
  : isLocal
    ? "http://localhost:3001/api/marketplace"
    : "/api/marketplace";

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

  // Get Firebase auth headers
  const getAuthHeaders = useCallback(async () => {
    const token = await firebaseAuth.getIdToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, []);

  // Fetch listings
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API}/listings`, { headers });
      const data = await res.json();
      setListings(data.listings || []);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Toggle save
  const toggleSave = async (id: number) => {
    if (!currentUser) return;
    // Optimistic update
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, saved: !l.saved } : l)));
    try {
      const headers = await getAuthHeaders();
      await fetch(`${API}/listings/${id}/save`, { method: "POST", headers });
    } catch (_) {
      // revert on error
      setListings((prev) => prev.map((l) => (l.id === id ? { ...l, saved: !l.saved } : l)));
    }
  };

  // Delete listing
  const deleteListing = async (id: number) => {
    if (!confirm("Delete this listing?")) return;
    try {
      const headers = await getAuthHeaders();
      await fetch(`${API}/listings/${id}`, { method: "DELETE", headers });
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert("Failed to delete listing.");
    }
  };

  // Mark as sold
  const markSold = async (id: number) => {
    try {
      const headers = await getAuthHeaders();
      await fetch(`${API}/listings/${id}/sold`, { method: "PATCH", headers });
      setListings((prev) => prev.map((l) => (l.id === id ? { ...l, is_sold: true } : l)));
    } catch (err) {
      alert("Failed to mark as sold.");
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
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API}/listings`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: data.get("title"),
          description: data.get("description"),
          price: Number(data.get("price")),
          category,
          condition: data.get("condition"),
          location: data.get("location"),
          emoji: EMOJI_MAP[category] || "📦",
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to post listing");
      }
      const result = await res.json();
      setListings((prev) => [{ ...result.listing, saved: false }, ...prev]);
      setShowPost(false);
      form.reset();
    } catch (err: any) {
      setPostError(err.message);
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
                      onClick={() => navigate({ to: "/app/chat" })}
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
                      Category *
                    </label>
                    <select
                      id="post-category"
                      name="category"
                      className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                    htmlFor="post-condition"
                  >
                    Condition *
                  </label>
                  <select
                    id="post-condition"
                    name="condition"
                    className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c}>{c}</option>
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
