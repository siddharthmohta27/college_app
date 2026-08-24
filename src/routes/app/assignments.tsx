import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  ExternalLink,
  Calendar,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter,
  BookOpen,
  GraduationCap,
  Users,
  X,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";
import { parsePecEmail } from "@/lib/pec-email";
import { getSectionFromRollNo } from "@/lib/pec-timetable";
import {
  fetchSectionAssignments,
  createSectionAssignment,
  deleteSectionAssignment,
  toggleAssignmentProgress,
  checkCRStatus,
  fetchAllCRs,
  assignCRRole,
  revokeCRRole,
  type SectionAssignment,
  type CRStatus,
  type CRAssignmentRecord,
} from "@/lib/cr-api";

export const Route = createFileRoute("/app/assignments")({
  head: () => ({
    meta: [{ title: "Assignments & Deadlines — Campus Connect" }],
  }),
  component: AssignmentsPage,
});

function AssignmentsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<SectionAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [crStatus, setCrStatus] = useState<CRStatus>({ isCR: false, assignedSections: [], isAdmin: false });

  // Filtering & Search
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "due_soon" | "completed">("pending");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdminCRModal, setShowAdminCRModal] = useState(false);
  const [allCRs, setAllCRs] = useState<CRAssignmentRecord[]>([]);

  // Form State for new assignment
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("Python for Data Science");
  const [newSubjectCode, setNewSubjectCode] = useState("DSN3002");
  const [newDueDate, setNewDueDate] = useState("");
  const [newDueTime, setNewDueTime] = useState("23:59");
  const [newFormat, setNewFormat] = useState("PDF on Google Classroom");
  const [newMaterialUrl, setNewMaterialUrl] = useState("");
  const [newMaxMarks, setNewMaxMarks] = useState("10");
  const [newDescription, setNewDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Form State for Admin CR assignment
  const [assignEmail, setAssignEmail] = useState("");
  const [assignSection, setAssignSection] = useState("DS1");
  const [assignName, setAssignName] = useState("");
  const [adminAssigning, setAdminAssigning] = useState(false);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((u) => {
      setEmail(u?.email ?? null);
      setDisplayName(u?.displayName ?? null);
    });
    return unsub;
  }, []);

  const profile = parsePecEmail(email, displayName);
  const detectedSection = getSectionFromRollNo(profile.rollNo) || "DS1";
  const [activeSection, setActiveSection] = useState<string>(detectedSection);

  useEffect(() => {
    if (detectedSection) {
      setActiveSection(detectedSection);
    }
  }, [detectedSection]);

  // Load CR status
  useEffect(() => {
    checkCRStatus(email).then(setCrStatus);
  }, [email]);

  const isAuthorizedForActiveSection =
    crStatus.isAdmin ||
    crStatus.assignedSections.map((s) => s.toUpperCase()).includes(activeSection.toUpperCase());

  // Load assignments
  const loadAssignments = async () => {
    setLoading(true);
    const data = await fetchSectionAssignments(activeSection);
    setAssignments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAssignments();
  }, [activeSection]);

  // Load CRs list for Admin
  const loadCRList = async () => {
    if (crStatus.isAdmin) {
      const crs = await fetchAllCRs();
      setAllCRs(crs);
    }
  };

  // Toggle Done
  const handleToggle = async (assignmentId: number) => {
    // Optimistic UI update
    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, is_completed: !a.is_completed } : a))
    );

    const res = await toggleAssignmentProgress(assignmentId);
    if (!res.success) {
      // Revert if error
      setAssignments((prev) =>
        prev.map((a) => (a.id === assignmentId ? { ...a, is_completed: !a.is_completed } : a))
      );
    }
  };

  // Delete Assignment
  const handleDelete = async (assignmentId: number) => {
    if (!window.confirm("Are you sure you want to delete this assignment for the section?")) return;
    const res = await deleteSectionAssignment(assignmentId);
    if (res.success) {
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
    } else {
      alert(res.error || "Failed to delete assignment");
    }
  };

  // Create Assignment Form Submit
  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDueDate) {
      setFormError("Please fill title and due date");
      return;
    }

    setSubmitting(true);
    setFormError("");

    const fullDueDateTime = new Date(`${newDueDate}T${newDueTime || "23:59"}:00`).toISOString();

    const res = await createSectionAssignment({
      section: activeSection,
      subject: newSubject,
      subjectCode: newSubjectCode,
      title: newTitle.trim(),
      description: newDescription.trim(),
      dueDate: fullDueDateTime,
      submissionFormat: newFormat,
      materialUrl: newMaterialUrl.trim() || undefined,
      maxMarks: newMaxMarks ? parseInt(newMaxMarks, 10) : undefined,
    });

    setSubmitting(false);

    if (res.success && res.assignment) {
      setAssignments((prev) => [res.assignment!, ...prev]);
      setShowAddModal(false);
      // Reset form
      setNewTitle("");
      setNewDescription("");
      setNewMaterialUrl("");
    } else {
      setFormError(res.error || "Failed to create assignment");
    }
  };

  // Admin Assign CR Form Submit
  const handleAssignCR = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignEmail.trim()) return;
    setAdminAssigning(true);
    const res = await assignCRRole({
      email: assignEmail.trim(),
      section: assignSection,
      name: assignName.trim() || undefined,
    });
    setAdminAssigning(false);
    if (res.success) {
      loadCRList();
      setAssignEmail("");
      setAssignName("");
      alert(`✅ CR role granted for ${assignSection}!`);
    } else {
      alert(res.error || "Failed to assign CR");
    }
  };

  // Admin Revoke CR
  const handleRevokeCR = async (id: number | string) => {
    if (typeof id === "string") {
      alert("Pre-configured CRs are set in src/config/crs.ts and can be edited there.");
      return;
    }
    if (!window.confirm("Revoke CR role for this student?")) return;
    const res = await revokeCRRole(id);
    if (res.success) {
      loadCRList();
    } else {
      alert(res.error || "Failed to revoke CR");
    }
  };

  // Unique Subjects for filter
  const subjectsList = useMemo(() => {
    const set = new Set(assignments.map((a) => a.subject));
    return ["all", ...Array.from(set)];
  }, [assignments]);

  // Compute Deadlines & Stats
  const now = new Date().getTime();
  const enhancedAssignments = useMemo(() => {
    return assignments.map((a) => {
      const dueTime = new Date(a.due_date).getTime();
      const diffMs = dueTime - now;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

      const isOverdue = diffMs < 0 && !a.is_completed;
      const isDueSoon = diffMs > 0 && diffHours <= 48; // within 48 hours

      let urgencyLabel = "";
      let urgencyColor = "text-muted-foreground bg-surface/50 border-border";

      if (a.is_completed) {
        urgencyLabel = "Completed";
        urgencyColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      } else if (isOverdue) {
        urgencyLabel = "Overdue";
        urgencyColor = "text-rose-400 bg-rose-500/10 border-rose-500/30 font-bold";
      } else if (diffHours <= 12) {
        urgencyLabel = `Due in ${diffHours}h 🔥`;
        urgencyColor = "text-amber-400 bg-amber-500/15 border-amber-500/30 font-bold animate-pulse";
      } else if (diffDays <= 1) {
        urgencyLabel = "Due Tomorrow ⚡";
        urgencyColor = "text-amber-400 bg-amber-500/10 border-amber-500/30 font-semibold";
      } else if (diffDays <= 2) {
        urgencyLabel = `Due in ${diffDays} days`;
        urgencyColor = "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      } else {
        urgencyLabel = `Due in ${diffDays} days`;
        urgencyColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      }

      return {
        ...a,
        isOverdue,
        isDueSoon,
        diffDays,
        urgencyLabel,
        urgencyColor,
      };
    });
  }, [assignments, now]);

  // Filtered List
  const filteredAssignments = useMemo(() => {
    return enhancedAssignments.filter((a) => {
      // Tab filter
      if (activeTab === "pending" && a.is_completed) return false;
      if (activeTab === "due_soon" && (a.is_completed || (!a.isDueSoon && !a.isOverdue))) return false;
      if (activeTab === "completed" && !a.is_completed) return false;

      // Subject filter
      if (selectedSubject !== "all" && a.subject !== selectedSubject) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.subject.toLowerCase().includes(q) ||
          (a.description && a.description.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [enhancedAssignments, activeTab, selectedSubject, searchQuery]);

  const pendingCount = enhancedAssignments.filter((a) => !a.is_completed).length;
  const dueSoonCount = enhancedAssignments.filter((a) => !a.is_completed && (a.isDueSoon || a.isOverdue)).length;
  const completedCount = enhancedAssignments.filter((a) => a.is_completed).length;
  const totalCount = enhancedAssignments.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-24 md:pb-12">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/app" className="hover:text-foreground transition">Dashboard</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/app/timetable" className="hover:text-foreground transition">Timetable</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Assignments</span>
        </div>

        <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
              <FileText className="h-6 w-6 text-primary" />
              Assignments & Deadlines Hub
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Official section coursework, submissions, study materials, and due dates.
            </p>
          </div>

          {/* Section Selector / CR Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl border border-border bg-surface/60 p-1">
              {["DS1", "DS2", "DS3", "CSE-1", "AI-1", "ECE-G1"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    activeSection === sec
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {isAuthorizedForActiveSection && (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-amber-500 px-3.5 py-2 text-xs font-bold text-black shadow-lg shadow-primary/20 transition hover:opacity-90 active:scale-95"
              >
                <Plus className="h-4 w-4" /> Post Assignment
              </button>
            )}

            {crStatus.isAdmin && (
              <button
                onClick={() => {
                  loadCRList();
                  setShowAdminCRModal(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface/70 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Manage CRs
              </button>
            )}
          </div>
        </div>

        {/* Section CR Authority Status Banner */}
        {isAuthorizedForActiveSection && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-medium text-primary animate-fade-up">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>
              You have <strong>Class Representative (CR)</strong> authority for <strong>Section {activeSection}</strong>. You can post new assignments, set deadlines, and attach materials.
            </span>
          </div>
        )}
      </div>

      {/* Progress & Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up">
        <div className="rounded-2xl border border-border bg-surface/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Pending ASG</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-2 text-2xl font-black text-foreground">{pendingCount}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Needs submission</p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-amber-400 uppercase">Due Soon</span>
            <Flame className="h-4 w-4 text-amber-400 animate-pulse" />
          </div>
          <p className="mt-2 text-2xl font-black text-amber-400">{dueSoonCount}</p>
          <p className="text-[10px] text-amber-300/80 mt-0.5">Next 48 hours</p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase">Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-400">{completedCount}</p>
          <p className="text-[10px] text-emerald-300/80 mt-0.5">Submitted by you</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Progress</span>
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-black text-primary">{progressPercent}%</p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="space-y-3 animate-fade-up">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            <button
              onClick={() => setActiveTab("pending")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "pending"
                  ? "bg-primary text-black"
                  : "bg-surface/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Clock className="h-3.5 w-3.5" /> Pending ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab("due_soon")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "due_soon"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                  : "bg-surface/60 text-muted-foreground hover:text-amber-400"
              }`}
            >
              <Flame className="h-3.5 w-3.5" /> Due Soon ({dueSoonCount})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "completed"
                  ? "bg-emerald-500 text-black"
                  : "bg-surface/60 text-muted-foreground hover:text-emerald-400"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Completed ({completedCount})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "all"
                  ? "bg-surface text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({totalCount})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assignment or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface/70 pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Subject Chip Filter */}
        {subjectsList.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide text-xs">
            <span className="text-muted-foreground font-semibold shrink-0 text-[11px] mr-1">Subject:</span>
            {subjectsList.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium shrink-0 transition ${
                  selectedSubject === subj
                    ? "bg-foreground/15 text-foreground font-bold border border-foreground/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface"
                }`}
              >
                {subj === "all" ? "All Subjects" : subj}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Assignments List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-muted-foreground">Loading section assignments...</div>
      ) : filteredAssignments.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface/40 p-12 text-center animate-fade-up">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400/80 mb-3" />
          <h3 className="text-base font-bold text-foreground">
            {activeTab === "completed"
              ? "No completed assignments yet"
              : activeTab === "due_soon"
              ? "No urgent assignments due in the next 48 hours 🎉"
              : "All caught up! No pending assignments for Section " + activeSection}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
            {isAuthorizedForActiveSection
              ? "You are the CR for this section. Click '+ Post Assignment' above to add coursework or problem sets."
              : "Your CR will post new problem sheets and submission links here."}
          </p>
          {isAuthorizedForActiveSection && (
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-black shadow-md hover:opacity-90 transition"
            >
              <Plus className="h-4 w-4" /> Post First Assignment
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3.5 animate-fade-up">
          {filteredAssignments.map((asg) => (
            <div
              key={asg.id}
              className={`group relative rounded-2xl border p-5 transition-all duration-200 ${
                asg.is_completed
                  ? "border-emerald-500/20 bg-emerald-950/5 opacity-80"
                  : asg.isOverdue
                  ? "border-rose-500/30 bg-rose-500/5"
                  : asg.isDueSoon
                  ? "border-amber-500/30 bg-amber-500/5 shadow-sm shadow-amber-500/5"
                  : "border-border bg-surface/60 hover:border-primary/40 hover:bg-surface/80"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Checkbox + Title */}
                <div className="flex items-start gap-3.5 flex-1">
                  <button
                    onClick={() => handleToggle(asg.id)}
                    className="mt-1 text-muted-foreground hover:text-emerald-400 transition"
                    title={asg.is_completed ? "Mark as Pending" : "Mark as Completed"}
                  >
                    {asg.is_completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition" />
                    )}
                  </button>

                  <div className="space-y-1.5 flex-1">
                    {/* Subject Pill & Urgency Badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                        <BookOpen className="h-3 w-3" />
                        {asg.subject_code ? `${asg.subject_code} · ` : ""}
                        {asg.subject}
                      </span>

                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] border ${asg.urgencyColor}`}>
                        <Clock className="h-2.5 w-2.5" />
                        {asg.urgencyLabel}
                      </span>

                      {asg.max_marks && (
                        <span className="rounded-full bg-surface border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          {asg.max_marks} Marks
                        </span>
                      )}
                    </div>

                    {/* Assignment Title */}
                    <h3 className={`text-base font-bold leading-snug ${asg.is_completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {asg.title}
                    </h3>

                    {/* Description */}
                    {asg.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line pt-0.5">
                        {asg.description}
                      </p>
                    )}

                    {/* Meta Bar */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        <span>Due: <strong>{new Date(asg.due_date).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })} at {new Date(asg.due_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</strong></span>
                      </div>

                      <span className="text-border">·</span>

                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground/90">Format:</span>
                        <span className="rounded-md bg-surface px-1.5 py-0.5 border border-border text-[10px]">
                          {asg.submission_format}
                        </span>
                      </div>

                      {asg.created_by_name && (
                        <>
                          <span className="text-border">·</span>
                          <span>Posted by <strong className="text-foreground">{asg.created_by_name}</strong></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {asg.material_url && (
                    <a
                      href={asg.material_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> View Material
                    </a>
                  )}

                  {isAuthorizedForActiveSection && (
                    <button
                      onClick={() => handleDelete(asg.id)}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-400 transition"
                      title="Delete assignment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── ADD ASSIGNMENT MODAL (CR & ADMIN ONLY) ────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl animate-scale-in my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Post New Assignment</h2>
                  <p className="text-xs text-muted-foreground">Section {activeSection} Deadlines & Material</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {formError && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateAssignment} className="mt-4 space-y-4 text-xs">
              {/* Subject Selection */}
              <div>
                <label className="block font-semibold text-foreground mb-1">Subject</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Subject Name (e.g. Python for Data Science)"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Subject Code (e.g. DSN3002)"
                    value={newSubjectCode}
                    onChange={(e) => setNewSubjectCode(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold text-foreground mb-1">Assignment Title / Topic *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Assignment 1: Matrix Multiplication & NumPy"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Due Date & Time */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-foreground mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-foreground mb-1">Due Time</label>
                  <input
                    type="time"
                    value={newDueTime}
                    onChange={(e) => setNewDueTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Submission Format & Max Marks */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-foreground mb-1">Submission Format</label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="PDF on Google Classroom">PDF on Google Classroom</option>
                    <option value="Handwritten in Tutorial">Handwritten Hardcopy in Tutorial</option>
                    <option value="Portal Zip / GitHub Link">Portal Zip / GitHub Link</option>
                    <option value="Email to Faculty">Email to Faculty</option>
                    <option value="Lab Practical Demonstration">Lab Practical Demonstration</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-foreground mb-1">Max Marks (Optional)</label>
                  <input
                    type="number"
                    placeholder="e.g. 10"
                    value={newMaxMarks}
                    onChange={(e) => setNewMaxMarks(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Material Link */}
              <div>
                <label className="block font-semibold text-foreground mb-1">Material / Problem Sheet Link (Google Drive / Docs)</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={newMaterialUrl}
                  onChange={(e) => setNewMaterialUrl(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Description / Instructions */}
              <div>
                <label className="block font-semibold text-foreground mb-1">Instructions / Details</label>
                <textarea
                  rows={3}
                  placeholder="Mention problem sheet instructions, formatting rules, or faculty guidance..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-black shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? "Posting..." : "Post to Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ADMIN CR MANAGEMENT MODAL ────────────────────────────────────── */}
      {showAdminCRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl border border-border bg-background p-6 shadow-2xl animate-scale-in my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Manage Class Representatives (CRs)</h2>
              </div>
              <button
                onClick={() => setShowAdminCRModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Add CR Form */}
            <form onSubmit={handleAssignCR} className="mt-4 rounded-xl border border-border/80 bg-surface/50 p-4 space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Assign New Section CR</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="email"
                  required
                  placeholder="Student PEC Email"
                  value={assignEmail}
                  onChange={(e) => setAssignEmail(e.target.value)}
                  className="rounded-xl border border-border bg-surface p-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Student Name"
                  value={assignName}
                  onChange={(e) => setAssignName(e.target.value)}
                  className="rounded-xl border border-border bg-surface p-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
                <select
                  value={assignSection}
                  onChange={(e) => setAssignSection(e.target.value)}
                  className="rounded-xl border border-border bg-surface p-2 text-xs text-foreground focus:border-primary focus:outline-none"
                >
                  {["DS1", "DS2", "DS3", "CSE-1", "CSE-2", "CSE-3", "CSE-4", "AI-1", "AI-2", "ECE-G1", "ECE-G2", "ECE-G3"].map((s) => (
                    <option key={s} value={s}>Section {s}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={adminAssigning}
                className="w-full rounded-xl bg-primary py-2 text-xs font-bold text-black hover:opacity-90 disabled:opacity-50"
              >
                {adminAssigning ? "Assigning..." : "Grant CR Authority"}
              </button>
            </form>

            {/* Active CR List */}
            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-1">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Active Class Representatives</h3>
              {allCRs.map((cr) => (
                <div key={`${cr.section}_${cr.college_email}`} className="flex items-center justify-between rounded-xl border border-border bg-surface/30 p-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{cr.student_name || cr.college_email.split("@")[0]}</span>
                      <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                        Section {cr.section}
                      </span>
                      {cr.is_preconfigured && (
                        <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[10px] font-semibold text-violet-400">
                          Pre-configured
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{cr.college_email}</span>
                  </div>

                  {!cr.is_preconfigured && (
                    <button
                      onClick={() => handleRevokeCR(cr.id)}
                      className="rounded-lg px-2.5 py-1 text-[11px] font-semibold text-rose-400 hover:bg-rose-500/10 transition"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
