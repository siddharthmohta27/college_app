import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Hash,
  Volume2,
  Plus,
  Search,
  Bell,
  Settings,
  Smile,
  Paperclip,
  Send,
  Users,
  GraduationCap,
  ShoppingBag,
  BookOpen,
  Sparkles,
  Pin,
  Phone,
  Video,
} from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Nexus — Chat" },
      {
        name: "description",
        content: "Real-time campus chat: servers, channels, DMs and study rooms.",
      },
    ],
  }),
  component: ChatApp,
});

type Msg = {
  id: string;
  user: string;
  color: string;
  avatar: string;
  time: string;
  text: string;
  reactions?: { emoji: string; count: number }[];
};

const SERVERS = [
  { id: "cs", name: "CS", color: "from-fuchsia-500 to-violet-600" },
  { id: "math", name: "MA", color: "from-cyan-400 to-blue-600" },
  { id: "hall", name: "H4", color: "from-pink-500 to-rose-600" },
  { id: "club", name: "AI", color: "from-emerald-400 to-teal-600" },
  { id: "mkt", name: "MK", color: "from-amber-400 to-orange-600" },
];

const CHANNELS = {
  text: [
    { id: "general", name: "general", unread: 3 },
    { id: "announcements", name: "announcements", unread: 0 },
    { id: "assignments", name: "assignments-help", unread: 12 },
    { id: "random", name: "random", unread: 0 },
    { id: "internships", name: "internships", unread: 5 },
  ],
  voice: [
    { id: "study-1", name: "Study Room 1", users: 4 },
    { id: "study-2", name: "Late Night Grind", users: 2 },
    { id: "chill", name: "Chill Lounge", users: 8 },
  ],
};

const INITIAL_MSGS: Msg[] = [
  {
    id: "1",
    user: "Priya S.",
    color: "text-fuchsia-400",
    avatar: "PS",
    time: "10:24",
    text: "yo did anyone finish the algo pset? 😭 stuck on Q3",
    reactions: [{ emoji: "😭", count: 4 }],
  },
  {
    id: "2",
    user: "Marcus K.",
    color: "text-cyan-400",
    avatar: "MK",
    time: "10:26",
    text: "same boat. the DP transition is cursed",
  },
  {
    id: "3",
    user: "Aisha R.",
    color: "text-emerald-400",
    avatar: "AR",
    time: "10:28",
    text: "hop in Study Room 1 — im screensharing rn",
    reactions: [
      { emoji: "🔥", count: 6 },
      { emoji: "🙏", count: 3 },
    ],
  },
  {
    id: "4",
    user: "Leo T.",
    color: "text-amber-400",
    avatar: "LT",
    time: "10:31",
    text: "btw someone selling a used GPU in #marketplace, checked it, legit",
  },
  {
    id: "5",
    user: "Priya S.",
    color: "text-fuchsia-400",
    avatar: "PS",
    time: "10:33",
    text: "omw to the study room 🚀",
  },
];

const MEMBERS = [
  { name: "Priya S.", status: "online", role: "TA", color: "bg-fuchsia-500" },
  { name: "Marcus K.", status: "online", role: "Student", color: "bg-cyan-500" },
  { name: "Aisha R.", status: "online", role: "Mod", color: "bg-emerald-500" },
  { name: "Leo T.", status: "idle", role: "Student", color: "bg-amber-500" },
  { name: "Sana M.", status: "dnd", role: "Student", color: "bg-rose-500" },
  { name: "Kenji O.", status: "offline", role: "Student", color: "bg-slate-500" },
];

