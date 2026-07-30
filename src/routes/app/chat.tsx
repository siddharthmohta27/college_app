import { createFileRoute } from "@tanstack/react-router";
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
import { io, Socket } from "socket.io-client";
import { firebaseAuth } from "@/lib/firebase";

export const Route = createFileRoute("/app/chat")({
  head: () => ({
    meta: [
      { title: "Campus Chat — Campus Connect" },
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

type Member = {
  name: string;
  status: string;
  role: string;
  color: string;
};

const SERVERS = [
  { id: "cs", name: "CS", color: "from-primary to-yellow-500 text-primary-foreground font-black" },
  {
    id: "math",
    name: "MA",
    color: "bg-surface border border-border text-muted-foreground hover:text-foreground",
  },
  {
    id: "hall",
    name: "H4",
    color: "bg-surface border border-border text-muted-foreground hover:text-foreground",
  },
  {
    id: "club",
    name: "AI",
    color: "bg-surface border border-border text-muted-foreground hover:text-foreground",
  },
  {
    id: "mkt",
    name: "MK",
    color: "bg-surface border border-border text-muted-foreground hover:text-foreground",
  },
];

const CHANNELS = {
  text: [
    { id: "general", name: "general", unread: 0 },
    { id: "announcements", name: "announcements", unread: 0 },
    { id: "assignments", name: "assignments-help", unread: 0 },
    { id: "random", name: "random", unread: 0 },
    { id: "internships", name: "internships", unread: 0 },
  ],
  voice: [
    { id: "study-1", name: "Study Room 1", users: 0 },
    { id: "study-2", name: "Late Night Grind", users: 0 },
    { id: "chill", name: "Chill Lounge", users: 0 },
  ],
};

function ChatApp() {
  const [activeServer, setActiveServer] = useState("cs");
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [draft, setDraft] = useState("");
  const [showChannelDrawer, setShowChannelDrawer] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    email: string;
    displayName: string | null;
  } | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  // Demo initial messages when offline / backend not deployed
  const DEMO_MESSAGES: Record<string, Msg[]> = {
    general: [
      {
        id: "demo_1",
        user: "Aarav Sharma",
        color: "text-amber-400",
        avatar: "AS",
        time: "10:14 AM",
        text: "Hey everyone! Welcome to #general campus chat 🚀",
        reactions: [{ emoji: "🔥", count: 4 }],
      },
      {
        id: "demo_2",
        user: "Ananya Gupta",
        color: "text-cyan-400",
        avatar: "AG",
        time: "10:16 AM",
        text: "Has anyone solved Question 3 from the DS Assignment?",
      },
    ],
    announcements: [
      {
        id: "demo_3",
        user: "PEC Coordinator",
        color: "text-red-400",
        avatar: "PC",
        time: "09:00 AM",
        text: "📢 End-Sem Exam date sheet has been uploaded to academic portal.",
        reactions: [{ emoji: "👍", count: 12 }],
      },
    ],
  };

  // Get current user from Firebase auth
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(
      (user: { uid: string; email: string | null; displayName: string | null } | null) => {
        if (user) {
          setCurrentUser({
            id: user.uid,
            email: user.email || "",
            displayName: user.displayName,
          });
        } else {
          setCurrentUser(null);
        }
      },
    );
    return unsub;
  }, []);

  // Set default demo messages for channel if empty
  useEffect(() => {
    if (!isConnected) {
      setMessages(DEMO_MESSAGES[activeChannel] || []);
    }
  }, [activeChannel, isConnected]);

  // Connect to Socket.io server with Firebase JWT auth
  useEffect(() => {
    if (!currentUser) return;

    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

    const configuredUrl = import.meta.env.VITE_CHAT_SERVER_URL || import.meta.env.VITE_BACKEND_URL;
    const socketUrl = configuredUrl || (isLocal ? "http://localhost:3001" : "");

    if (!socketUrl) {
      setIsConnected(false);
      return;
    }

    const getToken = async () => {
      const user = firebaseAuth.currentUser;
      if (user) {
        return user.getIdToken();
      }
      return null;
    };

    getToken().then((token) => {
      if (!token) return;

      try {
        const socket = io(socketUrl, {
          auth: { token },
          transports: ["websocket", "polling"],
          timeout: 5000,
        });
        socketRef.current = socket;

        socket.on("connect", () => {
          setIsConnected(true);
        });

        // Join default room with user info from auth
        const displayName = currentUser.displayName || currentUser.email?.split("@")[0] || "Student";
        const avatar =
          displayName
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2) || "SM";

        socket.emit("join", {
          name: displayName,
          avatar,
          role: "Student",
          color: "bg-primary",
          channelId: activeChannel,
        });

        // Event listeners
        socket.on("history", (history: Msg[]) => {
          if (history && history.length > 0) {
            setMessages(history);
          }
        });

        socket.on("message", (newMsg: Msg) => {
          setMessages((prev) => [...prev, newMsg]);
        });

        socket.on("reactionUpdate", ({ msgId, reactions }) => {
          setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, reactions } : m)));
        });

        socket.on("members", (updatedMembers: Member[]) => {
          setMembers(updatedMembers);
        });

        socket.on("connect_error", (err) => {
          console.warn("Socket connection warning:", err.message);
          setIsConnected(false);
        });

        return () => {
          socket.disconnect();
        };
      } catch (e) {
        console.warn("Socket connection fallback:", e);
        setIsConnected(false);
      }
    });
  }, [currentUser]);

  // Handle switching channels
  const handleChannelChange = (newChannelId: string) => {
    if (newChannelId === activeChannel) return;
    const oldChannelId = activeChannel;
    setActiveChannel(newChannelId);
    setShowChannelDrawer(false); // close drawer on mobile after selecting

    if (socketRef.current && isConnected) {
      socketRef.current.emit("change_channel", {
        oldChannel: oldChannelId,
        newChannel: newChannelId,
      });
    }
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!draft.trim()) return;
    const text = draft.trim();

    if (socketRef.current && isConnected) {
      socketRef.current.emit("message", {
        text,
        channelId: activeChannel,
      });
    } else {
      // Local fallback mode when server is offline or on Netlify without backend
      const displayName = currentUser?.displayName || currentUser?.email?.split("@")[0] || "Student";
      const avatar =
        displayName
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2) || "SM";

      const newMsg: Msg = {
        id: `local_${Date.now()}`,
        user: displayName,
        color: "text-primary font-bold",
        avatar,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text,
      };
      setMessages((prev) => [...prev, newMsg]);
    }
    setDraft("");
  };

  const handleAddReaction = (msgId: string, emoji: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit("reaction", {
        msgId,
        emoji,
        channelId: activeChannel,
      });
    } else {
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== msgId) return m;
          const existing = m.reactions || [];
          const idx = existing.findIndex((r) => r.emoji === emoji);
          let updated = [...existing];
          if (idx >= 0) {
            updated[idx] = { ...updated[idx], count: updated[idx].count + 1 };
          } else {
            updated.push({ emoji, count: 1 });
          }
          return { ...m, reactions: updated };
        })
      );
    }
  };

  return (
    <div className="flex h-[calc(100vh-57px-60px)] w-full overflow-hidden md:h-[calc(100vh-57px)]">
      {/* Mobile channel drawer overlay */}
      {showChannelDrawer && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setShowChannelDrawer(false)}
        />
      )}

      {/* Server rail - hidden on mobile, visible on md+ */}
      <aside className="hidden md:flex w-[52px] flex-col items-center gap-3 border-r border-border bg-background/60 py-4 md:w-[68px]">
        <div className="my-1 h-px w-8 bg-border" />
        {SERVERS.map((s) => {
          const active = s.id === activeServer;
          return (
            <button
              key={s.id}
              id={`server-${s.id}`}
              onClick={() => setActiveServer(s.id)}
              className={`group relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-xs font-bold text-white transition-all hover:rounded-xl ${active ? "rounded-xl shadow-lg shadow-primary/30" : "opacity-75 hover:opacity-100"}`}
            >
              {s.name}
              {active && (
                <span className="absolute -left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
              )}
            </button>
          );
        })}
        <button className="grid h-11 w-11 place-items-center rounded-2xl border border-dashed border-border text-muted-foreground transition hover:border-primary hover:text-primary">
          <Plus className="h-4 w-4" />
        </button>
      </aside>

      {/* Channel sidebar — drawer on mobile, static on md+ */}
      <aside
        className={`fixed inset-y-0 left-0 md:left-[52px] z-50 flex w-56 flex-col border-r border-border bg-surface/95 backdrop-blur-xl transition-transform duration-300 md:static md:left-auto md:z-auto md:flex md:translate-x-0 md:bg-surface/40 ${
          showChannelDrawer ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
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
                onClick={() => handleChannelChange(c.id)}
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
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-xs font-bold text-primary-foreground">
              {currentUser?.displayName
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase() ||
                currentUser?.email?.split("@")[0]?.substring(0, 2).toUpperCase() ||
                "SM"}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">
              {currentUser?.displayName || currentUser?.email?.split("@")[0] || "Student"}
            </div>
            <div className="truncate font-mono text-[10px] text-muted-foreground">
              online · Campus Connect#0127
            </div>
          </div>
          <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Chat area */}
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background/40 px-3 py-3 backdrop-blur md:px-5">
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            {/* Mobile: channel menu toggle */}
            <button
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground md:hidden"
              onClick={() => setShowChannelDrawer(true)}
            >
              <Hash className="h-4 w-4" />
            </button>
            <Hash className="hidden h-5 w-5 text-muted-foreground md:block" />
            <h2 className="truncate font-semibold">#{activeChannel}</h2>
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
                id="chat-search"
                placeholder="Search"
                className="w-40 rounded-lg border border-border bg-surface/60 py-1.5 pl-8 pr-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-1 overflow-y-auto px-4 py-4 md:px-6">
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
            return <Message key={m.id} m={m} grouped={grouped} onAddReaction={handleAddReaction} />;
          })}
        </div>

        {/* Composer */}
        <div className="px-3 pb-4 md:px-6" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" }}>
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface/70 p-2 backdrop-blur transition focus-within:border-primary focus-within:shadow-[0_0_30px_-8px_var(--primary)]">
            <button className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground hover:bg-surface-elevated hover:text-foreground">
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              id="chat-composer"
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
              id="chat-send-btn"
              onClick={send}
              disabled={!draft.trim()}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Members */}
      <aside className="hidden w-52 flex-col border-l border-border bg-surface/40 lg:flex">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Members — {members.length}</span>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-2 py-3">
          {["online", "idle", "dnd", "offline"].map((s) => {
            const list = members.filter((m) => m.status === s);
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
          ? "bg-primary/15 text-foreground font-semibold"
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

function Message({
  m,
  grouped,
  onAddReaction,
}: {
  m: Msg;
  grouped: boolean;
  onAddReaction: (id: string, emoji: string) => void;
}) {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const emojis = ["🔥", "😭", "👍", "👀", "🙏", "❤️"];

  return (
    <div
      className={`group flex gap-3 rounded-lg px-2 py-1 transition hover:bg-surface/50 relative ${grouped ? "" : "mt-3"}`}
    >
      {grouped ? (
        <div className="w-10 shrink-0 pt-1 text-right font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100">
          {m.time}
        </div>
      ) : (
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {m.avatar}
        </div>
      )}
      <div className="min-w-0 flex-1">
        {!grouped && (
          <div className="flex items-baseline gap-2">
            <span
              className={`font-semibold ${m.color?.replace("bg-", "text-") || "text-foreground"}`}
            >
              {m.user}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">{m.time}</span>
          </div>
        )}
        <div className="text-sm text-foreground/95">{m.text}</div>
        {m.reactions && m.reactions.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {m.reactions.map((r) => (
              <button
                key={r.emoji}
                onClick={() => onAddReaction(m.id, r.emoji)}
                className="flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-0.5 text-xs transition hover:border-primary hover:bg-primary/10"
              >
                <span>{r.emoji}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{r.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Reaction Bar */}
      <div className="absolute right-2 top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-0.5 rounded-lg border border-border bg-surface-elevated p-1 shadow-md z-10">
        {emojis.slice(0, 4).map((emoji) => (
          <button
            key={emoji}
            onClick={() => onAddReaction(m.id, emoji)}
            className="hover:bg-surface rounded p-1 transition text-xs"
          >
            {emoji}
          </button>
        ))}
        <button
          onClick={() => setShowReactionPicker(!showReactionPicker)}
          className="hover:bg-surface rounded p-1 transition text-[10px] font-bold text-muted-foreground px-1.5"
        >
          ＋
        </button>
        {showReactionPicker && (
          <div className="absolute right-0 top-8 flex gap-1 border border-border bg-surface-elevated p-1.5 rounded-lg shadow-lg z-20">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onAddReaction(m.id, emoji);
                  setShowReactionPicker(false);
                }}
                className="hover:bg-surface rounded p-1.5 transition text-sm"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
