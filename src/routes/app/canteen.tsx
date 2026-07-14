import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Clock,
  Star,
  Flame,
  Award,
  ShoppingCart,
  MapPin,
  Zap,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Coffee,
  UtensilsCrossed,
  ShieldAlert,
} from "lucide-react";

export const Route = createFileRoute("/app/canteen")({
  head: () => ({
    meta: [{ title: "Canteen — Campus Connect" }],
  }),
  component: Canteen,
});

type DietType = "veg" | "nonveg" | "egg";
type PriceFilter = "all" | "under30" | "30to60" | "over60";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  diet: DietType;
  calories: string;
  protein: string;
  rating: number;
  isSpecial?: boolean;
  tags?: string[];
};

type Shop = {
  id: string;
  name: string;
  emoji: string;
  location: string;
  openTime: string;
  closeTime: string;
  waitMinutes: number;
  rating: number;
  totalReviews: number;
  isOpen: boolean;
  tagline: string;
  menu: MenuItem[];
};

const SHOPS: Shop[] = [
  {
    id: "nescafe",
    name: "Nescafé",
    emoji: "☕",
    location: "Block A, Ground Floor",
    openTime: "7:30 AM",
    closeTime: "8:00 PM",
    waitMinutes: 5,
    rating: 4.6,
    totalReviews: 312,
    isOpen: true,
    tagline: "Coffees, teas, and quick snacks",
    menu: [
      {
        id: 101,
        name: "Classic Nescafé Coffee",
        description: "Smooth hot coffee with milk, perfect for early mornings",
        price: 20,
        diet: "veg",
        calories: "80 kcal",
        protein: "2g",
        rating: 4.7,
        isSpecial: true,
        tags: ["Best Seller"],
      },
      {
        id: 102,
        name: "Cappuccino",
        description: "Rich espresso topped with creamy frothed milk",
        price: 40,
        diet: "veg",
        calories: "120 kcal",
        protein: "4g",
        rating: 4.5,
      },
      {
        id: 103,
        name: "Cold Coffee",
        description: "Chilled blended coffee with ice cream",
        price: 50,
        diet: "veg",
        calories: "210 kcal",
        protein: "5g",
        rating: 4.8,
        tags: ["Popular"],
      },
      {
        id: 104,
        name: "Masala Tea",
        description: "Spiced ginger cardamom tea served hot",
        price: 15,
        diet: "veg",
        calories: "60 kcal",
        protein: "1g",
        rating: 4.6,
      },
      {
        id: 105,
        name: "Sandwich (Grilled Veg)",
        description: "Double layered veg sandwich with cheese and sauce",
        price: 45,
        diet: "veg",
        calories: "320 kcal",
        protein: "10g",
        rating: 4.4,
      },
      {
        id: 106,
        name: "Croissant",
        description: "Buttery flaky French croissant, served warm",
        price: 35,
        diet: "veg",
        calories: "250 kcal",
        protein: "5g",
        rating: 4.3,
      },
    ],
  },
  {
    id: "combo",
    name: "Combo",
    emoji: "🥘",
    location: "Main Block, 1st Floor",
    openTime: "11:00 AM",
    closeTime: "4:00 PM",
    waitMinutes: 12,
    rating: 4.4,
    totalReviews: 186,
    isOpen: true,
    tagline: "Filling meals and combo deals",
    menu: [
      {
        id: 201,
        name: "Thali Combo (Full)",
        description: "Dal, 2 sabzi, rice, 3 roti, curd, salad and pickle",
        price: 80,
        diet: "veg",
        calories: "850 kcal",
        protein: "22g",
        rating: 4.7,
        isSpecial: true,
        tags: ["Best Value"],
      },
      {
        id: 202,
        name: "Rajma Rice Combo",
        description: "Rajma curry with steamed rice, papad and salad",
        price: 65,
        diet: "veg",
        calories: "620 kcal",
        protein: "18g",
        rating: 4.5,
      },
      {
        id: 203,
        name: "Chicken Curry + Rice Combo",
        description: "Boneless chicken in rich gravy with basmati rice",
        price: 110,
        diet: "nonveg",
        calories: "720 kcal",
        protein: "35g",
        rating: 4.6,
        tags: ["Popular"],
      },
      {
        id: 204,
        name: "Egg Fried Rice Combo",
        description: "Egg fried rice with manchurian and soup",
        price: 75,
        diet: "egg",
        calories: "540 kcal",
        protein: "20g",
        rating: 4.3,
      },
      {
        id: 205,
        name: "Paneer Tikka + Naan",
        description: "Smoky paneer tikka with buttered naan and mint chutney",
        price: 95,
        diet: "veg",
        calories: "680 kcal",
        protein: "28g",
        rating: 4.8,
        tags: ["Chef's Pick"],
      },
    ],
  },
  {
    id: "desraj",
    name: "Desraj",
    emoji: "🍛",
    location: "Hostel Block, Ground Floor",
    openTime: "8:00 AM",
    closeTime: "9:30 PM",
    waitMinutes: 8,
    rating: 4.8,
    totalReviews: 524,
    isOpen: true,
    tagline: "Desi food, homestyle flavours",
    menu: [
      {
        id: 301,
        name: "Chole Bhature",
        description: "Fluffy bhature with spiced chickpea masala",
        price: 60,
        diet: "veg",
        calories: "580 kcal",
        protein: "14g",
        rating: 4.9,
        isSpecial: true,
        tags: ["Famous", "🔥"],
      },
      {
        id: 302,
        name: "Aloo Paratha (2 pcs)",
        description: "Stuffed whole wheat paratha with butter and curd",
        price: 40,
        diet: "veg",
        calories: "450 kcal",
        protein: "10g",
        rating: 4.7,
      },
      {
        id: 303,
        name: "Dal Makhani",
        description: "Slow-cooked black lentils with cream and spices",
        price: 55,
        diet: "veg",
        calories: "490 kcal",
        protein: "16g",
        rating: 4.8,
        tags: ["All Day"],
      },
      {
        id: 304,
        name: "Palak Paneer + Roti",
        description: "Cottage cheese in spinach gravy with wheat roti",
        price: 70,
        diet: "veg",
        calories: "530 kcal",
        protein: "18g",
        rating: 4.6,
      },
      {
        id: 305,
        name: "Butter Chicken + Naan",
        description: "Tender chicken in a rich buttery tomato gravy",
        price: 120,
        diet: "nonveg",
        calories: "700 kcal",
        protein: "38g",
        rating: 4.9,
        tags: ["Bestseller"],
      },
      {
        id: 306,
        name: "Kadhi Chawal",
        description: "Yogurt-based curry with pakodas and steamed rice",
        price: 50,
        diet: "veg",
        calories: "470 kcal",
        protein: "12g",
        rating: 4.5,
      },
    ],
  },
  {
    id: "juicebar",
    name: "The Juice Bar",
    emoji: "🥤",
    location: "Garden Area, Near Library",
    openTime: "9:00 AM",
    closeTime: "7:00 PM",
    waitMinutes: 3,
    rating: 4.5,
    totalReviews: 241,
    isOpen: true,
    tagline: "Fresh juices, smoothies and shakes",
    menu: [
      {
        id: 401,
        name: "Fresh Mango Shake",
        description: "Thick, chilled shake blended from Alphonso mangoes",
        price: 60,
        diet: "veg",
        calories: "240 kcal",
        protein: "4g",
        rating: 4.9,
        isSpecial: true,
        tags: ["Seasonal"],
      },
      {
        id: 402,
        name: "Mixed Fruit Juice",
        description: "Seasonal fruits blended fresh with ice",
        price: 40,
        diet: "veg",
        calories: "150 kcal",
        protein: "2g",
        rating: 4.6,
      },
      {
        id: 403,
        name: "Sugarcane Juice",
        description: "Fresh-pressed sugarcane with lemon and ginger",
        price: 25,
        diet: "veg",
        calories: "110 kcal",
        protein: "1g",
        rating: 4.7,
        tags: ["Popular"],
      },
      {
        id: 404,
        name: "Banana Milkshake",
        description: "Creamy blend of banana and cold milk",
        price: 50,
        diet: "veg",
        calories: "280 kcal",
        protein: "6g",
        rating: 4.4,
      },
      {
        id: 405,
        name: "Green Detox Smoothie",
        description: "Spinach, cucumber, ginger, lime and apple",
        price: 65,
        diet: "veg",
        calories: "120 kcal",
        protein: "3g",
        rating: 4.3,
      },
    ],
  },
  {
    id: "snackshack",
    name: "Snack Shack",
    emoji: "🍟",
    location: "Block B, Canteen Wing",
    openTime: "10:00 AM",
    closeTime: "8:30 PM",
    waitMinutes: 6,
    rating: 4.3,
    totalReviews: 178,
    isOpen: true,
    tagline: "Fried snacks, fast bites, quick munchies",
    menu: [
      {
        id: 501,
        name: "Samosa (2 pcs)",
        description: "Crispy fried pastry filled with spiced potatoes and peas",
        price: 15,
        diet: "veg",
        calories: "180 kcal",
        protein: "3g",
        rating: 4.7,
        isSpecial: true,
        tags: ["Everyone's Fav"],
      },
      {
        id: 502,
        name: "Vada Pav",
        description: "Mumbai-style spicy potato fritter in a soft bun",
        price: 20,
        diet: "veg",
        calories: "260 kcal",
        protein: "5g",
        rating: 4.6,
        tags: ["Popular"],
      },
      {
        id: 503,
        name: "Pav Bhaji",
        description: "Spiced vegetable mash with buttered pav buns",
        price: 50,
        diet: "veg",
        calories: "450 kcal",
        protein: "8g",
        rating: 4.5,
      },
      {
        id: 504,
        name: "Maggi Noodles",
        description: "Classic masala Maggi with extra veggies",
        price: 25,
        diet: "veg",
        calories: "290 kcal",
        protein: "6g",
        rating: 4.5,
      },
      {
        id: 505,
        name: "French Fries (Masala)",
        description: "Crispy golden fries with chat masala and ketchup",
        price: 40,
        diet: "veg",
        calories: "340 kcal",
        protein: "4g",
        rating: 4.2,
      },
      {
        id: 506,
        name: "Spring Rolls (3 pcs)",
        description: "Fried rolls stuffed with crispy cabbage and noodles",
        price: 45,
        diet: "veg",
        calories: "310 kcal",
        protein: "5g",
        rating: 4.4,
      },
    ],
  },
  {
    id: "hotbites",
    name: "Hot Bites",
    emoji: "🌮",
    location: "Sports Complex, Entrance",
    openTime: "12:00 PM",
    closeTime: "10:00 PM",
    waitMinutes: 10,
    rating: 4.2,
    totalReviews: 143,
    isOpen: false,
    tagline: "Burgers, wraps and evening specials",
    menu: [
      {
        id: 601,
        name: "Chicken Burger",
        description: "Grilled chicken patty with lettuce, cheese and sauces",
        price: 90,
        diet: "nonveg",
        calories: "520 kcal",
        protein: "30g",
        rating: 4.5,
        isSpecial: true,
        tags: ["Evening Special"],
      },
      {
        id: 602,
        name: "Aloo Tikki Burger",
        description: "Crispy potato tikki with onion, tomato and green chutney",
        price: 50,
        diet: "veg",
        calories: "390 kcal",
        protein: "7g",
        rating: 4.3,
      },
      {
        id: 603,
        name: "Paneer Wrap",
        description: "Grilled paneer in a wheat wrap with salad and sauce",
        price: 70,
        diet: "veg",
        calories: "420 kcal",
        protein: "16g",
        rating: 4.4,
        tags: ["Popular"],
      },
      {
        id: 604,
        name: "Egg Wrap",
        description: "Scrambled egg with veggies in a soft flour wrap",
        price: 55,
        diet: "egg",
        calories: "350 kcal",
        protein: "14g",
        rating: 4.2,
      },
      {
        id: 605,
        name: "Grilled Corn",
        description: "Charred corn on the cob with butter, lemon and masala",
        price: 30,
        diet: "veg",
        calories: "180 kcal",
        protein: "4g",
        rating: 4.6,
      },
    ],
  },
];