function ChatApp() {
  const [activeServer, setActiveServer] = useState("cs");
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MSGS);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        user: "You",
        color: "text-primary",
        avatar: "YO",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: draft.trim(),
      },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Server rail */}
      <aside className="flex w-[76px] flex-col items-center gap-3 border-r border-border bg-background/60 py-4">
        <Link
          to="/"
          className="grid h-12 w-12 place-items-center rounded-2xl glass transition hover:bg-primary/20"
        >
          <img src={logo} alt="Nexus" className="h-7 w-7" width={28} height={28} />
        </Link>
        <div className="my-1 h-px w-8 bg-border" />
        {SERVERS.map((s) => {
          const active = s.id === activeServer;
          return (
            <button
              key={s.id}
              onClick={() => setActiveServer(s.id)}
              className={`group relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-xs font-bold text-white transition-all hover:rounded-xl ${active ? "rounded-xl shadow-lg shadow-primary/30" : "opacity-80 hover:opacity-100"}`}
            >
              {s.name}
              {active && (
                <span className="absolute -left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
              )}
            </button>
          );
        })}
        <button className="grid h-12 w-12 place-items-center rounded-2xl border border-dashed border-border text-muted-foreground transition hover:border-primary hover:text-primary">
          <Plus className="h-5 w-5" />
        </button>
      </aside>

      {/* Channel sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-surface/40 md:flex">
        <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">CS Department</span>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-2 py-4">
          <ChannelGroup label="Text Channels">
            {CHANNELS.text.map((c) => (
              <ChannelBtn
                key={c.id}
                icon={<Hash className="h-4 w-4" />}
                label={c.name}
                badge={c.unread}
                active={c.id === activeChannel}
                onClick={() => setActiveChannel(c.id)}
              />
            ))}
          </ChannelGroup>
          <ChannelGroup label="Voice / Study">
            {CHANNELS.voice.map((c) => (
              <ChannelBtn
                key={c.id}
                icon={<Volume2 className="h-4 w-4" />}
                label={c.name}
                subtle={`${c.users} in`}
              />
            ))}
          </ChannelGroup>
          <ChannelGroup label="Campus">
            <ChannelBtn icon={<ShoppingBag className="h-4 w-4" />} label="marketplace" pill="new" />
            <ChannelBtn icon={<BookOpen className="h-4 w-4" />} label="notes-share" />
            <ChannelBtn icon={<Sparkles className="h-4 w-4" />} label="events" />
          </ChannelGroup>
        </div>

        {/* User card */}
        <div className="flex items-center gap-2 border-t border-border bg-background/50 px-3 py-2.5">
          <div className="relative">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">
              YO
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">You</div>
            <div className="truncate font-mono text-[10px] text-muted-foreground">
              online · #4210
            </div>
          </div>
          <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Chat area */}
      <section className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border bg-background/40 px-5 py-3 backdrop-blur">
          <div className="flex min-w-0 items-center gap-3">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <h2 className="truncate font-semibold">{activeChannel}</h2>
            <span className="hidden text-xs text-muted-foreground md:inline">
              | Ask questions, share memes, find study buddies
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <HeaderIcon icon={<Phone className="h-4 w-4" />} />
            <HeaderIcon icon={<Video className="h-4 w-4" />} />
            <HeaderIcon icon={<Pin className="h-4 w-4" />} />
            <HeaderIcon icon={<Bell className="h-4 w-4" />} />
            <div className="relative ml-2 hidden md:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search"
                className="w-44 rounded-lg border border-border bg-surface/60 py-1.5 pl-8 pr-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-1 overflow-y-auto px-4 py-4 md:px-8">
          <div className="mx-auto mb-6 max-w-2xl rounded-2xl glass p-5 text-center">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-primary/20">
              <Hash className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-2 font-semibold">Welcome to #{activeChannel}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              This is the start of the channel. Say hi 👋
            </p>
          </div>

          {messages.map((m, i) => {
            const prev = messages[i - 1];
            const grouped = prev && prev.user === m.user;
            return <Message key={m.id} m={m} grouped={grouped} />;
          })}
        </div>

        {/* Composer */}
        <div className="px-4 pb-4 md:px-8">
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface/70 p-2 backdrop-blur transition focus-within:border-primary focus-within:shadow-[0_0_30px_-8px_var(--primary)]">
            <button className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground hover:bg-surface-elevated hover:text-foreground">
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder={`Message #${activeChannel}`}
              className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground hover:bg-surface-elevated hover:text-foreground">
              <Smile className="h-4 w-4" />
            </button>
            <button
              onClick={send}
              disabled={!draft.trim()}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-40 disabled:hover:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1.5 px-2 text-[10px] text-muted-foreground">
            Press <kbd className="rounded bg-surface px-1 font-mono">Enter</kbd> to send ·{" "}
            <kbd className="rounded bg-surface px-1 font-mono">Shift+Enter</kbd> for newline
          </p>
        </div>
      </section>

      {/* Members */}
      <aside className="hidden w-60 flex-col border-l border-border bg-surface/40 lg:flex">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3.5">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Members — {MEMBERS.length}</span>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-2 py-3">
          {["online", "idle", "dnd", "offline"].map((s) => {
            const list = MEMBERS.filter((m) => m.status === s);
            if (!list.length) return null;
            return (
              <div key={s}>
                <div className="px-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s === "dnd" ? "Do not disturb" : s} — {list.length}
                </div>
                {list.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-surface-elevated"
                  >
                    <div className="relative">
                      <div
                        className={`grid h-8 w-8 place-items-center rounded-full ${m.color} text-[10px] font-bold text-white`}
                      >
                        {m.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <StatusDot status={m.status} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-sm ${s === "offline" ? "text-muted-foreground" : ""}`}
                      >
                        {m.name}
                      </div>
                      <div className="truncate text-[10px] text-muted-foreground">{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const c =
    status === "online"
      ? "bg-emerald-500"
      : status === "idle"
        ? "bg-amber-500"
        : status === "dnd"
          ? "bg-rose-500"
          : "bg-slate-500";
  return (
    <span
      className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface ${c}`}
    />
  );
}

function HeaderIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="grid h-8 w-8 place-items-center rounded-lg transition hover:bg-surface hover:text-foreground">
      {icon}
    </button>
  );
}

function ChannelGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between px-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <button className="text-muted-foreground hover:text-foreground">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function ChannelBtn({
  icon,
  label,
  badge,
  subtle,
  active,
  pill,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  subtle?: string;
  active?: boolean;
  pill?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
        active
          ? "bg-primary/15 text-foreground"
          : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
      }`}
    >
      <span className={active ? "text-primary" : ""}>{icon}</span>
      <span className="flex-1 truncate text-left">{label}</span>
      {pill && (
        <span className="rounded-full bg-accent/20 px-1.5 py-0.5 font-mono text-[9px] uppercase text-accent">
          {pill}
        </span>
      )}
      {subtle && <span className="font-mono text-[10px] text-muted-foreground">{subtle}</span>}
      {!!badge && (
        <span className="grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
          {badge}
        </span>
      )}
    </button>
  );
}

function Message({ m, grouped }: { m: Msg; grouped: boolean }) {
  return (
    <div
      className={`group flex gap-3 rounded-lg px-2 py-1 transition hover:bg-surface/50 ${grouped ? "" : "mt-3"}`}
    >
      {grouped ? (
        <div className="w-10 shrink-0 pt-1 text-right font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100">
          {m.time}
        </div>
      ) : (
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground`}
        >
          {m.avatar}
        </div>
      )}
      <div className="min-w-0 flex-1">
        {!grouped && (
          <div className="flex items-baseline gap-2">
            <span className={`font-semibold ${m.color}`}>{m.user}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{m.time}</span>
          </div>
        )}
        <div className="text-sm text-foreground/95">{m.text}</div>
        {m.reactions && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {m.reactions.map((r) => (
              <button
                key={r.emoji}
                className="flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-0.5 text-xs transition hover:border-primary hover:bg-primary/10"
              >
                <span>{r.emoji}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{r.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
