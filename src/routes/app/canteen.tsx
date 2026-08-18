import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Clock,
  MapPin,
  Zap,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  Calendar,
  Info,
  Flame,
  ShieldCheck,
  Building,
} from "lucide-react";

export const Route = createFileRoute("/app/canteen")({
  head: () => ({
    meta: [{ title: "Mess Menu — Campus Connect" }],
  }),
  component: MessAndCanteenPage,
});

type DietType = "veg" | "nonveg" | "egg";

interface MealSlot {
  name: string;
  time: string;
  items: string[];
  specialItem?: string;
  calories?: string;
  protein?: string;
  diet: DietType;
  tags?: string[];
}

interface DayMenu {
  dayName: string;
  breakfast: MealSlot;
  lunch: MealSlot;
  snacks: MealSlot;
  dinner: MealSlot;
}

interface HostelInfo {
  id: string;
  name: string;
  type: "boys" | "girls";
  location: string;
  hasMenu: boolean;
  specialNotice?: string;
}

// ─── HOSTEL METADATA (KURUKSHETRA, SHIVALIK, HIMALAYA, KALPANA CHAWLA, VINDHYA) ───

const HOSTELS_LIST: HostelInfo[] = [
  {
    id: "kurukshetra",
    name: "Kurukshetra Hostel",
    type: "boys",
    location: "South Campus",
    hasMenu: true,
    specialNotice: "Wednesday: South Indian Special | Sunday: Amritsari Chole Bhature & Shahi Feast",
  },
  {
    id: "shivalik",
    name: "Shivalik Hostel",
    type: "boys",
    location: "Near Sports Complex",
    hasMenu: false,
  },
  {
    id: "himalaya",
    name: "Himalaya Hostel",
    type: "boys",
    location: "North Block",
    hasMenu: false,
  },
  {
    id: "kalpana_chawla",
    name: "Kalpana Chawla Hostel",
    type: "girls",
    location: "East Campus",
    hasMenu: false,
  },
  {
    id: "vindhya",
    name: "Vindhya Hostel",
    type: "girls",
    location: "West Campus",
    hasMenu: false,
  },
];

// ─── KURUKSHETRA HOSTEL 7-DAY MENU ───

