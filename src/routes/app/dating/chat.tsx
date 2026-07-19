import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Loader2, MessageSquare, ArrowLeft, Heart, X, CheckCircle2 } from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";
import { useChatRedirectInfo } from "@/hooks/use-dating-api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dating/chat/$profileId")({
  head: () => ({
    meta: [{ title: "Opening Chat — Campus Match" }],
  }),
  component: ChatRedirect,
});

function ChatRedirect() {
  const navigate = useNavigate();
  const { profileId } = useParams({ from: "/app/dating/chat/$profileId", strict: false });
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Preparing chat...");

  const { data: redirectInfo, isLoading, error } = useChatRedirectInfo(profileId || "");

  useEffect(() => {
    if (!isLoading && redirectInfo) {
      handleRedirect(redirectInfo);
    }
  }, [redirectInfo, isLoading]);

  const handleRedirect = (info: any) => {
    if (!info.targetChatUserId) {
      setStatus("error");
      setMessage("This user hasn't joined Campus Chat yet. They'll receive a notification when they do.");
      return;
    }

    // Navigate to chat with DM parameter
    // The chat page will handle opening the DM
    const dmChannelId = `dm_${Math.min(info.currentChatUserId, info.targetChatUserId)}_${Math.max(info.currentChatUserId, info.targetChatUserId)}`;
    
    navigate({ 
      to: "/app/chat", 
      search: { dm: info.targetChatUserId.toString(), channel: dmChannelId } 
    });
    
    setStatus("success");
    setMessage("Opening chat...");
  };

  if (status === "success") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center animate-fade-up">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold">Opening Chat</h2>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md text-center animate-fade-up">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10">
            <X className="h-8 w-8 text-rose-400" />
          </div>
          <h2 className="text-xl font-bold">Unable to Open Chat</h2>
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate({ to: "/app/dating" })}
              className="w-full rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold transition hover:bg-surface-elevated"
            >
              <ArrowLeft className="h-4 w-4 inline mr-2" />
              Back to Campus Match
            </button>
            <button
              onClick={() => navigate({ to: "/app/chat" })}
              className="w-full rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Open Campus Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center animate-fade-up">
        <div className="relative mb-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-yellow-500">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div className="absolute inset-0 flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/10 border-t-transparent animate-spin" />
        </div>
        <h2 className="text-xl font-bold">Opening Chat</h2>
        <p className="mt-1 text-sm text-muted-foreground">Connecting you with your match...</p>
      </div>
    </div>
  );
}