import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen, Clock, Users, Calendar, Play, Pause, RotateCcw,
  CheckCircle, Lock, Unlock, Coffee,
} from "lucide-react";

export const Route = createFileRoute("/app/study")({
  head: () => ({
    meta: [{ title: "Study Rooms — Campus Connect" }],
  }),
  component: StudyRooms,
});

type Room = {
  id: number;
  name: string;
  capacity: number;
  occupied: number;
  floor: string;
  features: string[];
  isBooked: boolean;
  bookings: string[];
};

const TIME_SLOTS = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

const ROOMS: Room[] = [
  { id: 1, name: "Study Hall A", capacity: 20, occupied: 14, floor: "Ground Floor", features: ["Wi-Fi", "Whiteboard", "AC", "Projector"], isBooked: false, bookings: ["9:00", "10:00", "14:00", "15:00"] },
  { id: 2, name: "Quiet Zone B", capacity: 12, occupied: 12, floor: "1st Floor", features: ["Wi-Fi", "AC", "No Phone"], isBooked: true, bookings: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00"] },
  { id: 3, name: "Group Room C", capacity: 8, occupied: 3, floor: "1st Floor", features: ["Wi-Fi", "Whiteboard", "TV Screen"], isBooked: false, bookings: ["11:00", "12:00"] },
  { id: 4, name: "Discussion Pod D", capacity: 6, occupied: 0, floor: "2nd Floor", features: ["Wi-Fi", "Soundproof"], isBooked: false, bookings: [] },
  { id: 5, name: "Library Annex E", capacity: 30, occupied: 21, floor: "2nd Floor", features: ["Wi-Fi", "Whiteboard", "AC", "Books"], isBooked: false, bookings: ["10:00", "11:00", "12:00", "16:00", "17:00"] },
  { id: 6, name: "Tech Lab F", capacity: 25, occupied: 18, floor: "Ground Floor", features: ["Wi-Fi", "Computers", "AC", "Whiteboard"], isBooked: false, bookings: ["13:00", "14:00", "15:00", "16:00"] },
];

const ACTIVE_USERS = [
  { name: "Priya S.", avatar: "PS", color: "bg-fuchsia-500", subject: "Algorithms", time: "2h 14m" },
  { name: "Aisha R.", avatar: "AR", color: "bg-emerald-500", subject: "DBMS", time: "45m" },
  { name: "Marcus K.", avatar: "MK", color: "bg-cyan-500", subject: "Maths III", time: "1h 30m" },
  { name: "Leo T.", avatar: "LT", color: "bg-amber-500", subject: "OS Concepts", time: "3h 02m" },
];

function StudyRooms() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingSlot, setBookingSlot] = useState<string | null>(null);
  const [bookedRooms, setBookedRooms] = useState<number[]>([2]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Pomodoro timer state
  const [pomMode, setPomMode] = useState<"focus" | "short" | "long">("focus");
  const [pomRunning, setPomRunning] = useState(false);
  const [pomSeconds, setPomSeconds] = useState(25 * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const POM_DURATIONS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };

  useEffect(() => {
    if (pomRunning) {
      timerRef.current = setInterval(() => {
        setPomSeconds((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current!);
            setPomRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [pomRunning]);

  const resetTimer = () => {
    setPomRunning(false);
    setPomSeconds(POM_DURATIONS[pomMode]);
  };

  const switchMode = (mode: typeof pomMode) => {
    setPomMode(mode);
    setPomRunning(false);
    setPomSeconds(POM_DURATIONS[mode]);
  };

  const mins = String(Math.floor(pomSeconds / 60)).padStart(2, "0");
  const secs = String(pomSeconds % 60).padStart(2, "0");
  const progress = 1 - pomSeconds / POM_DURATIONS[pomMode];
  const circumference = 2 * Math.PI * 54;

  const bookRoom = (roomId: number) => {
    setBookedRooms((prev) => [...prev, roomId]);
    setShowBookingModal(false);
    setSelectedRoom(null);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-xl font-bold">Study Rooms</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Book a room, focus with a Pomodoro timer, and study smarter</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Room list — left 2/3 */}
        <div className="space-y-4 lg:col-span-2">
          {/* Availability legend */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground animate-fade-up">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Available</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Almost Full</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Full</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Your Booking</span>
          </div>

          {/* Rooms */}
          {ROOMS.map((room, i) => {
            const isMyBooking = bookedRooms.includes(room.id);
            const pct = room.occupied / room.capacity;
            const statusColor = isMyBooking ? "bg-primary/20 border-primary/40" : pct >= 1 ? "bg-rose-500/10 border-rose-500/30" : pct > 0.7 ? "bg-amber-500/10 border-amber-500/30" : "border-border";
            const dotColor = isMyBooking ? "bg-primary" : pct >= 1 ? "bg-rose-500" : pct > 0.7 ? "bg-amber-500" : "bg-emerald-500";

            return (
              <div
                key={room.id}
                id={`room-${room.id}`}
                className={`rounded-2xl border glass p-5 animate-fade-up card-hover ${statusColor}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                      <h3 className="font-bold">{room.name}</h3>
                      {isMyBooking && (
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">Your Booking</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-3 w-3" />{room.floor} &nbsp;·&nbsp;
                      <Users className="h-3 w-3" />{room.occupied}/{room.capacity} people
                    </p>
                  </div>
                  {!isMyBooking && pct < 1 ? (
                    <button
                      id={`book-room-${room.id}`}
                      onClick={() => { setSelectedRoom(room); setShowBookingModal(true); }}
                      className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition btn-press"
                    >
                      Book Room
                    </button>
                  ) : isMyBooking ? (
                    <button className="flex items-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                      <CheckCircle className="h-3.5 w-3.5" /> Booked
                    </button>
                  ) : (
                    <span className="rounded-xl bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-400">Full</span>
                  )}
                </div>

                {/* Occupancy bar */}
                <div className="mt-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
                    <div
                      className={`h-full rounded-full transition-all ${isMyBooking ? "bg-primary" : pct >= 1 ? "bg-rose-500" : pct > 0.7 ? "bg-amber-500" : "bg-emerald-500"}`}
                      style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {room.features.map((f) => (
                    <span key={f} className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] text-muted-foreground">{f}</span>
                  ))}
                </div>

                {/* Time slot preview */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {TIME_SLOTS.slice(0, 8).map((slot) => {
                    const booked = room.bookings.includes(slot);
                    return (
                      <span
                        key={slot}
                        className={`rounded px-1.5 py-0.5 font-mono text-[9px] ${booked ? "bg-rose-500/20 text-rose-400" : "bg-surface text-muted-foreground"}`}
                      >
                        {slot}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column — Pomodoro + Active users */}
        <div className="space-y-6">
          {/* Pomodoro Timer */}
          <div className="rounded-2xl glass-strong neon-border p-5 text-center animate-fade-up">
            <h3 className="mb-4 flex items-center justify-center gap-2 text-sm font-bold">
              <Clock className="h-4 w-4 text-primary" /> Focus Timer
            </h3>

            {/* Mode selector */}
            <div className="mb-5 flex rounded-xl border border-border bg-surface p-1">
              {(["focus", "short", "long"] as const).map((mode) => (
                <button
                  key={mode}
                  id={`pom-mode-${mode}`}
                  onClick={() => switchMode(mode)}
                  className={`flex-1 rounded-lg py-1.5 text-[11px] font-medium capitalize transition ${
                    pomMode === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode === "focus" ? "Focus" : mode === "short" ? "Short" : "Long"}
                </button>
              ))}
            </div>

            {/* Ring */}
            <div className="relative mx-auto mb-5 grid h-36 w-36 place-items-center">
              <svg className="-rotate-90 absolute inset-0" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-elevated" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke="currentColor" strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  className="text-primary transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <div className="text-3xl font-bold font-mono tabular-nums">{mins}:{secs}</div>
                <div className="mt-1 text-[10px] capitalize text-muted-foreground">{pomMode} session</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                id="pom-reset-btn"
                onClick={resetTimer}
                className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                id="pom-toggle-btn"
                onClick={() => setPomRunning((r) => !r)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition hover:opacity-90 glow-primary"
              >
                {pomRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
              </button>
              <button
                id="pom-coffee-btn"
                onClick={() => switchMode("short")}
                className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition hover:text-foreground"
              >
                <Coffee className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-3 text-[10px] text-muted-foreground">
              {pomMode === "focus" ? "25 min deep focus" : pomMode === "short" ? "5 min short break" : "15 min long break"}
            </p>
          </div>

          {/* Currently studying */}
          <div className="rounded-2xl glass p-5 animate-fade-up">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
              <Users className="h-4 w-4 text-primary" /> Studying Now
            </h3>
            <div className="space-y-3">
              {ACTIVE_USERS.map((user) => (
                <div key={user.name} className="flex items-center gap-3">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${user.color} text-xs font-bold text-white`}>
                    {user.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.subject}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-primary font-mono">{user.time}</div>
                    <div className="text-[10px] text-muted-foreground">active</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {showBookingModal && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl glass-strong neon-border p-6 animate-fade-up">
            <h3 className="mb-1 text-lg font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Book {selectedRoom.name}
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">{selectedRoom.floor} · {selectedRoom.capacity} seats</p>

            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-muted-foreground">Select Time Slot</label>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => {
                  const taken = selectedRoom.bookings.includes(slot);
                  return (
                    <button
                      key={slot}
                      id={`slot-${slot.replace(":", "")}`}
                      disabled={taken}
                      onClick={() => setBookingSlot(bookingSlot === slot ? null : slot)}
                      className={`rounded-lg px-3 py-1.5 font-mono text-xs transition ${
                        taken ? "cursor-not-allowed bg-rose-500/10 text-rose-400/60" :
                        bookingSlot === slot ? "bg-primary text-primary-foreground" :
                        "border border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      {taken ? <Lock className="inline h-3 w-3 mr-1" /> : <Unlock className="inline h-3 w-3 mr-1 opacity-0 group-hover:opacity-100" />}
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground" htmlFor="booking-purpose">Purpose (optional)</label>
              <input id="booking-purpose" placeholder="e.g. Group study for DS exam" className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary" />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowBookingModal(false); setBookingSlot(null); }}
                className="flex-1 rounded-xl border border-border py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Cancel
              </button>
              <button
                id="confirm-booking-btn"
                disabled={!bookingSlot}
                onClick={() => bookRoom(selectedRoom.id)}
                className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition btn-press disabled:opacity-40"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
