import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  UtensilsCrossed, Clock, Leaf, AlertCircle, Star, ShoppingCart, ChevronLeft, ChevronRight,
  Flame, Award, ShieldAlert
} from "lucide-react";

export const Route = createFileRoute("/app/canteen")({
  head: () => ({
    meta: [{ title: "Canteen Menu — Campus Connect" }],
  }),
  component: Canteen,
});

type DietType = "veg" | "nonveg" | "egg";

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

const MEALS = ["Breakfast", "Lunch", "Snacks", "Dinner"] as const;
type Meal = typeof MEALS[number];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MENU: Record<Meal, MenuItem[]> = {
  Breakfast: [
    { id: 1, name: "Masala Dosa + Sambar", description: "Crispy dosa served with coconut chutney and sambar", price: 40, diet: "veg", calories: "350 kcal", protein: "8g", rating: 4.8, isSpecial: true, tags: ["Popular"] },
    { id: 2, name: "Aloo Paratha + Curd", description: "Stuffed wheat flatbread with butter and fresh curd", price: 35, diet: "veg", calories: "420 kcal", protein: "9g", rating: 4.5 },
    { id: 3, name: "Bread Omelette", description: "2-egg omelette with toasted bread and ketchup", price: 30, diet: "egg", calories: "280 kcal", protein: "14g", rating: 4.2 },
    { id: 4, name: "Idli + Sambar (4 pcs)", description: "Steamed soft idli with sambar and chutney", price: 25, diet: "veg", calories: "220 kcal", protein: "6g", rating: 4.6 },
    { id: 5, name: "Poha + Tea", description: "Flattened rice with peanuts, curry leaves and tea", price: 20, diet: "veg", calories: "200 kcal", protein: "4g", rating: 4.0 },
  ],
  Lunch: [
    { id: 6, name: "Paneer Butter Masala + Rice", description: "Rich creamy paneer curry with steamed basmati rice", price: 80, diet: "veg", calories: "620 kcal", protein: "18g", rating: 4.9, isSpecial: true, tags: ["Today's Special", "🔥 Hot"] },
    { id: 7, name: "Chicken Biryani", description: "Dum-cooked aromatic biryani with raita and shorba", price: 100, diet: "nonveg", calories: "720 kcal", protein: "32g", rating: 4.8, tags: ["Bestseller"] },
    { id: 8, name: "Dal Makhani + 2 Roti + Rice", description: "Slow-cooked black lentils in a buttery tomato gravy", price: 60, diet: "veg", calories: "550 kcal", protein: "15g", rating: 4.6 },
    { id: 9, name: "Rajma Chawal", description: "Kidney beans curry with steamed rice and pickle", price: 55, diet: "veg", calories: "510 kcal", protein: "12g", rating: 4.4 },
    { id: 10, name: "Fish Curry + Rice", description: "Spicy Kerala style fish curry with steamed rice", price: 90, diet: "nonveg", calories: "580 kcal", protein: "26g", rating: 4.3 },
    { id: 11, name: "Thali (Full Meal)", description: "2 sabzi, dal, rice, 3 roti, salad, curd and pickle", price: 70, diet: "veg", calories: "800 kcal", protein: "22g", rating: 4.7, tags: ["Best Value"] },
  ],
  Snacks: [
    { id: 12, name: "Samosa (2 pcs)", description: "Crispy fried pastry with spiced potato filling", price: 15, diet: "veg", calories: "180 kcal", protein: "3g", rating: 4.7, isSpecial: true },
    { id: 13, name: "Maggi Noodles", description: "Classic masala Maggi with extra veggies", price: 25, diet: "veg", calories: "290 kcal", protein: "6g", rating: 4.5, tags: ["Popular"] },
    { id: 14, name: "Vada Pav", description: "Mumbai street-style spicy potato fritter in a bun", price: 20, diet: "veg", calories: "260 kcal", protein: "5g", rating: 4.6 },
    { id: 15, name: "Cold Coffee / Lassi", description: "Chilled blended coffee or sweet salted lassi", price: 30, diet: "veg", calories: "220 kcal", protein: "4g", rating: 4.3 },
    { id: 16, name: "Pav Bhaji", description: "Spiced mashed veggies served with buttered pav", price: 50, diet: "veg", calories: "450 kcal", protein: "8g", rating: 4.8 },
  ],
  Dinner: [
    { id: 17, name: "Butter Chicken + Naan", description: "Tender chicken in a rich creamy tomato gravy with naan", price: 110, diet: "nonveg", calories: "680 kcal", protein: "35g", rating: 4.9, isSpecial: true, tags: ["Tonight's Special"] },
    { id: 18, name: "Chole Bhature", description: "Spiced chickpea curry with two fluffy bhature", price: 60, diet: "veg", calories: "580 kcal", protein: "14g", rating: 4.7 },
    { id: 19, name: "Egg Curry + Rice", description: "Hard boiled eggs in a spicy onion-tomato gravy", price: 65, diet: "egg", calories: "440 kcal", protein: "18g", rating: 4.4 },
    { id: 20, name: "Veg Pulao + Raita", description: "Fragrant rice cooked with mixed veggies and raita", price: 55, diet: "veg", calories: "480 kcal", protein: "10g", rating: 4.3 },
    { id: 21, name: "Palak Paneer + Rice + Roti", description: "Cottage cheese in creamy spinach gravy", price: 75, diet: "veg", calories: "520 kcal", protein: "16g", rating: 4.5 },
  ],
};