const KURUKSHETRA_WEEKLY_MENU: Record<string, DayMenu> = {
  Monday: {
    dayName: "Monday",
    breakfast: {
      name: "Breakfast",
      time: "7:30 AM – 9:30 AM",
      items: ["Aloo Onion Stuffed Paratha", "Fresh Curd (Dahi)", "Mixed Pickle & Butter", "Boiled Eggs (2 pcs) / Banana", "Hot Adrak Chai / Filter Coffee / Warm Milk"],
      specialItem: "Stuffed Aloo Paratha with Butter",
      calories: "450 kcal",
      protein: "14g",
      diet: "veg",
      tags: ["Chef Special", "High Energy"],
    },
    lunch: {
      name: "Lunch",
      time: "12:30 PM – 2:30 PM",
      items: ["Special Punjabi Rajma Masala", "Steamed Basmati Rice", "Mix Veg Sabzi (Carrot, Beans, Peas)", "Fresh Tawa Butter Roti", "Boondi Raita", "Green Salad & Lemon"],
      specialItem: "Punjabi Rajma Chawal",
      calories: "620 kcal",
      protein: "22g",
      diet: "veg",
      tags: ["Popular"],
    },
    snacks: {
      name: "Evening Snacks",
      time: "5:00 PM – 6:30 PM",
      items: ["Crispy Samosa with Mint & Saunth Chutney", "Special Masala Chai", "Hot Filter Coffee", "Glucose Biscuits"],
      specialItem: "Halwai Style Samosa",
      calories: "280 kcal",
      protein: "5g",
      diet: "veg",
      tags: ["Evening Favorite"],
    },
    dinner: {
      name: "Dinner",
      time: "7:30 PM – 9:45 PM",
      items: ["Kadhai Paneer Gravy", "Yellow Moong Dal Tadka", "Jeera Basmati Rice", "Tawa Phulka Roti", "Sirka Onion & Tomato Salad", "Hot Gulab Jamun (2 pcs)"],
      specialItem: "Kadhai Paneer & Gulab Jamun",
      calories: "680 kcal",
      protein: "24g",
      diet: "veg",
      tags: ["Sweet Included"],
    },
  },
  Tuesday: {
    dayName: "Tuesday",
    breakfast: {
      name: "Breakfast",
      time: "7:30 AM – 9:30 AM",
      items: ["Indori Poha with Roasted Peanuts & Sev", "Crispy Veg Cutlet", "Brown / White Bread Toast with Butter & Jam", "Boiled Egg / Fresh Apple", "Hot Tea & Milk"],
      specialItem: "Indori Poha with Sev",
      calories: "390 kcal",
      protein: "12g",
      diet: "veg",
      tags: ["Light & Healthy"],
    },
    lunch: {
      name: "Lunch",
      time: "12:30 PM – 2:30 PM",
      items: ["Authentic Punjabi Kadi Pakora", "Steamed Rice", "Aloo Gobhi Dry Sabzi", "Tawa Butter Roti", "Crisp Roasted Papad", "Kachumber Salad"],
      specialItem: "Punjabi Kadi Chawal with Papad",
      calories: "580 kcal",
      protein: "18g",
      diet: "veg",
      tags: ["Comfort Food"],
    },
    snacks: {
      name: "Evening Snacks",
      time: "5:00 PM – 6:30 PM",
      items: ["Stuffed Veg Bread Roll with Tomato Ketchup", "Cardamom Masala Tea", "Black Coffee"],
      specialItem: "Golden Bread Roll",
      calories: "240 kcal",
      protein: "6g",
      diet: "veg",
    },
    dinner: {
      name: "Dinner",
      time: "7:30 PM – 9:45 PM",
      items: ["Shahi Paneer Creamy Gravy", "Dal Makhani (Slow cooked)", "Veg Pulao Rice", "Butter Roti", "Cucumber & Beetroot Salad", "Chilled Fruit Custard"],
      specialItem: "Dal Makhani & Fruit Custard",
      calories: "710 kcal",
      protein: "26g",
      diet: "veg",
      tags: ["Deluxe Dinner"],
    },
  },
  Wednesday: {
    dayName: "Wednesday",
    breakfast: {
      name: "Breakfast",
      time: "7:30 AM – 9:30 AM",
      items: ["Steamed Idli (4 pcs) & Medu Vada", "Hot Vegetable Sambhar", "Fresh Coconut & Tomato Chutney", "Omelette (2 eggs) / Fruit", "South Indian Filter Coffee & Tea"],
      specialItem: "South Indian Idli Sambhar & Vada Feast",
      calories: "420 kcal",
      protein: "15g",
      diet: "veg",
      tags: ["South Indian Special"],
    },
    lunch: {
      name: "Lunch",
      time: "12:30 PM – 2:30 PM",
      items: ["Amritsari Chana Masala (Chole)", "Hot Poori & Jeera Rice", "Bhindi Do Pyaza", "Mix Veg Raita", "Sirka Onion Salad"],
      specialItem: "Chole Poori & Jeera Rice",
      calories: "690 kcal",
      protein: "20g",
      diet: "veg",
    },
    snacks: {
      name: "Evening Snacks",
      time: "5:00 PM – 6:30 PM",
      items: ["Assorted Veg Pakoras (Paneer, Pyaz, Gobhi)", "Pudina & Imli Chutneys", "Ginger Chai"],
      specialItem: "Mix Pakora Platter",
      calories: "310 kcal",
      protein: "8g",
      diet: "veg",
      tags: ["Rainy Day Special"],
    },
    dinner: {
      name: "Dinner",
      time: "7:30 PM – 9:45 PM",
      items: ["Matar Paneer / Egg Curry (Optional)", "Chana Dal Fry", "Steamed Basmati Rice", "Tawa Butter Roti", "Green Salad", "Warm Sewaiyan Kheer"],
      specialItem: "Matar Paneer & Kheer",
      calories: "670 kcal",
      protein: "25g",
      diet: "veg",
    },
  },
  Thursday: {
    dayName: "Thursday",
    breakfast: {
      name: "Breakfast",
      time: "7:30 AM – 9:30 AM",
      items: ["Paneer & Gobhi Stuffed Paratha", "Pudina Dahi", "Butter & Mixed Pickle", "Sprouted Moong Salad", "Hot Tea & Milk"],
      specialItem: "Paneer Paratha with Mint Curd",
      calories: "460 kcal",
      protein: "18g",
      diet: "veg",
      tags: ["High Protein"],
    },
    lunch: {
      name: "Lunch",
      time: "12:30 PM – 2:30 PM",
      items: ["Dal Tadka with Ghee", "Louki Kofta Curry", "Steamed Basmati Rice", "Fresh Phulka Roti", "Cucumber Tomato Raita", "Green Salad"],
      specialItem: "Louki Kofta & Dal Tadka",
      calories: "560 kcal",
      protein: "17g",
      diet: "veg",
    },
    snacks: {
      name: "Evening Snacks",
      time: "5:00 PM – 6:30 PM",
      items: ["Veg Coleslaw Sandwich / Grilled Sandwich", "Green Chutney", "Lemon Tea / Masala Chai"],
      specialItem: "Grilled Veg Sandwich",
      calories: "220 kcal",
      protein: "6g",
      diet: "veg",
    },
    dinner: {
      name: "Dinner",
      time: "7:30 PM – 9:45 PM",
      items: ["Palak Paneer", "Masoor Dal Tadka", "Veg Peas Pulao", "Butter Roti", "Radish & Onion Salad", "Spongy Bengali Rasgulla (2 pcs)"],
      specialItem: "Palak Paneer & Rasgulla",
      calories: "640 kcal",
      protein: "23g",
      diet: "veg",
    },
  },
  Friday: {
    dayName: "Friday",
    breakfast: {
      name: "Breakfast",
      time: "7:30 AM – 9:30 AM",
      items: ["Vegetable Rava Upma with Coconut Chutney", "Pav Bhaji (Fresh Butter Pav)", "Boiled Eggs / Banana", "Toast Butter Jam", "Adrak Chai & Milk"],
      specialItem: "Bombay Pav Bhaji & Upma",
      calories: "430 kcal",
      protein: "13g",
      diet: "veg",
    },
    lunch: {
      name: "Lunch",
      time: "12:30 PM – 2:30 PM",
      items: ["Dal Panchmel (5 Dals mix)", "Dum Aloo Kashmiri", "Jeera Rice", "Tawa Butter Roti", "Roasted Papad", "Plain Dahi & Salad"],
      specialItem: "Kashmiri Dum Aloo & Panchmel Dal",
      calories: "600 kcal",
      protein: "19g",
      diet: "veg",
    },
    snacks: {
      name: "Evening Snacks",
      time: "5:00 PM – 6:30 PM",
      items: ["Masala Maggi Noodles / Red Sauce Pasta", "Hot Coffee", "Ginger Tea"],
      specialItem: "Campus Masala Maggi",
      calories: "290 kcal",
      protein: "7g",
      diet: "veg",
      tags: ["Student Craving"],
    },
    dinner: {
      name: "Dinner",
      time: "7:30 PM – 9:45 PM",
      items: ["Paneer Butter Masala", "Palak Chana Dal", "Steamed Rice", "Butter Roti", "Lachha Onion Salad", "Desi Ghee Suji Halwa"],
      specialItem: "Paneer Butter Masala & Suji Halwa",
      calories: "700 kcal",
      protein: "25g",
      diet: "veg",
      tags: ["Friday Treat"],
    },
  },
  Saturday: {
    dayName: "Saturday",
    breakfast: {
      name: "Breakfast",
      time: "7:30 AM – 9:30 AM",
      items: ["Methi Thepla / Onion Uttapam with Sambar", "White Butter & Pickle", "Boiled Egg / Fresh Fruit", "Tea & Coffee"],
      specialItem: "Methi Thepla with White Butter",
      calories: "410 kcal",
      protein: "14g",
      diet: "veg",
    },
    lunch: {
      name: "Lunch",
      time: "12:30 PM – 2:30 PM",
      items: ["Mix Veg Dum Biryani Pulao", "Moong Dal Dhuli Tadka", "Aloo Jeera Dry", "Tawa Phulka", "Boondi Raita", "Pickle & Papad"],
      specialItem: "Veg Dum Biryani with Raita",
      calories: "620 kcal",
      protein: "18g",
      diet: "veg",
    },
    snacks: {
      name: "Evening Snacks",
      time: "5:00 PM – 6:30 PM",
      items: ["Mumbai Bhel Puri & Sev Puri / Pao Bhaji", "Cutting Chai", "Cold Coffee"],
      specialItem: "Mumbai Bhel Puri",
      calories: "230 kcal",
      protein: "5g",
      diet: "veg",
    },
    dinner: {
      name: "Dinner",
      time: "7:30 PM – 9:45 PM",
      items: ["Malai Kofta Gravy", "Dal Makhani", "Veg Fried Rice", "Butter Naan / Roti", "Green Salad", "Ice Cream Scoop"],
      specialItem: "Malai Kofta & Ice Cream",
      calories: "730 kcal",
      protein: "22g",
      diet: "veg",
      tags: ["Weekend Special"],
    },
  },
  Sunday: {
    dayName: "Sunday",
    breakfast: {
      name: "Breakfast",
      time: "7:30 AM – 10:00 AM",
      items: ["Amritsari Chole Bhature (Unlimited)", "Crispy Hot Jalebi", "Sweet Patiala Lassi / Cold Milk", "Pickle & Fried Green Chillies"],
      specialItem: "Amritsari Chole Bhature & Jalebi Feast",
      calories: "650 kcal",
      protein: "18g",
      diet: "veg",
      tags: ["Sunday Super Feast", "Special"],
    },
    lunch: {
      name: "Lunch",
      time: "12:30 PM – 2:30 PM",
      items: ["Paneer Do Pyaza", "Dal Maharani", "Hyderabadi Veg Biryani with Mirchi Ka Salan", "Butter Naan & Roti", "Boondi Raita & Salad"],
      specialItem: "Hyderabadi Biryani with Salan",
      calories: "720 kcal",
      protein: "24g",
      diet: "veg",
    },
    snacks: {
      name: "Evening Snacks",
      time: "5:00 PM – 6:30 PM",
      items: ["Kachori with Aloo Sabzi / Sweet Treats", "Masala Chai", "Filter Coffee"],
      specialItem: "Crispy Khasta Kachori",
      calories: "280 kcal",
      protein: "6g",
      diet: "veg",
    },
    dinner: {
      name: "Dinner",
      time: "7:30 PM – 10:00 PM",
      items: ["Shahi Paneer / Special Chicken (Optional)", "Dal Tadka", "Kashmiri Pulao", "Butter Paratha / Naan", "Sirka Pyaz Salad", "Royal Shahi Tukda"],
      specialItem: "Grand Sunday Shahi Feast & Shahi Tukda",
      calories: "790 kcal",
      protein: "28g",
      diet: "veg",
      tags: ["Grand Feast"],
    },
  },
};

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ─── MAIN COMPONENT ───

