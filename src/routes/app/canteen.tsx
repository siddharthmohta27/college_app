import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Clock,
  Star,
  MapPin,
  Zap,
  CheckCircle,
  AlertCircle,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  Calendar,
  Info,
  ChevronRight,
  ShoppingCart,
  Users,
  Flame,
  ShieldCheck,
  Heart,
  Search,
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

interface HostelMess {
  id: string;
  name: string;
  type: "boys" | "girls";
  tagline: string;
  capacity: number;
  location: string;
  messSecretary: string;
  contact: string;
  specialNotice?: string;
  rating: number;
  reviewsCount: number;
  menu: Record<string, DayMenu>;
}

// ─── HOSTEL MESS DATA (KURUKSHETRA, SHIVALIK, HIMALAYA, KALPANA CHAWLA, VINDHYA) ───

const HOSTEL_MESS_DATA: HostelMess[] = [
  {
    id: "kurukshetra",
    name: "Kurukshetra Hostel",
    type: "boys",
    tagline: "Kurukshetra Bhawan Mess · Premium North Indian & Continental Cycle",
    capacity: 480,
    location: "Kurukshetra Bhawan, South Campus",
    messSecretary: "Aman Sharma (Room 214)",
    contact: "+91 98765 43210",
    specialNotice: "Wednesday Special: South Indian Breakfast | Sunday: Amritsari Chole Bhature & Shahi Feast",
    rating: 4.8,
    reviewsCount: 342,
    menu: {
      Monday: {
        dayName: "Monday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Aloo Onion Stuffed Paratha", "Fresh Curd (Dahi)", "Mixed Pickle & Amul Butter", "Boiled Eggs (2 pcs) / Banana", "Hot Adrak Chai / Filter Coffee / Warm Milk"],
          specialItem: "Stuffed Aloo Paratha with White Butter",
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
          items: ["Indori Poha with Roasted Peanuts & Sev", "Crispy Veg Cutlet", "Brown / White Bread Toast with Butter & Mixed Fruit Jam", "Boiled Egg / Fresh Apple", "Hot Tea & Milk"],
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
          items: ["Matar Paneer / Egg Curry (Optional for Egg eaters)", "Chana Dal Fry", "Steamed Basmati Rice", "Tawa Butter Roti", "Green Salad", "Warm Sewaiyan Kheer"],
          specialItem: "Matar Paneer / Egg Curry & Kheer",
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
          items: ["Paneer & Gobhi Stuffed Paratha", "Pudina Dahi", "Butter & Mixed Pickle", "Sprouted Moong Salad", "Hot Tea & Bournvita Milk"],
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
          items: ["Vegetable Rava Upma with Coconut Chutney", "Pav Bhaji (Fresh Butter Pav)", "Boiled Eggs / Sweet Banana", "Toast Butter Jam", "Adrak Chai & Milk"],
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
          items: ["Masala Maggi Noodles / Red Sauce Pasta", "Hot Nescafe Coffee", "Ginger Tea"],
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
          items: ["Malai Kofta Gravy", "Dal Makhani", "Veg Fried Rice", "Butter Naan / Roti", "Green Salad", "Vanilla / Chocolate Ice Cream Scoop"],
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
          items: ["Shahi Paneer / Chicken Curry (Special Counter)", "Dal Tadka", "Kashmiri Pulao", "Butter Paratha / Naan", "Sirka Pyaz Salad", "Royal Shahi Tukda / Moong Dal Halwa"],
          specialItem: "Grand Sunday Shahi Feast & Shahi Tukda",
          calories: "790 kcal",
          protein: "28g",
          diet: "veg",
          tags: ["Grand Feast"],
        },
      },
    },
  },
  {
    id: "shivalik",
    name: "Shivalik Hostel",
    type: "boys",
    tagline: "Shivalik Bhawan · 1st Year Freshers & Hosteller Dining Hall",
    capacity: 520,
    location: "Shivalik Bhawan, Near Sports Complex",
    messSecretary: "Rohan Verma (Room 108)",
    contact: "+91 98765 43211",
    specialNotice: "Designated Hosteller Boys Lunch Mess for Orientation 2026 as per Annexure 2.",
    rating: 4.7,
    reviewsCount: 289,
    menu: {
      Monday: {
        dayName: "Monday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Aloo Paratha with Curd", "White Butter & Mixed Pickle", "Boiled Egg / Banana", "Tea, Coffee, Warm Milk"],
          specialItem: "Fresh Tawa Aloo Paratha",
          calories: "440 kcal",
          protein: "13g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Rajma Masala", "Basmati Rice", "Aloo Beans Sabzi", "Tawa Butter Roti", "Boondi Raita & Salad"],
          specialItem: "Homestyle Rajma Chawal",
          calories: "600 kcal",
          protein: "21g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Crisp Samosa with Chutney", "Masala Chai", "Hot Coffee"],
          specialItem: "Hot Samosa",
          calories: "270 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Matar Paneer", "Moong Dal Tadka", "Jeera Rice", "Butter Roti", "Salad", "Gulab Jamun"],
          specialItem: "Matar Paneer & Hot Gulab Jamun",
          calories: "660 kcal",
          protein: "23g",
          diet: "veg",
        },
      },
      Tuesday: {
        dayName: "Tuesday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Poha with Peanuts & Sev", "Bread Butter Jam", "Boiled Egg / Apple", "Tea & Milk"],
          specialItem: "Fresh Veg Poha",
          calories: "380 kcal",
          protein: "11g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Kadi Pakora", "Steamed Rice", "Aloo Gobhi", "Roti", "Papad & Salad"],
          specialItem: "Punjabi Kadi Pakora",
          calories: "570 kcal",
          protein: "17g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Bread Roll with Sauce", "Ginger Tea"],
          specialItem: "Stuffed Bread Roll",
          calories: "230 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Shahi Paneer", "Dal Makhani", "Rice", "Phulka Roti", "Custard"],
          specialItem: "Shahi Paneer & Custard",
          calories: "690 kcal",
          protein: "25g",
          diet: "veg",
        },
      },
      Wednesday: {
        dayName: "Wednesday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Idli Sambhar & Coconut Chutney", "Medu Vada", "Boiled Egg", "Filter Coffee"],
          specialItem: "Hot Idli Vada Sambhar",
          calories: "410 kcal",
          protein: "14g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Chole Bhature / Poori", "Jeera Rice", "Raita", "Green Salad"],
          specialItem: "Amritsari Chole with Rice & Poori",
          calories: "680 kcal",
          protein: "19g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Mix Pakora with Chutney", "Masala Chai"],
          specialItem: "Crispy Pakora",
          calories: "290 kcal",
          protein: "7g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Kadhai Paneer", "Dal Fry", "Rice", "Roti", "Sewaiyan Kheer"],
          specialItem: "Kadhai Paneer & Kheer",
          calories: "650 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Thursday: {
        dayName: "Thursday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Gobhi Paratha with Curd", "Butter & Pickle", "Tea & Milk"],
          specialItem: "Gobhi Paratha",
          calories: "430 kcal",
          protein: "12g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Dal Tadka", "Louki Kofta", "Rice", "Phulka Roti", "Salad & Raita"],
          specialItem: "Dal Tadka & Kofta",
          calories: "550 kcal",
          protein: "16g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Veg Sandwich", "Cardamom Tea"],
          specialItem: "Veg Sandwich",
          calories: "210 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Palak Paneer", "Masoor Dal", "Peas Pulao", "Roti", "Rasgulla"],
          specialItem: "Palak Paneer & Rasgulla",
          calories: "630 kcal",
          protein: "22g",
          diet: "veg",
        },
      },
      Friday: {
        dayName: "Friday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Pav Bhaji", "Bread Butter", "Tea & Milk", "Boiled Egg"],
          specialItem: "Pav Bhaji",
          calories: "420 kcal",
          protein: "12g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Dum Aloo", "Panchmel Dal", "Rice", "Roti", "Papad & Salad"],
          specialItem: "Dum Aloo Kashmiri",
          calories: "590 kcal",
          protein: "18g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Masala Maggi", "Coffee & Tea"],
          specialItem: "Masala Maggi",
          calories: "280 kcal",
          protein: "6g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Paneer Butter Masala", "Chana Dal", "Rice", "Roti", "Suji Halwa"],
          specialItem: "Paneer Butter Masala & Halwa",
          calories: "690 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Saturday: {
        dayName: "Saturday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Thepla with Pickle", "Curd & Butter", "Tea & Milk"],
          specialItem: "Methi Thepla",
          calories: "400 kcal",
          protein: "13g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Veg Biryani Pulao", "Moong Dal", "Aloo Jeera", "Raita & Salad"],
          specialItem: "Veg Biryani & Raita",
          calories: "610 kcal",
          protein: "17g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Bhel Puri", "Cutting Chai"],
          specialItem: "Bhel Puri",
          calories: "220 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Malai Kofta", "Dal Makhani", "Fried Rice", "Butter Roti", "Ice Cream"],
          specialItem: "Malai Kofta & Ice Cream",
          calories: "710 kcal",
          protein: "21g",
          diet: "veg",
        },
      },
      Sunday: {
        dayName: "Sunday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 10:00 AM",
          items: ["Chole Bhature", "Sweet Lassi", "Jalebi", "Pickle"],
          specialItem: "Sunday Chole Bhature & Jalebi",
          calories: "640 kcal",
          protein: "17g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Paneer Do Pyaza", "Dal Maharani", "Biryani Rice", "Butter Naan", "Salad"],
          specialItem: "Paneer Do Pyaza Feast",
          calories: "700 kcal",
          protein: "23g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Khasta Kachori", "Tea & Coffee"],
          specialItem: "Kachori with Aloo Sabzi",
          calories: "270 kcal",
          protein: "6g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 10:00 PM",
          items: ["Shahi Paneer", "Dal Tadka", "Pulao Rice", "Butter Paratha", "Shahi Tukda"],
          specialItem: "Sunday Shahi Dinner & Shahi Tukda",
          calories: "770 kcal",
          protein: "27g",
          diet: "veg",
        },
      },
    },
  },
  {
    id: "himalaya",
    name: "Himalaya Hostel",
    type: "boys",
    tagline: "Himalaya Bhawan · North Campus Boys Mess",
    capacity: 450,
    location: "Himalaya Bhawan, North Block",
    messSecretary: "Sahil Gupta (Room 304)",
    contact: "+91 98765 43212",
    specialNotice: "Multi-counter hot food serving with student night canteen facility.",
    rating: 4.6,
    reviewsCount: 260,
    menu: {
      Monday: {
        dayName: "Monday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Aloo Onion Paratha", "Fresh Curd", "Butter & Pickle", "Tea & Milk"],
          specialItem: "Crispy Aloo Paratha",
          calories: "440 kcal",
          protein: "13g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Rajma Masala", "Steamed Rice", "Mix Veg", "Roti", "Raita & Salad"],
          specialItem: "Rajma Chawal",
          calories: "610 kcal",
          protein: "21g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Hot Samosa with Saunth", "Masala Chai"],
          specialItem: "Samosa Chai",
          calories: "280 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Kadhai Paneer", "Yellow Dal", "Jeera Rice", "Roti", "Gulab Jamun"],
          specialItem: "Kadhai Paneer & Gulab Jamun",
          calories: "670 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Tuesday: {
        dayName: "Tuesday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Poha with Sev", "Cutlet", "Bread Butter", "Tea"],
          specialItem: "Poha & Cutlet",
          calories: "390 kcal",
          protein: "11g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Kadi Pakora", "Rice", "Aloo Gobhi", "Roti", "Papad"],
          specialItem: "Kadi Chawal",
          calories: "580 kcal",
          protein: "17g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Bread Roll", "Chai"],
          specialItem: "Crisp Bread Roll",
          calories: "230 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Shahi Paneer", "Dal Makhani", "Pulao", "Roti", "Custard"],
          specialItem: "Dal Makhani & Custard",
          calories: "700 kcal",
          protein: "25g",
          diet: "veg",
        },
      },
      Wednesday: {
        dayName: "Wednesday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Idli Sambhar", "Vada", "Chutneys", "Filter Coffee"],
          specialItem: "Idli Sambhar Vada",
          calories: "410 kcal",
          protein: "14g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Chole Bhature", "Jeera Rice", "Bhindi", "Raita"],
          specialItem: "Amritsari Chole",
          calories: "680 kcal",
          protein: "19g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Veg Pakoras", "Masala Chai"],
          specialItem: "Pakora Platter",
          calories: "300 kcal",
          protein: "7g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Matar Paneer", "Dal Fry", "Rice", "Roti", "Kheer"],
          specialItem: "Matar Paneer & Kheer",
          calories: "660 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Thursday: {
        dayName: "Thursday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Paneer Paratha", "Curd", "Butter", "Tea"],
          specialItem: "Paneer Paratha",
          calories: "450 kcal",
          protein: "17g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Dal Tadka", "Louki Kofta", "Rice", "Roti", "Raita"],
          specialItem: "Dal Tadka & Kofta",
          calories: "560 kcal",
          protein: "16g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Grilled Sandwich", "Tea"],
          specialItem: "Grilled Sandwich",
          calories: "220 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Palak Paneer", "Masoor Dal", "Pulao", "Roti", "Rasgulla"],
          specialItem: "Palak Paneer & Rasgulla",
          calories: "640 kcal",
          protein: "22g",
          diet: "veg",
        },
      },
      Friday: {
        dayName: "Friday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Pav Bhaji", "Bread Toast", "Tea & Milk"],
          specialItem: "Pav Bhaji",
          calories: "420 kcal",
          protein: "12g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Dum Aloo", "Panchmel Dal", "Rice", "Roti", "Salad"],
          specialItem: "Dum Aloo & Dal",
          calories: "600 kcal",
          protein: "18g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Masala Maggi", "Coffee"],
          specialItem: "Hot Maggi",
          calories: "280 kcal",
          protein: "6g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Paneer Butter Masala", "Chana Dal", "Rice", "Roti", "Halwa"],
          specialItem: "Paneer Butter Masala & Halwa",
          calories: "700 kcal",
          protein: "25g",
          diet: "veg",
        },
      },
      Saturday: {
        dayName: "Saturday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Methi Thepla", "White Butter", "Tea & Milk"],
          specialItem: "Thepla Butter",
          calories: "400 kcal",
          protein: "13g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Veg Biryani", "Moong Dal", "Aloo Jeera", "Raita"],
          specialItem: "Biryani & Raita",
          calories: "620 kcal",
          protein: "17g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Bhel Puri", "Chai"],
          specialItem: "Bhel Puri",
          calories: "230 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Malai Kofta", "Dal Makhani", "Fried Rice", "Roti", "Ice Cream"],
          specialItem: "Malai Kofta & Ice Cream",
          calories: "720 kcal",
          protein: "22g",
          diet: "veg",
        },
      },
      Sunday: {
        dayName: "Sunday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 10:00 AM",
          items: ["Chole Bhature", "Lassi", "Jalebi", "Pickle"],
          specialItem: "Sunday Feast",
          calories: "650 kcal",
          protein: "18g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Paneer Do Pyaza", "Dal Maharani", "Biryani Rice", "Naan"],
          specialItem: "Paneer Biryani Feast",
          calories: "710 kcal",
          protein: "24g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Kachori with Sabzi", "Chai"],
          specialItem: "Khasta Kachori",
          calories: "280 kcal",
          protein: "6g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 10:00 PM",
          items: ["Shahi Paneer", "Dal Tadka", "Pulao", "Butter Paratha", "Shahi Tukda"],
          specialItem: "Shahi Dinner & Shahi Tukda",
          calories: "780 kcal",
          protein: "27g",
          diet: "veg",
        },
      },
    },
  },
  {
    id: "kalpana_chawla",
    name: "Kalpana Chawla Hostel",
    type: "girls",
    tagline: "Kalpana Chawla Bhawan (KCH) · Girls Hostel Dining Hall",
    capacity: 490,
    location: "KCH Block, East Campus",
    messSecretary: "Pooja Singhal (Room 112)",
    contact: "+91 98765 43213",
    specialNotice: "Designated Hosteller Girls Lunch Mess for Orientation 2026 as per Annexure 2.",
    rating: 4.9,
    reviewsCount: 315,
    menu: {
      Monday: {
        dayName: "Monday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Aloo Paneer Paratha", "Fresh Curd", "Butter & Pickle", "Boiled Egg / Banana", "Hot Tea & Milk"],
          specialItem: "Aloo Paneer Paratha with Curd",
          calories: "430 kcal",
          protein: "15g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Punjabi Rajma", "Steamed Rice", "Mix Veg Sabzi", "Tawa Butter Roti", "Boondi Raita & Salad"],
          specialItem: "Punjabi Rajma Chawal",
          calories: "590 kcal",
          protein: "20g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Cocktail Samosa with Mint Chutney", "Ginger Tea & Coffee"],
          specialItem: "Hot Samosa with Chutney",
          calories: "260 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Kadhai Paneer", "Moong Dal Tadka", "Jeera Rice", "Roti", "Fresh Gulab Jamun"],
          specialItem: "Kadhai Paneer & Gulab Jamun",
          calories: "650 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Tuesday: {
        dayName: "Tuesday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Poha with Peanuts", "Veg Cutlet", "Toast Jam", "Tea & Milk"],
          specialItem: "Indori Poha",
          calories: "380 kcal",
          protein: "11g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Kadi Pakora", "Rice", "Aloo Gobhi", "Roti", "Papad & Salad"],
          specialItem: "Kadi Pakora with Papad",
          calories: "560 kcal",
          protein: "17g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Bread Roll", "Masala Chai"],
          specialItem: "Crisp Bread Roll",
          calories: "230 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Shahi Paneer", "Dal Makhani", "Veg Pulao", "Roti", "Fruit Custard"],
          specialItem: "Dal Makhani & Custard",
          calories: "680 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Wednesday: {
        dayName: "Wednesday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Idli Sambhar (Steamed)", "Medu Vada", "Coconut Chutney", "Filter Coffee"],
          specialItem: "South Indian Idli Sambhar",
          calories: "400 kcal",
          protein: "14g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Chole Poori / Bhature", "Jeera Rice", "Bhindi Masala", "Raita"],
          specialItem: "Amritsari Chole Bhature",
          calories: "670 kcal",
          protein: "19g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Mix Veg Pakora", "Mint Chutney & Chai"],
          specialItem: "Crispy Pakora",
          calories: "290 kcal",
          protein: "7g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Matar Paneer", "Dal Fry", "Rice", "Roti", "Sewaiyan Kheer"],
          specialItem: "Matar Paneer & Kheer",
          calories: "650 kcal",
          protein: "23g",
          diet: "veg",
        },
      },
      Thursday: {
        dayName: "Thursday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Gobhi Paratha", "Mint Dahi", "Butter & Pickle", "Tea & Milk"],
          specialItem: "Gobhi Paratha with Curd",
          calories: "430 kcal",
          protein: "13g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Dal Tadka", "Louki Kofta", "Rice", "Roti", "Raita & Salad"],
          specialItem: "Dal Tadka & Kofta",
          calories: "550 kcal",
          protein: "16g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Veg Grilled Sandwich", "Tea & Coffee"],
          specialItem: "Grilled Veg Sandwich",
          calories: "210 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Palak Paneer", "Masoor Dal", "Peas Pulao", "Roti", "Spongy Rasgulla"],
          specialItem: "Palak Paneer & Rasgulla",
          calories: "630 kcal",
          protein: "22g",
          diet: "veg",
        },
      },
      Friday: {
        dayName: "Friday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Pav Bhaji", "Bread Toast", "Tea & Milk", "Fresh Fruit"],
          specialItem: "Bombay Pav Bhaji",
          calories: "420 kcal",
          protein: "12g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Dum Aloo", "Panchmel Dal", "Rice", "Roti", "Papad & Salad"],
          specialItem: "Dum Aloo Kashmiri",
          calories: "590 kcal",
          protein: "18g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Masala Maggi / White Sauce Pasta", "Hot Coffee"],
          specialItem: "Masala Maggi & Pasta",
          calories: "280 kcal",
          protein: "6g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Paneer Butter Masala", "Chana Dal", "Rice", "Roti", "Suji Halwa"],
          specialItem: "Paneer Butter Masala & Halwa",
          calories: "690 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Saturday: {
        dayName: "Saturday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Methi Thepla", "White Butter", "Tea & Milk"],
          specialItem: "Thepla with White Butter",
          calories: "390 kcal",
          protein: "12g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Veg Biryani Pulao", "Moong Dal", "Aloo Jeera", "Raita"],
          specialItem: "Veg Dum Biryani",
          calories: "600 kcal",
          protein: "17g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Bhel Puri & Sev Puri", "Cutting Chai"],
          specialItem: "Bhel Puri",
          calories: "220 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Malai Kofta", "Dal Makhani", "Fried Rice", "Roti", "Ice Cream"],
          specialItem: "Malai Kofta & Ice Cream",
          calories: "700 kcal",
          protein: "21g",
          diet: "veg",
        },
      },
      Sunday: {
        dayName: "Sunday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 10:00 AM",
          items: ["Amritsari Chole Bhature", "Sweet Lassi", "Hot Jalebi"],
          specialItem: "Sunday Chole Bhature & Jalebi",
          calories: "630 kcal",
          protein: "17g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Paneer Do Pyaza", "Dal Maharani", "Biryani Rice", "Butter Naan", "Salad"],
          specialItem: "Paneer Biryani Feast",
          calories: "690 kcal",
          protein: "23g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Khasta Kachori", "Tea & Coffee"],
          specialItem: "Kachori with Aloo Sabzi",
          calories: "270 kcal",
          protein: "6g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 10:00 PM",
          items: ["Shahi Paneer", "Dal Tadka", "Pulao", "Butter Paratha", "Shahi Tukda"],
          specialItem: "Shahi Dinner & Shahi Tukda",
          calories: "760 kcal",
          protein: "26g",
          diet: "veg",
        },
      },
    },
  },
  {
    id: "vindhya",
    name: "Vindhya Hostel",
    type: "boys",
    tagline: "Vindhya Bhawan · Senior Boys Hostel Dining Hall",
    capacity: 460,
    location: "Vindhya Bhawan, West Campus",
    messSecretary: "Harshil Mehra (Room 201)",
    contact: "+91 98765 43214",
    specialNotice: "Spacious dining hall with hygienic buffet service and RO drinking water.",
    rating: 4.7,
    reviewsCount: 245,
    menu: {
      Monday: {
        dayName: "Monday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Aloo Paratha with Curd", "Butter & Pickle", "Boiled Egg / Banana", "Tea & Milk"],
          specialItem: "Aloo Paratha",
          calories: "440 kcal",
          protein: "13g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Rajma Masala", "Steamed Rice", "Mix Veg", "Roti", "Raita & Salad"],
          specialItem: "Rajma Chawal",
          calories: "600 kcal",
          protein: "21g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Samosa with Chutney", "Chai"],
          specialItem: "Samosa",
          calories: "270 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Kadhai Paneer", "Yellow Dal", "Rice", "Roti", "Gulab Jamun"],
          specialItem: "Kadhai Paneer & Gulab Jamun",
          calories: "660 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Tuesday: {
        dayName: "Tuesday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Poha with Sev", "Cutlet", "Bread Butter", "Tea"],
          specialItem: "Poha",
          calories: "380 kcal",
          protein: "11g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Kadi Pakora", "Rice", "Aloo Gobhi", "Roti", "Papad"],
          specialItem: "Kadi Chawal",
          calories: "570 kcal",
          protein: "17g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Bread Roll", "Chai"],
          specialItem: "Bread Roll",
          calories: "230 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Shahi Paneer", "Dal Makhani", "Pulao", "Roti", "Custard"],
          specialItem: "Dal Makhani & Custard",
          calories: "690 kcal",
          protein: "25g",
          diet: "veg",
        },
      },
      Wednesday: {
        dayName: "Wednesday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Idli Sambhar", "Vada", "Coconut Chutney", "Filter Coffee"],
          specialItem: "Idli Sambhar",
          calories: "410 kcal",
          protein: "14g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Chole Bhature", "Jeera Rice", "Bhindi", "Raita"],
          specialItem: "Chole Bhature",
          calories: "680 kcal",
          protein: "19g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Veg Pakora", "Chai"],
          specialItem: "Pakora",
          calories: "290 kcal",
          protein: "7g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Matar Paneer", "Dal Fry", "Rice", "Roti", "Kheer"],
          specialItem: "Matar Paneer & Kheer",
          calories: "650 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Thursday: {
        dayName: "Thursday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Paneer Paratha", "Curd", "Butter", "Tea"],
          specialItem: "Paneer Paratha",
          calories: "440 kcal",
          protein: "16g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Dal Tadka", "Louki Kofta", "Rice", "Roti", "Raita"],
          specialItem: "Dal Tadka",
          calories: "550 kcal",
          protein: "16g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Sandwich", "Tea"],
          specialItem: "Sandwich",
          calories: "210 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Palak Paneer", "Masoor Dal", "Pulao", "Roti", "Rasgulla"],
          specialItem: "Palak Paneer & Rasgulla",
          calories: "630 kcal",
          protein: "22g",
          diet: "veg",
        },
      },
      Friday: {
        dayName: "Friday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Pav Bhaji", "Bread Toast", "Tea & Milk"],
          specialItem: "Pav Bhaji",
          calories: "420 kcal",
          protein: "12g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Dum Aloo", "Panchmel Dal", "Rice", "Roti", "Salad"],
          specialItem: "Dum Aloo",
          calories: "590 kcal",
          protein: "18g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Masala Maggi", "Coffee"],
          specialItem: "Maggi",
          calories: "280 kcal",
          protein: "6g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Paneer Butter Masala", "Chana Dal", "Rice", "Roti", "Halwa"],
          specialItem: "Paneer Butter Masala & Halwa",
          calories: "690 kcal",
          protein: "24g",
          diet: "veg",
        },
      },
      Saturday: {
        dayName: "Saturday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 9:30 AM",
          items: ["Thepla", "Butter", "Tea & Milk"],
          specialItem: "Thepla",
          calories: "400 kcal",
          protein: "13g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Veg Biryani", "Moong Dal", "Aloo Jeera", "Raita"],
          specialItem: "Biryani & Raita",
          calories: "610 kcal",
          protein: "17g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Bhel Puri", "Chai"],
          specialItem: "Bhel Puri",
          calories: "220 kcal",
          protein: "5g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 9:45 PM",
          items: ["Malai Kofta", "Dal Makhani", "Fried Rice", "Roti", "Ice Cream"],
          specialItem: "Malai Kofta & Ice Cream",
          calories: "710 kcal",
          protein: "21g",
          diet: "veg",
        },
      },
      Sunday: {
        dayName: "Sunday",
        breakfast: {
          name: "Breakfast",
          time: "7:30 AM – 10:00 AM",
          items: ["Chole Bhature", "Lassi", "Jalebi", "Pickle"],
          specialItem: "Sunday Feast",
          calories: "640 kcal",
          protein: "18g",
          diet: "veg",
        },
        lunch: {
          name: "Lunch",
          time: "12:30 PM – 2:30 PM",
          items: ["Paneer Do Pyaza", "Dal Maharani", "Biryani Rice", "Naan"],
          specialItem: "Paneer Biryani Feast",
          calories: "700 kcal",
          protein: "23g",
          diet: "veg",
        },
        snacks: {
          name: "Evening Snacks",
          time: "5:00 PM – 6:30 PM",
          items: ["Khasta Kachori", "Chai"],
          specialItem: "Kachori",
          calories: "270 kcal",
          protein: "6g",
          diet: "veg",
        },
        dinner: {
          name: "Dinner",
          time: "7:30 PM – 10:00 PM",
          items: ["Shahi Paneer", "Dal Tadka", "Pulao", "Butter Paratha", "Shahi Tukda"],
          specialItem: "Shahi Dinner & Shahi Tukda",
          calories: "770 kcal",
          protein: "27g",
          diet: "veg",
        },
      },
    },
  },
];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ─── CAMPUS CAFES & OUTLETS DATA (OPTIONAL SECONDARY VIEW) ───

type CafeItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  diet: DietType;
  calories: string;
  protein: string;
  rating: number;
  isSpecial?: boolean;
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
  menu: CafeItem[];
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
      { id: 101, name: "Classic Nescafé Coffee", description: "Smooth hot coffee with milk, perfect for early mornings", price: 20, diet: "veg", calories: "80 kcal", protein: "2g", rating: 4.7, isSpecial: true },
      { id: 102, name: "Cappuccino", description: "Rich espresso topped with creamy frothed milk", price: 40, diet: "veg", calories: "120 kcal", protein: "4g", rating: 4.5 },
      { id: 103, name: "Cold Coffee", description: "Chilled blended coffee with ice cream", price: 50, diet: "veg", calories: "210 kcal", protein: "5g", rating: 4.8, isSpecial: true },
      { id: 104, name: "Veg Cheese Sandwich", description: "Grilled brown bread with fresh cucumbers, tomatoes & cheese", price: 60, diet: "veg", calories: "280 kcal", protein: "8g", rating: 4.4 },
      { id: 105, name: "Maggi Masala", description: "Classic 2-minute noodles with mixed vegetables", price: 35, diet: "veg", calories: "310 kcal", protein: "6g", rating: 4.9, isSpecial: true },
    ],
  },
  {
    id: "amul",
    name: "Amul Parlour",
    emoji: "🍦",
    location: "Near Main Library",
    openTime: "8:00 AM",
    closeTime: "10:00 PM",
    waitMinutes: 3,
    rating: 4.8,
    totalReviews: 480,
    isOpen: true,
    tagline: "Ice creams, dairy products, shakes & quick bites",
    menu: [
      { id: 201, name: "Amul Cool Flavoured Milk", description: "Kesar, Elaichi, Badam or Pista flavour", price: 30, diet: "veg", calories: "150 kcal", protein: "7g", rating: 4.7 },
      { id: 202, name: "Amul Butter Pav Bhaji", description: "Loaded with pure Amul butter and spices", price: 70, diet: "veg", calories: "420 kcal", protein: "10g", rating: 4.8, isSpecial: true },
      { id: 203, name: "Cheese Pizza (Single)", description: "Topped with Amul mozzarella and capsicum", price: 90, diet: "veg", calories: "480 kcal", protein: "14g", rating: 4.6 },
    ],
  },
  {
    id: "night_canteen",
    name: "Night Canteen",
    emoji: "🌙",
    location: "Behind Kurukshetra Hostel",
    openTime: "10:00 PM",
    closeTime: "3:00 AM",
    waitMinutes: 10,
    rating: 4.9,
    totalReviews: 520,
    isOpen: true,
    tagline: "Late night cravings, egg rolls, parathas & shakes",
    menu: [
      { id: 301, name: "Double Egg Roll", description: "Flaky paratha with 2 eggs, onions, and sauces", price: 60, diet: "egg", calories: "380 kcal", protein: "16g", rating: 4.9, isSpecial: true },
      { id: 302, name: "Aloo Cheese Paratha", description: "Served with butter and hot tea", price: 50, diet: "veg", calories: "390 kcal", protein: "9g", rating: 4.8 },
      { id: 303, name: "Oreo Shake", description: "Thick creamy chocolate shake with Oreo crush", price: 65, diet: "veg", calories: "340 kcal", protein: "6g", rating: 4.7 },
    ],
  },
];