const MEAL_TIMES: Record<Meal, string> = {
  Breakfast: "7:30 AM – 9:30 AM",
  Lunch: "12:00 PM – 2:30 PM",
  Snacks: "4:00 PM – 6:00 PM",
  Dinner: "7:30 PM – 9:30 PM",
};

const dietConfig = {
  veg: { label: "Veg", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", dot: "bg-emerald-500" },
  nonveg: { label: "Non-Veg", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30", dot: "bg-rose-500" },
  egg: { label: "Egg", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", dot: "bg-amber-500" },
};

function Canteen() {
  const [activeMeal, setActiveMeal] = useState<Meal>("Lunch");
  const [dayIndex, setDayIndex] = useState(5); // Saturday
  const [cart, setCart] = useState<number[]>([]);
  const [dietFilter, setDietFilter] = useState<"all" | DietType>("all");
  const [priceFilter, setPriceFilter] = useState<"all" | "under30" | "30to60" | "over60">("all");

  const items = MENU[activeMeal].filter((i) => {
    // Diet filter
    const matchDiet = dietFilter === "all" || i.diet === dietFilter;

    // Price filter
    let matchPrice = true;
    if (priceFilter === "under30") matchPrice = i.price < 30;
    else if (priceFilter === "30to60") matchPrice = i.price >= 30 && i.price <= 60;
    else if (priceFilter === "over60") matchPrice = i.price > 60;

    return matchDiet && matchPrice;
  });

  const special = items.find((i) => i.isSpecial);

  const addToCart = (id: number) =>
    setCart((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-xl font-bold">Canteen Menu</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Campus cafeteria — today's meals at a glance</p>
      </div>

      {/* Day selector */}
      <div className="flex items-center gap-3 animate-fade-up">
        <button
          onClick={() => setDayIndex((d) => Math.max(0, d - 1))}
          className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex flex-1 gap-1.5 overflow-x-auto">
          {DAYS.map((day, i) => (
            <button
              key={day}
              id={`day-${day.toLowerCase()}`}
              onClick={() => setDayIndex(i)}
              className={`min-w-10 flex-1 rounded-xl py-2 text-xs font-semibold transition ${
                dayIndex === i
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <button
          onClick={() => setDayIndex((d) => Math.min(6, d + 1))}
          className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Meal tabs */}
      <div className="flex gap-2 flex-wrap animate-fade-up">
        {MEALS.map((meal) => (
          <button
            key={meal}
            id={`meal-${meal.toLowerCase()}`}
            onClick={() => setActiveMeal(meal)}
            className={`flex-1 min-w-20 rounded-xl border py-2.5 text-xs font-semibold transition ${
              activeMeal === meal
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            <div>{meal}</div>
            <div className="mt-0.5 text-[9px] opacity-70">{MEAL_TIMES[meal].split("–")[0].trim()}</div>
          </button>
        ))}
      </div>

      {/* Timing + status */}
      <div className="flex items-center justify-between rounded-xl border border-border glass px-4 py-2.5 animate-fade-up">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">{activeMeal}</span>
          <span className="text-xs text-muted-foreground">· {MEAL_TIMES[activeMeal]}</span>
        </div>
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
          Open Now
        </span>
      </div>

      {/* Filters (Diet & Price) */}
      <div className="space-y-3 animate-fade-up">
        {/* Diet */}
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Diet:</span>
          {(["all", "veg", "nonveg", "egg"] as const).map((d) => (
            <button
              key={d}
              id={`diet-${d}`}
              onClick={() => setDietFilter(d)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition capitalize ${
                dietFilter === d
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {d === "all" ? "All" : d === "nonveg" ? "Non-Veg" : d}
            </button>
          ))}
        </div>

        {/* Price filter */}
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Price:</span>
          {[
            { id: "all", label: "All Prices" },
            { id: "under30", label: "Under ₹30" },
            { id: "30to60", label: "₹30 – ₹60" },
            { id: "over60", label: "Over ₹60" }
          ].map((pf) => (
            <button
              key={pf.id}
              id={`price-filter-${pf.id}`}
              onClick={() => setPriceFilter(pf.id as any)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                priceFilter === pf.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {pf.label}
            </button>
          ))}

          {cart.length > 0 && (
            <div className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <ShoppingCart className="h-3.5 w-3.5" />
              {cart.length} pre-ordered
            </div>
          )}
        </div>
      </div>

      {/* Special Highlights Card */}
      {special && (
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-yellow-500/5 p-5 animate-fade-up">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1 rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase text-primary border border-primary/20">
                ⭐ Today's Special
              </span>
              <h3 className="mt-2 text-lg font-bold">{special.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{special.description}</p>

              {/* Nutritional breakdown */}
              <div className="mt-3 flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
                <span className="flex items-center gap-1 bg-surface px-2 py-0.5 rounded border border-border">
                  <Flame className="h-3.5 w-3.5 text-primary" /> {special.calories}
                </span>
                <span className="flex items-center gap-1 bg-surface px-2 py-0.5 rounded border border-border">
                  <Award className="h-3.5 w-3.5 text-primary" /> {special.protein} Protein
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-bold text-foreground">{special.rating}</span>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-xl font-black text-primary">₹{special.price}</span>
              </div>
            </div>
            <button
              onClick={() => addToCart(special.id)}
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

      {/* Menu List */}
      <div className="grid gap-3 sm:grid-cols-2">
        {items.filter((i) => !i.isSpecial).map((item, idx) => {
          const diet = dietConfig[item.diet];
          const inCart = cart.includes(item.id);
          return (
            <div
              key={item.id}
              id={`menu-item-${item.id}`}
              className="flex items-start gap-4 rounded-2xl border border-border glass p-4 transition hover:bg-surface-elevated animate-fade-up"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                  {item.tags?.map((tag) => (
                    <span key={tag} className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
                <div className="mt-2.5 flex items-center gap-2.5 flex-wrap">
                  <span className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase ${diet.bg} ${diet.color}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${diet.dot}`} />
                    {diet.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 bg-surface px-1.5 py-0.5 rounded border border-border">
                    <Flame className="h-3 w-3 text-primary" /> {item.calories}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 bg-surface px-1.5 py-0.5 rounded border border-border">
                    <Award className="h-3 w-3 text-primary" /> {item.protein} Protein
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
                  id={`btn-canteen-order-${item.id}`}
                  onClick={() => addToCart(item.id)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition ${
                    inCart
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-surface-elevated border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {inCart ? "✓ Added" : "+ Add"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-xs text-muted-foreground animate-fade-up">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>Nutritional facts are calculated by the campus dietician. Pre-orders close 30 minutes before meal times.</p>
      </div>
    </div>
  );
}
