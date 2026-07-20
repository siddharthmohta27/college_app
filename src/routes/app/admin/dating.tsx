import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Loader2,
  Users,
  Shield,
  Flag,
  TrendingUp,
  Clock,
  Search,
  MoreVertical,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Ban,
  RotateCcw,
  Heart,
  Sparkles,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { firebaseAuth } from "@/lib/firebase";
import {
  useAdminStats,
  useAdminUsers,
  useAdminReports,
  useAdminSuspendUser,
  useAdminUnsuspendUser,
  useAdminVerifyUser,
  useAdminUpdateReport,
} from "@/hooks/use-dating-api";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/dating")({
  head: () => ({
    meta: [{ title: "Admin — Campus Match" }],
  }),
  component: AdminDashboard,
});

// Check if current user is admin
const ADMIN_EMAILS = [
  "admin@college.edu",
  "admin@campus.edu",
  "siddharth@college.edu", // Add your email here
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ uid: string; email: string | null } | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"stats" | "users" | "reports">("stats");
  const [searchQuery, setSearchQuery] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [reportStatus, setReportStatus] = useState<
    "pending" | "reviewed" | "dismissed" | "action_taken"
  >("pending");

  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: users = [], isLoading: usersLoading } = useAdminUsers(userPage, 50, searchQuery);
  const { data: reports = [], isLoading: reportsLoading } = useAdminReports(reportStatus);

  const suspendUser = useAdminSuspendUser();
  const unsuspendUser = useAdminUnsuspendUser();
  const verifyUser = useAdminVerifyUser();
  const updateReport = useAdminUpdateReport();

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({ uid: user.uid, email: user.email });
      } else {
        setCurrentUser(null);
        navigate({ to: "/login" });
      }
    });
    return unsub;
  }, [navigate]);

  // Check admin access
  const isAdmin = currentUser?.email && ADMIN_EMAILS.includes(currentUser.email);

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10">
            <Shield className="h-8 w-8 text-rose-400" />
          </div>
          <h2 className="text-xl font-bold">Access Denied</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You don't have permission to access the admin dashboard.
          </p>
          <button
            onClick={() => navigate({ to: "/app/dating" })}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Campus Match
          </button>
        </div>
      </div>
    );
  }

  const handleSuspend = async (profileId: string) => {
    const reason = prompt("Reason for suspension:");
    if (!reason) return;
    try {
      await suspendUser.mutateAsync({ id: profileId, reason });
      toast.success("User suspended");
    } catch {
      toast.error("Failed to suspend user");
    }
  };

  const handleUnsuspend = async (profileId: string) => {
    if (!confirm("Unsuspend this user?")) return;
    try {
      await unsuspendUser.mutateAsync(profileId);
      toast.success("User unsuspended");
    } catch {
      toast.error("Failed to unsuspend user");
    }
  };

  const handleVerify = async (profileId: string) => {
    try {
      await verifyUser.mutateAsync(profileId);
      toast.success("User verified");
    } catch {
      toast.error("Failed to verify user");
    }
  };

  const handleReportUpdate = async (reportId: string, status: typeof reportStatus) => {
    const notes = prompt("Admin notes (optional):");
    try {
      await updateReport.mutateAsync({ id: reportId, status, adminNotes: notes || undefined });
      toast.success("Report updated");
    } catch {
      toast.error("Failed to update report");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "reviewed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "dismissed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "action_taken":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-surface text-muted-foreground border-border";
    }
  };

  const getUserStatusColor = (isIncognito: boolean, isVerified: boolean) => {
    if (isIncognito) return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    if (isVerified) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  };

  const getUserStatusLabel = (isIncognito: boolean, isVerified: boolean) => {
    if (isIncognito) return "Suspended";
    if (isVerified) return "Verified";
    return "Pending";
  };

  if (statsLoading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Campus Match moderation and analytics
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border glass p-6 animate-pulse">
              <div className="h-4 w-1/2 skeleton rounded mb-2" />
              <div className="h-8 w-1/3 skeleton rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Campus Match moderation and analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            <Shield className="h-3.5 w-3.5" />
            Admin
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
        {[
          { id: "stats", label: "Overview", icon: TrendingUp },
          { id: "users", label: "Users", icon: Users },
          { id: "reports", label: "Reports", icon: Flag },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : ""}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Stats Tab */}
      {activeTab === "stats" && stats && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Profiles"
              value={stats.totalProfiles}
              icon={Users}
              color="text-blue-400"
              bg="bg-blue-500/10"
            />
            <StatCard
              label="Total Matches"
              value={stats.totalMatches}
              icon={Heart}
              color="text-rose-400"
              bg="bg-rose-500/10"
            />
            <StatCard
              label="Pending Requests"
              value={stats.pendingFriendRequests}
              icon={Clock}
              color="text-amber-400"
              bg="bg-amber-500/10"
            />
            <StatCard
              label="Pending Reports"
              value={stats.pendingReports}
              icon={Flag}
              color="text-red-400"
              bg="bg-red-500/10"
            />
            <StatCard
              label="Online Users"
              value={stats.onlineUsers}
              icon={TrendingUp}
              color="text-emerald-400"
              bg="bg-emerald-500/10"
            />
            <StatCard
              label="New Users (24h)"
              value={stats.newUsers24h}
              icon={Users}
              color="text-purple-400"
              bg="bg-purple-500/10"
            />
            <StatCard
              label="Verified Users"
              value={stats.verifiedUsers}
              icon={CheckCircle2}
              color="text-green-400"
              bg="bg-green-500/10"
            />
          </div>

          <div className="rounded-2xl border border-border glass p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("users")}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Manage Users
              </button>
              <button
                onClick={() => setActiveTab("reports")}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary"
              >
                <Flag className="h-4 w-4" />
                Review Reports
              </button>
              <button
                onClick={() => {
                  /* TODO: trigger compatibility recalc */
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary"
              >
                <RotateCcw className="h-4 w-4" />
                Recalculate Compatibility
              </button>
              <button
                onClick={() => {
                  /* TODO: generate daily picks */
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary"
              >
                <Sparkles className="h-4 w-4" />
                Generate Daily Picks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">All Users ({users.length})</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="rounded-xl border border-border bg-surface px-10 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {usersLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border glass p-4 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 skeleton rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/4 skeleton rounded" />
                      <div className="h-3 w-1/3 skeleton rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border glass overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <th className="p-3">User</th>
                      <th className="p-3 hidden md:table-cell">Branch / Year</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Chat</th>
                      <th className="p-3">Joined</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-surface/50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                              <span className="text-lg">{user.name?.charAt(0) || "U"}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate">{user.name}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {user.college_email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          <p className="text-sm text-muted-foreground">
                            {user.branch || "N/A"} / {user.year || "N/A"}
                          </p>
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getUserStatusColor(user.is_incognito, user.is_verified)}`}
                          >
                            {getUserStatusLabel(user.is_incognito, user.is_verified)}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${user.chat_status === "online" ? "bg-emerald-500/10 text-emerald-400" : "bg-surface text-muted-foreground border border-border"}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${user.chat_status === "online" ? "bg-emerald-400" : "bg-muted-foreground/50"}`}
                            />
                            {user.chat_status || "offline"}
                          </span>
                        </td>
                        <td className="p-3">
                          <p className="text-xs text-muted-foreground">
                            {user.created_at
                              ? formatDistanceToNow(new Date(user.created_at), { addSuffix: true })
                              : "Unknown"}
                          </p>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {!user.is_verified && (
                              <button
                                onClick={() => handleVerify(user.id.toString())}
                                className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition"
                                title="Verify user"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </button>
                            )}
                            {user.is_incognito ? (
                              <button
                                onClick={() => handleUnsuspend(user.id.toString())}
                                className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition"
                                title="Unsuspend user"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSuspend(user.id.toString())}
                                className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
                                title="Suspend user"
                              >
                                <Ban className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {users.length === 50 && (
                <div className="p-4 border-t border-border flex items-center justify-center gap-2">
                  <button
                    onClick={() => setUserPage((p) => p - 1)}
                    disabled={userPage === 1}
                    className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:bg-surface-elevated disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-muted-foreground">Page {userPage}</span>
                  <button
                    onClick={() => setUserPage((p) => p + 1)}
                    className="p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:bg-surface-elevated"
                  >
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">Reports ({reports.length})</h3>
            <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
              {["pending", "reviewed", "dismissed", "action_taken"].map((status) => (
                <button
                  key={status}
                  onClick={() => setReportStatus(status as typeof reportStatus)}
                  className={`rounded-lg py-1.5 px-3 text-xs font-medium transition ${
                    reportStatus === status
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {reportsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border glass p-4 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 skeleton rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/4 skeleton rounded" />
                      <div className="h-3 w-1/3 skeleton rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {reports.length === 0 ? (
                <div className="rounded-2xl border border-border glass p-12 text-center animate-fade-up">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Flag className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">No reports</h3>
                  <p className="mt-1 text-sm text-muted-foreground">All clear!</p>
                </div>
              ) : (
                reports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onUpdateStatus={(
                      status: "pending" | "reviewed" | "dismissed" | "action_taken",
                    ) => handleReportUpdate(report.id.toString(), status)}
                    currentStatus={report.status}
                  />
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-2xl border border-border glass p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold">{value.toLocaleString()}</p>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${bg}`}>
          <Icon className={`h-7 w-7 ${color}`} />
        </div>
      </div>
    </div>
  );
}

function ReportCard({ report, onUpdateStatus, currentStatus }: any) {
  const getReasonLabel = (reason: string) => {
    const labels: Record<string, string> = {
      fake_profile: "Fake Profile",
      inappropriate_photos: "Inappropriate Photos",
      harassment: "Harassment",
      spam: "Spam",
      underage: "Underage",
      other: "Other",
    };
    return labels[reason] || reason;
  };

  return (
    <div className="rounded-2xl border border-border glass p-4 animate-fade-up">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getStatusColor(currentStatus)}`}
            >
              {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1).replace("_", " ")}
            </span>
            <span className="text-sm text-muted-foreground">#{report.id}</span>
          </div>
          <p className="mt-1 font-medium">{report.reported_name}</p>
          <p className="text-xs text-muted-foreground">
            Reported by {report.reporter_name} •{" "}
            {formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted-foreground">
              {getReasonLabel(report.reason)}
            </span>
          </div>
          {report.description && (
            <p className="mt-2 text-sm text-foreground/80">{report.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {currentStatus !== "dismissed" && currentStatus !== "action_taken" && (
            <button
              onClick={() => onUpdateStatus("reviewed")}
              className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition"
              title="Mark as reviewed"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
          {currentStatus !== "dismissed" && (
            <button
              onClick={() => onUpdateStatus("dismissed")}
              className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition"
              title="Dismiss"
            >
              <CheckCircle2 className="h-4 w-4" />
            </button>
          )}
          {currentStatus !== "action_taken" && (
            <button
              onClick={() => onUpdateStatus("action_taken")}
              className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
              title="Action taken"
            >
              <AlertCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "reviewed":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "dismissed":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "action_taken":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    default:
      return "bg-surface text-muted-foreground border-border";
  }
}