// ─── MAIN COMPONENT ───

export default function MessAndCanteenPage() {
  const [activeTab, setActiveTab] = useState<"mess" | "outlets">("mess");
  const [selectedHostelId, setSelectedHostelId] = useState<string>("kurukshetra");
  
  // Auto-detect current weekday
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const defaultDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentDayIndex];
  const [selectedDay, setSelectedDay] = useState<string>(defaultDayName || "Monday");

  // Outlets view state
  const [activeShopId, setActiveShopId] = useState("nescafe");
  const [dietFilter, setDietFilter] = useState<"all" | DietType>("all");
  const [cart, setCart] = useState<number[]>([]);

  const selectedHostel = useMemo(() => {
    return HOSTEL_MESS_DATA.find((h) => h.id === selectedHostelId) || HOSTEL_MESS_DATA[0];
  }, [selectedHostelId]);

  const currentDayMenu = useMemo(() => {
    return selectedHostel.menu[selectedDay] || selectedHostel.menu["Monday"];
  }, [selectedHostel, selectedDay]);

  const shop = SHOPS.find((s) => s.id === activeShopId)!;

  const toggleCart = (id: number) =>
    setCart((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

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
                Select Hostel Dining Hall
              </span>
              <span className="text-[11px] text-muted-foreground">
                {HOSTEL_MESS_DATA.length} Hostels Available
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {HOSTEL_MESS_DATA.map((h) => {
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
                          : h.id === "shivalik"
                          ? "⛰️"
                          : h.id === "himalaya"
                          ? "🏔️"
                          : "🌲"}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md ${
                          h.type === "girls"
                            ? "bg-pink-500/15 text-pink-500"
                            : "bg-blue-500/15 text-blue-500"
                        }`}
                      >
                        {h.type}
                      </span>
                    </div>
                    <strong className="mt-2 text-xs font-bold text-foreground line-clamp-1">
                      {h.name}
                    </strong>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      ~{h.capacity} Students
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── SELECTED HOSTEL HERO / KURUKSHETRA HIGHLIGHT CARD ─── */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-background p-5 sm:p-6 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-2xl shadow-inner shrink-0">
                  {selectedHostel.id === "kurukshetra"
                    ? "🏛️"
                    : selectedHostel.id === "kalpana_chawla"
                    ? "🌸"
                    : selectedHostel.id === "shivalik"
                    ? "⛰️"
                    : selectedHostel.id === "himalaya"
                    ? "🏔️"
                    : "🌲"}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      {selectedHostel.name} Mess
                    </h2>
                    {selectedHostel.id === "kurukshetra" && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-500">
                        <Sparkles className="h-3 w-3" />
                        Featured Menu
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedHostel.tagline}
                  </p>
                </div>
              </div>

              {/* Rating & Capacity */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold">{selectedHostel.rating}</span>
                  <span className="text-muted-foreground">({selectedHostel.reviewsCount})</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  <span>{selectedHostel.capacity} Residents</span>
                </div>
              </div>
            </div>

            {/* Special Notice Banner if available */}
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

            {/* Info Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground border-t border-border/60">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>{selectedHostel.location}</span>
              </div>
              <div>·</div>
              <div>
                Secretary: <strong className="text-foreground">{selectedHostel.messSecretary}</strong>
              </div>
              <div className="hidden sm:block">·</div>
              <div className="hidden sm:block">
                Helpline: <span className="font-mono text-primary">{selectedHostel.contact}</span>
              </div>
            </div>
          </div>

          {/* ─── 7 DAYS WEEKDAY SELECTOR ─── */}
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

          {/* ─── 4 MEAL CARDS (BREAKFAST, LUNCH, SNACKS, DINNER) ─── */}
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

          {/* ─── ABOUT KURUKSHETRA HOSTEL MESS SECTION ─── */}
          {selectedHostel.id === "kurukshetra" && (
            <div className="rounded-3xl border border-border glass p-6 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <h3 className="text-base font-bold text-foreground">
                  About Kurukshetra Hostel Mess Standards
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The Kurukshetra Hostel Mess is managed democratically by the elected Student Mess Committee and faculty wardens. Food is prepared in ultra-hygienic automated kitchens with daily nutrition tracking, RO filtered drinking water, hot milk/tea counters, and curated regional specialties from across India.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-2xl border border-border bg-surface p-3.5 text-center space-y-1">
                  <span className="text-xl">🥗</span>
                  <p className="text-xs font-bold text-foreground">Fresh Quality Ingredients</p>
                  <p className="text-[10px] text-muted-foreground">Daily farm-fresh veggies & Amul certified dairy</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-3.5 text-center space-y-1">
                  <span className="text-xl">⏰</span>
                  <p className="text-xs font-bold text-foreground">Punctual Serving Times</p>
                  <p className="text-[10px] text-muted-foreground">4 meals a day with zero delays for class rush</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-3.5 text-center space-y-1">
                  <span className="text-xl">📝</span>
                  <p className="text-xs font-bold text-foreground">Weekly Menu Reviews</p>
                  <p className="text-[10px] text-muted-foreground">Feedback directly implemented every Sunday meeting</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ─── CAMPUS CAFES & NIGHT CANTEEN VIEW ─── */
        <div className="space-y-6 animate-fade-up">
          {/* Shop Selector Cards */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {SHOPS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveShopId(s.id);
                  setDietFilter("all");
                }}
                className={`flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 transition-all min-w-24 ${
                  activeShopId === s.id
                    ? "border-primary bg-primary/10 text-foreground shadow-sm ring-1 ring-primary/30"
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
          <div className="rounded-2xl border border-border glass p-5 space-y-4">
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

              <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="text-sm font-bold">{shop.rating}</span>
                <span className="text-xs text-muted-foreground">({shop.totalReviews})</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2 border-t border-border/60 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>{shop.openTime} – {shop.closeTime}</span>
              </div>
              <div>·</div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>~{shop.waitMinutes} min wait</span>
              </div>
              <div>·</div>
              <div className="flex items-center gap-1.5">
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

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shop.menu.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border glass p-4 space-y-3 flex flex-col justify-between hover:border-primary/40 transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-foreground">{item.name}</h4>
                    <span className="font-mono text-sm font-bold text-primary">₹{item.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{item.calories}</span>
                    <span>·</span>
                    <span>{item.protein}</span>
                  </div>
                  <button
                    onClick={() => toggleCart(item.id)}
                    className={`rounded-xl px-3 py-1 text-xs font-semibold transition ${
                      cart.includes(item.id)
                        ? "bg-emerald-500 text-white"
                        : "border border-border bg-surface hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {cart.includes(item.id) ? "Added ✓" : "Pre-order"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
