import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
} from "lucide-react";

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
  seller: string;
  sellerInitials: string;
  sellerColor: string;
  location: string;
  time: string;
  condition: string;
  description: string;
  emoji: string;
  liked: boolean;
  rating: number;
};

const CATEGORIES = ["All", "Books", "Electronics", "Dorm Gear", "Tickets", "Clothes", "Others"];

const LISTINGS: Listing[] = [
  {
    id: 1,
    title: "DSA by Cormen (4th Ed.)",
    price: 550,
    category: "Books",
    seller: "Ananya S.",
    sellerInitials: "AS",
    sellerColor: "from-fuchsia-500 to-violet-600",
    location: "Hostel Block A",
    time: "2 min ago",
    condition: "Good",
    description: "Slightly used, no highlights. Essential for CS students.",
    emoji: "📚",
    liked: false,
    rating: 4.8,
  },
  {
    id: 2,
    title: "MacBook Charger (MagSafe 2)",
    price: 1200,
    category: "Electronics",
    seller: "Rahul K.",
    sellerInitials: "RK",
    sellerColor: "from-cyan-400 to-blue-600",
    location: "PG Boys Hostel",
    time: "15 min ago",
    condition: "Like New",
    description: "Original Apple charger, used for 2 months only.",
    emoji: "💻",
    liked: true,
    rating: 5.0,
  },
  {
    id: 3,
    title: "Tefal Electric Kettle 1.2L",
    price: 700,
    category: "Dorm Gear",
    seller: "Priya M.",
    sellerInitials: "PM",
    sellerColor: "from-pink-500 to-rose-600",
    location: "Girls Hostel C",
    time: "1 hr ago",
    condition: "Good",
    description: "Works perfectly. Selling because I'm going home for summer.",
    emoji: "☕",
    liked: false,
    rating: 4.5,
  },
  {
    id: 4,
    title: "Techfest 2026 — 2-Day Pass",
    price: 250,
    category: "Tickets",
    seller: "Dev P.",
    sellerInitials: "DP",
    sellerColor: "from-emerald-400 to-teal-600",
    location: "Main Gate",
    time: "2 hr ago",
    condition: "New",
    description: "Can't attend anymore. Full access both days.",
    emoji: "🎟️",
    liked: false,
    rating: 4.9,
  },
  {
    id: 5,
    title: "Scientific Calculator (Casio fx-991)",
    price: 400,
    category: "Electronics",
    seller: "Meera R.",
    sellerInitials: "MR",
    sellerColor: "from-amber-400 to-orange-600",
    location: "Dept Library",
    time: "3 hr ago",
    condition: "Good",
    description: "Used for 2 semesters. All functions working.",
    emoji: "🔢",
    liked: false,
    rating: 4.3,
  },
  {
    id: 6,
    title: "Network Engineering (Forouzan)",
    price: 300,
    category: "Books",
    seller: "Akash T.",
    sellerInitials: "AT",
    sellerColor: "from-violet-400 to-purple-600",
    location: "Hostel Block B",
    time: "5 hr ago",
    condition: "Acceptable",
    description: "Some notes inside, but all chapters intact.",
    emoji: "📖",
    liked: true,
    rating: 4.0,
  },
  {
    id: 7,
    title: "Mini Desk Fan (USB)",
    price: 350,
    category: "Dorm Gear",
    seller: "Sneha V.",
    sellerInitials: "SV",
    sellerColor: "from-sky-400 to-indigo-600",
    location: "Girls Hostel A",
    time: "Yesterday",
    condition: "Like New",
    description: "Silent, 3-speed settings. Perfect for hostel rooms.",
    emoji: "🌀",
    liked: false,
    rating: 4.7,
  },
  {
    id: 8,
    title: "College Hoodie (XL) — Unused",
    price: 450,
    category: "Clothes",
    seller: "Kartik N.",
    sellerInitials: "KN",
    sellerColor: "from-rose-400 to-pink-600",
    location: "Hostel Block D",
    time: "2 days ago",
    condition: "New",
    description: "Got the wrong size. Original with tags.",
    emoji: "👕",
    liked: false,
    rating: 5.0,
  },
];

function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState(LISTINGS);
  const [showPost, setShowPost] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");

  const filtered = listings
    .filter((l) => {
      const matchCat = selectedCategory === "All" || l.category === selectedCategory;
      const matchSearch =
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.id - a.id;
    });

  const toggleLike = (id: number) =>
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, liked: !l.liked } : l)));

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
            id={`cat-${cat.toLowerCase()}`}
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
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> listings
        {search && ` for "${search}"`}
      </p>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((listing, i) => (
          <div
            key={listing.id}
            id={`listing-${listing.id}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border glass transition-all duration-200 animate-fade-up card-hover"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Image area */}
            <div className="flex h-32 items-center justify-center bg-surface-elevated text-5xl">
              {listing.emoji}
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
                  onClick={() => toggleLike(listing.id)}
                  className={`shrink-0 transition ${listing.liked ? "text-rose-400" : "text-muted-foreground hover:text-rose-400"}`}
                >
                  <Heart className={`h-4 w-4 ${listing.liked ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] text-muted-foreground">
                  {listing.category}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${listing.condition === "New" || listing.condition === "Like New" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}
                >
                  {listing.condition}
                </span>
              </div>

              <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${listing.sellerColor} text-[9px] font-bold text-white`}
                  >
                    {listing.sellerInitials}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{listing.seller}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] text-muted-foreground">{listing.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-primary">₹{listing.price}</div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-2.5 w-2.5" />
                    {listing.time}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="h-2.5 w-2.5" />
                {listing.location}
              </div>

              <button className="mt-3 w-full rounded-lg bg-primary/15 py-2 text-xs font-semibold text-primary transition-all duration-150 hover:bg-primary hover:text-primary-foreground btn-press">
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Listing Modal */}
      {showPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl glass-strong neon-border p-6 animate-fade-up">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" /> Post a Listing
              </h3>
              <button
                id="close-post-modal"
                onClick={() => setShowPost(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setShowPost(false);
              }}
            >
              <div>
                <label
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  htmlFor="post-title"
                >
                  Title
                </label>
                <input
                  id="post-title"
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
                    Price (₹)
                  </label>
                  <input
                    id="post-price"
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
                  Condition
                </label>
                <select
                  id="post-condition"
                  className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                >
                  <option>New</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Acceptable</option>
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
                  placeholder="e.g. Hostel Block A, Room 204"
                  className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <button
                id="post-submit-btn"
                type="submit"
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
              >
                Post Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
