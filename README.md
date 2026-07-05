# ⚡ Campus Connect

Campus Connect is a premium, high-contrast **Black + Yellow** student companion application designed to centralize and supercharge college life. It replaces disconnected messaging channels, spreadsheets, and physical flyers with a single unified, modern app.

---

## 🎨 Brand Identity & Visual Theme
The application features a bold, premium, high-contrast **matte black and vibrant gold/yellow** aesthetic. It moves away from soft colorful gradients to present a sharp, clean, high-performance visual style designed to look outstanding on both desktop and mobile screens.

---

## 🚀 Key Features

### 1. 📊 Dashboard
- Welcome card displaying student details, CGPA, and exam countdowns.
- Announcements feed categorizing critical dates (Exams, Holidays, Fees).
- "Trending on Campus" section highlighting active campus threads.

### 2. 🛒 Student Marketplace
- Categorized peer-to-peer marketplace (Books, Electronics, Dorm Gear, Tickets).
- Active listings showing item condition, price, seller location, and rating.
- Simple pop-up modal to list new items instantly.

### 3. 🍽️ Canteen Menu
- Daily menu selector (Monday to Sunday).
- Categorized meal tabs (Breakfast, Lunch, Snacks, Dinner) with active timings.
- **Diet Filters** (Veg, Non-Veg, Egg) and **Price Range Filters** (Under ₹30, ₹30–₹60, Over ₹60).
- Nutritional macro tracking displaying **Calories** and **Protein** metrics for every meal.
- Pre-order toggle with counter indicators.

### 4. 💬 Campus Chat
- Discord-style server rail representing departments, halls, and special interest groups.
- Real-time text channels (general, assignments, announcements) and voice study rooms.
- User presence tracking and members directory.

### 5. 🏛️ Clubs & Events
- Interactive directory of registered college societies and clubs (Coding, AI/ML, NSS, Music).
- Event dashboard with direct RSVP capability and real-time slots-filled progress indicators.

### 6. 📚 Study Rooms
- Bookable campus study spaces with seat capacity and feature tags (AC, Whiteboard, Wi-Fi).
- **Integrated Pomodoro Timer** featuring customizable Focus/Break durations and an animated circular progress ring.
- Active peer presence list tracking who is currently studying.

### 7. 💘 Campus Match (Dating)
- Verified student matchmaking system.
- Swipe card interface allowing students to like or pass campus profiles.
- Automatic match detection and matches sidebar with instant messaging action.

### 8. 📅 Attendance Tracker
- Track attendance logs across all semester subjects.
- Quick Log button (Present/Absent).
- Automatic safe-limit calculations warning you if you drop below the mandatory **75% threshold**.

### 9. 📂 Academic Resources
- Academics folder holding lecture notes, lab manuals, and previous year questions (PYQs).
- Categorized search and downloads tracker.
- Contribution card incentivizing uploading study materials.

---

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Router**: [TanStack Router](https://tanstack.com/router/latest) (with automatic route tree generation)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Getting Started & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and `npm` installed.

### 1. Navigate to the project directory
```bash
cd college_app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

The application will build and boot on your local server, typically visible at:
👉 **[http://localhost:8081/](http://localhost:8081/)**

---

## 🌿 Git Workflow
To push updates to this project branch:
```bash
# 1. Stage changes
git add .

# 2. Commit changes
git commit -m "feat: your descriptive message"

# 3. Push to branch
git push origin campus-connect
```