export default function MessAndCanteenPage() {
  const [activeTab, setActiveTab] = useState<"mess" | "outlets">("mess");
  const [selectedHostelId, setSelectedHostelId] = useState<string>("kurukshetra");
  
  // Auto-detect current weekday
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const defaultDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentDayIndex];
  const [selectedDay, setSelectedDay] = useState<string>(defaultDayName || "Monday");

  const selectedHostel = useMemo(() => {
    return HOSTELS_LIST.find((h) => h.id === selectedHostelId) || HOSTELS_LIST[0];
  }, [selectedHostelId]);

  const currentDayMenu = useMemo(() => {
    return KURUKSHETRA_WEEKLY_MENU[selectedDay] || KURUKSHETRA_WEEKLY_MENU["Monday"];
  }, [selectedDay]);

  // Live status for meal slots
  const getMealStatus = (timeRange: string) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const totalMinutes = currentHour * 60 + currentMin;

    if (timeRange.includes("7:30 AM") && totalMinutes >= 7 * 60 + 30 && totalMinutes <= 9 * 60 + 45) {
      return { status: "Serving Now", color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" };
    }
    if (timeRange.includes("12:30 PM") && totalMinutes >= 12 * 60 + 30 && totalMinutes <= 14 * 60 + 45) {
      return { status: "Serving Now", color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" };
    }
    if (timeRange.includes("5:00 PM") && totalMinutes >= 17 * 60 && totalMinutes <= 18 * 60 + 45) {
      return { status: "Serving Now", color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" };
    }
    if (timeRange.includes("7:30 PM") && totalMinutes >= 19 * 60 + 30 && totalMinutes <= 22 * 60) {
      return { status: "Serving Now", color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" };
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-6 pb-28 md:pb-8">
      {/* ─── Top Header & Mode Toggle ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Mess Menu
              </h1>
              <p className="text-xs text-muted-foreground">
                Hostel Dining Halls & Campus Food Outlets
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher: Hostel Mess vs Campus Cafes */}
        <div className="flex rounded-xl border border-border bg-surface p-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("mess")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "mess"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UtensilsCrossed className="h-3.5 w-3.5" />
            <span>Hostel Mess Menus</span>
          </button>
          <button
            onClick={() => setActiveTab("outlets")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "outlets"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Coffee className="h-3.5 w-3.5" />
            <span>Campus Cafes & Night Canteen</span>
          </button>
        </div>
      </div>

      {activeTab === "mess" ? (
        <div className="space-y-8 animate-fade-up">
          {/* ─── 5 HOSTELS SELECTOR ─── */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Select Hostel
              </span>
              <span className="text-[11px] text-muted-foreground">
                {HOSTELS_LIST.length} Hostels
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {HOSTELS_LIST.map((h) => {
                const isSelected = selectedHostelId === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHostelId(h.id)}
                    className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/30"
                        : "border-border/80 bg-surface/70 hover:border-primary/40 hover:bg-surface"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-lg">
                        {h.id === "kurukshetra"
                          ? "🏛️"
                          : h.id === "kalpana_chawla"
                          ? "🌸"
                          : h.id === "vindhya"
                          ? "🌺"
                          : h.id === "shivalik"
                          ? "⛰️"
                          : "🏔️"}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md ${
                          h.type === "girls"
                            ? "bg-pink-500/15 text-pink-500 border border-pink-500/20"
                            : "bg-blue-500/15 text-blue-500 border border-blue-500/20"
                        }`}
                      >
                        {h.type === "girls" ? "Girls Hostel" : "Boys Hostel"}
                      </span>
                    </div>
                    <strong className="mt-2 text-xs font-bold text-foreground line-clamp-1">
                      {h.name}
                    </strong>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      {h.location}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── KURUKSHETRA HOSTEL MENU VIEW ─── */}
          {selectedHostel.hasMenu ? (
            <div className="space-y-6">
              {/* Selected Hostel Header */}
              <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-background p-5 sm:p-6 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-2xl shadow-inner shrink-0">
                      🏛️
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                          Kurukshetra Hostel Mess
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-500">
                          <Sparkles className="h-3 w-3" />
                          Official Menu Verified
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Weekly 4-Meal Schedule · Breakfast, Lunch, Evening Snacks & Dinner
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>South Campus, Kurukshetra Bhawan</span>
                  </div>
                </div>

                {/* Special Notice Banner */}
                {selectedHostel.specialNotice && (
                  <div className="flex items-start gap-2.5 rounded-2xl border border-primary/20 bg-primary/10 p-3 text-xs text-foreground">
                    <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-[11px] sm:text-xs">
                        {selectedHostel.specialNotice}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 7 Days Weekday Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-bold tracking-tight text-foreground">
                      Weekly Schedule Day
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Today is <strong className="text-primary">{defaultDayName}</strong>
                  </span>
                </div>

                <div className="flex overflow-x-auto gap-2 py-1 scrollbar-none">
                  {DAYS_OF_WEEK.map((day) => {
                    const isSelected = selectedDay === day;
                    const isToday = defaultDayName === day;
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`shrink-0 rounded-2xl px-4 py-2.5 text-left border transition ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow-md glow-primary"
                            : "border-border/80 bg-surface/70 text-muted-foreground hover:bg-surface hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold block">{day}</span>
                          {isToday && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-primary/15 text-primary border border-primary/20"
                              }`}
                            >
                              Today
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4 Meal Cards (Breakfast, Lunch, Snacks, Dinner) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { slot: currentDayMenu.breakfast, icon: "🍳", badge: "Breakfast" },
                  { slot: currentDayMenu.lunch, icon: "🍛", badge: "Lunch" },
                  { slot: currentDayMenu.snacks, icon: "☕", badge: "Evening Snacks" },
                  { slot: currentDayMenu.dinner, icon: "🍲", badge: "Dinner" },
                ].map(({ slot, icon, badge }, idx) => {
                  const liveStatus = getMealStatus(slot.time);
                  return (
                    <div
                      key={idx}
                      className="rounded-3xl border border-border glass p-5 space-y-4 hover:border-primary/40 transition shadow-sm relative overflow-hidden"
                    >
                      {/* Meal Slot Header */}
                      <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-foreground">{slot.name}</h4>
                              {liveStatus && (
                                <span
                                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${liveStatus.color}`}
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  {liveStatus.status}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                              <Clock className="h-3 w-3 text-primary" />
                              <span>{slot.time}</span>
                            </div>
                          </div>
                        </div>

                        {slot.specialItem && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-500 shrink-0">
                            <Sparkles className="h-2.5 w-2.5" />
                            Special
                          </span>
                        )}
                      </div>

                      {/* Food Items List */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                          Menu Items
                        </span>
                        <ul className="space-y-1.5">
                          {slot.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-foreground">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Nutrition & Tags Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/60 text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-3">
                          {slot.calories && (
                            <span className="flex items-center gap-1">
                              <Flame className="h-3 w-3 text-rose-500" />
                              <span>{slot.calories}</span>
                            </span>
                          )}
                          {slot.protein && (
                            <span className="flex items-center gap-1">
                              <Zap className="h-3 w-3 text-amber-500" />
                              <span>{slot.protein} protein</span>
                            </span>
                          )}
                        </div>

                        {slot.tags && (
                          <div className="flex items-center gap-1.5">
                            {slot.tags.map((t, i) => (
                              <span
                                key={i}
                                className="rounded-md border border-border/80 bg-surface px-1.5 py-0.5 text-[9px] font-medium"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* About Kurukshetra Hostel Section */}
              <div className="rounded-3xl border border-border glass p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-base font-bold text-foreground">
                    Kurukshetra Hostel Mess Information
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The Kurukshetra Hostel Mess serves 4 scheduled meals daily. Food is prepared with fresh ingredients, clean RO drinking water, and weekly rotating menus.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="rounded-2xl border border-border bg-surface p-3.5 text-center space-y-1">
                    <span className="text-xl">🥗</span>
                    <p className="text-xs font-bold text-foreground">Fresh Quality Meals</p>
                    <p className="text-[10px] text-muted-foreground">Daily cooked fresh vegetables & quality dairy</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface p-3.5 text-center space-y-1">
                    <span className="text-xl">⏰</span>
                    <p className="text-xs font-bold text-foreground">Punctual Meal Timings</p>
                    <p className="text-[10px] text-muted-foreground">Breakfast, Lunch, Snacks & Dinner served on time</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface p-3.5 text-center space-y-1">
                    <span className="text-xl">✨</span>
                    <p className="text-xs font-bold text-foreground">Sunday Special Feast</p>
                    <p className="text-[10px] text-muted-foreground">Special Chole Bhature breakfast and evening feast</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ─── OTHER HOSTELS: COMING SOON / WAITING FOR OFFICIAL CONFIRMATION ─── */
            <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-surface to-background p-8 sm:p-12 text-center space-y-4 shadow-md animate-in fade-in duration-200">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-amber-500/20 text-amber-500 shadow-inner mx-auto">
                <Clock className="h-8 w-8" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <div className="flex items-center justify-center gap-2">
                  <Building className="h-5 w-5 text-amber-500" />
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {selectedHostel.name} Menu Coming Soon
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mess menu will be added after official confirmation by college administration.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Waiting for officials
                </span>
                <button
                  onClick={() => setSelectedHostelId("kurukshetra")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated transition shadow-sm"
                >
                  View Kurukshetra Hostel Menu &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ─── CAMPUS CAFES & NIGHT CANTEEN VIEW (COMING SOON) ─── */
        <div className="rounded-3xl border border-border glass p-8 sm:p-14 text-center space-y-5 shadow-lg animate-in fade-in duration-200">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-primary/10 text-primary shadow-inner mx-auto">
            <Coffee className="h-8 w-8" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Campus Cafes & Night Canteen
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Online menus and digital pre-ordering for Nescafé, Amul Parlour, and Night Canteens will be available soon.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Coming Soon
            </span>
            <button
              onClick={() => setActiveTab("mess")}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated transition shadow-sm"
            >
              View Hostel Mess Menus &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