const dietConfig = {
  veg: {
    label: "Veg",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  nonveg: {
    label: "Non-Veg",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/30",
    dot: "bg-rose-500",
  },
  egg: {
    label: "Egg",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30",
    dot: "bg-amber-500",
  },
};

function WaitBadge({ minutes }: { minutes: number }) {
  const color =
    minutes <= 5
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
      : minutes <= 10
        ? "text-primary bg-primary/10 border-primary/20"
        : "text-rose-400 bg-rose-500/10 border-rose-500/30";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-semibold ${color}`}
    >
      <Zap className="h-2.5 w-2.5" /> ~{minutes} min wait
    </span>
  );
}

export default function Canteen() {
  const [activeShopId, setActiveShopId] = useState("nescafe");
  const [dietFilter, setDietFilter] = useState<"all" | DietType>("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [cart, setCart] = useState<number[]>([]);

  const shop = SHOPS.find((s) => s.id === activeShopId)!;

  const filteredMenu = shop.menu.filter((item) => {
    const matchDiet = dietFilter === "all" || item.diet === dietFilter;
    let matchPrice = true;
    if (priceFilter === "under30") matchPrice = item.price < 30;
    else if (priceFilter === "30to60") matchPrice = item.price >= 30 && item.price <= 60;
    else if (priceFilter === "over60") matchPrice = item.price > 60;
    return matchDiet && matchPrice;
  });

  const special = filteredMenu.find((i) => i.isSpecial);

  const toggleCart = (id: number) =>
    setCart((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-xl font-bold">Campus Canteen</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {SHOPS.length} shops on campus · {SHOPS.filter((s) => s.isOpen).length} open now
        </p>
      </div>

      {/* Shop Selector Cards */}
      <div className="flex gap-3 overflow-x-auto pb-1 animate-fade-up">
        {SHOPS.map((s) => (
          <button
            key={s.id}
            id={`shop-${s.id}`}
            onClick={() => {
              setActiveShopId(s.id);
              setDietFilter("all");
              setPriceFilter("all");
            }}
            className={`flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 transition-all duration-150 min-w-24 ${
              activeShopId === s.id
                ? "border-primary bg-primary/10 text-foreground shadow-sm"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-xs font-semibold leading-tight text-center">{s.name}</span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${s.isOpen ? "bg-emerald-500" : "bg-rose-500"}`}
            />
          </button>
        ))}
      </div>

      {/* Shop Detail Card */}
      <div className="rounded-2xl border border-border glass p-5 animate-fade-up">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="text-4xl">{shop.emoji}</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold">{shop.name}</h3>
                {shop.isOpen ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle className="h-3 w-3" /> Open Now
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-rose-400">
                    <AlertCircle className="h-3 w-3" /> Closed
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{shop.tagline}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-bold">{shop.rating}</span>
            <span className="text-xs text-muted-foreground">({shop.totalReviews})</span>
          </div>
        </div>

        {/* Shop Parameters Row */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>
              {shop.openTime} – {shop.closeTime}
            </span>
          </div>
          <div className="text-muted-foreground">·</div>
          <WaitBadge minutes={shop.waitMinutes} />
          <div className="text-muted-foreground">·</div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{shop.location}</span>
          </div>
          {cart.length > 0 && (
            <div className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
              <ShoppingCart className="h-3.5 w-3.5" />
              {cart.length} pre-ordered
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 animate-fade-up">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-muted-foreground">Diet:</span>
          {(["all", "veg", "nonveg", "egg"] as const).map((d) => (
            <button
              key={d}
              id={`diet-${d}`}
              onClick={() => setDietFilter(d)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                dietFilter === d
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {d === "all"
                ? "All"
                : d === "nonveg"
                  ? "Non-Veg"
                  : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-muted-foreground">Price:</span>
          {[
            { id: "all", label: "All Prices" },
            { id: "under30", label: "Under ₹30" },
            { id: "30to60", label: "₹30 – ₹60" },
            { id: "over60", label: "Over ₹60" },
          ].map((pf) => (
            <button
              key={pf.id}
              id={`price-${pf.id}`}
              onClick={() => setPriceFilter(pf.id as PriceFilter)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                priceFilter === pf.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {pf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Special from this shop */}
      {special && (
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-yellow-500/5 p-5 animate-fade-up">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/5 blur-3xl" />
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1 rounded bg-primary/20 border border-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                ⭐ Shop Special
              </span>
              <h4 className="mt-2 text-base font-bold">{special.name}</h4>
              <p className="mt-0.5 text-sm text-muted-foreground">{special.description}</p>
              <div className="mt-3 flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
                <span className="flex items-center gap-1 bg-surface px-2 py-0.5 rounded border border-border">
                  <Flame className="h-3.5 w-3.5 text-primary" /> {special.calories}
                </span>
                <span className="flex items-center gap-1 bg-surface px-2 py-0.5 rounded border border-border">
                  <Award className="h-3.5 w-3.5 text-primary" /> {special.protein} Protein
                </span>
                <span className="text-xl font-black text-primary">₹{special.price}</span>
              </div>
            </div>
            <button
              onClick={() => toggleCart(special.id)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                cart.includes(special.id)
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-primary text-primary-foreground hover:opacity-90 glow-primary"
              }`}
            >
              {cart.includes(special.id) ? "✓ Pre-ordered" : "Pre-order"}
            </button>
          </div>
        </div>
      )}

      {/* Menu Grid */}
      {filteredMenu.filter((i) => !i.isSpecial).length === 0 ? (
        <div className="rounded-2xl border border-border glass py-12 text-center animate-fade-up">
          <UtensilsCrossed className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No items match your current filters.</p>
          <button
            onClick={() => {
              setDietFilter("all");
              setPriceFilter("all");
            }}
            className="mt-3 rounded-lg border border-border px-4 py-1.5 text-xs text-primary hover:border-primary transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredMenu
            .filter((i) => !i.isSpecial)
            .map((item, idx) => {
              const diet = dietConfig[item.diet];
              const inCart = cart.includes(item.id);
              return (
                <div
                  key={item.id}
                  id={`item-${item.id}`}
                  className="flex items-start gap-4 rounded-2xl border border-border glass p-4 transition hover:bg-surface-elevated animate-fade-up"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                      {item.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase ${diet.bg} ${diet.color}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${diet.dot}`} />
                        {diet.label}
                      </span>
                      <span className="flex items-center gap-1 bg-surface px-1.5 py-0.5 rounded border border-border text-[10px] text-muted-foreground">
                        <Flame className="h-3 w-3 text-primary" /> {item.calories}
                      </span>
                      <span className="flex items-center gap-1 bg-surface px-1.5 py-0.5 rounded border border-border text-[10px] text-muted-foreground">
                        <Award className="h-3 w-3 text-primary" /> {item.protein}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-[10px] text-muted-foreground">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="text-base font-black text-primary">₹{item.price}</span>
                    <button
                      id={`order-${item.id}`}
                      onClick={() => toggleCart(item.id)}
                      className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition ${
                        inCart
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "border border-border hover:border-primary hover:text-primary bg-surface-elevated"
                      }`}
                    >
                      {inCart ? "✓ Added" : "+ Add"}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Footer notice */}
      <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-xs text-muted-foreground animate-fade-up">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          Pre-orders close 15 minutes before each shop closes. Collect your order at the shop
          counter with your student ID.
        </p>
      </div>
    </div>
  );
}
