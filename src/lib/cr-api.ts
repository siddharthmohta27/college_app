import { firebaseAuth } from "./firebase";
import { isPreConfiguredCR, getPreConfiguredSections } from "@/config/crs";

const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (isLocal ? "http://localhost:3001" : "");

async function getAuthToken(): Promise<string | null> {
  const user = firebaseAuth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

export interface TimetableOverride {
  id: number;
  section: string;
  override_date: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  status: "cancelled" | "room_change" | "extra_class" | "rescheduled";
  subject?: string;
  code?: string;
  faculty?: string;
  original_room?: string;
  updated_room?: string;
  reason?: string;
  created_by_name?: string;
  created_at: string;
}

export interface SectionAssignment {
  id: number;
  section: string;
  subject: string;
  subject_code?: string;
  title: string;
  description?: string;
  due_date: string;
  submission_format: string;
  material_url?: string;
  max_marks?: number;
  created_by_name?: string;
  created_at: string;
  is_completed: boolean;
  completed_at?: string;
}

export interface CRStatus {
  isCR: boolean;
  assignedSections: string[];
  isAdmin: boolean;
}

export interface CRAssignmentRecord {
  id: number | string;
  auth_user_id: string;
  college_email: string;
  student_name?: string;
  section: string;
  is_preconfigured?: boolean;
  created_at: string;
}

// ──────────────────────────────────────────────────────────────
// Timetable Overrides API
// ──────────────────────────────────────────────────────────────

export async function fetchTimetableOverrides(section: string, date?: string): Promise<TimetableOverride[]> {
  try {
    const token = await getAuthToken();
    let url = `${BACKEND_URL}/api/timetable/overrides?section=${encodeURIComponent(section)}`;
    if (date) url += `&date=${encodeURIComponent(date)}`;

    const res = await fetch(url, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.overrides || [];
  } catch (err) {
    console.error("Failed to fetch timetable overrides:", err);
    return [];
  }
}

export async function createTimetableOverride(data: {
  section: string;
  overrideDate: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  status: "cancelled" | "room_change" | "extra_class" | "rescheduled";
  subject?: string;
  code?: string;
  faculty?: string;
  originalRoom?: string;
  updatedRoom?: string;
  reason?: string;
}): Promise<{ success: boolean; override?: TimetableOverride; error?: string }> {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: "Please log in" };

    const res = await fetch(`${BACKEND_URL}/api/timetable/overrides`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();
    if (!res.ok) return { success: false, error: body.message || body.error || "Failed to create override" };
    return { success: true, override: body.override };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error" };
  }
}

export async function deleteTimetableOverride(overrideId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: "Please log in" };

    const res = await fetch(`${BACKEND_URL}/api/timetable/overrides/${overrideId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await res.json();
    if (!res.ok) return { success: false, error: body.message || body.error || "Failed to remove override" };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error" };
  }
}

// ──────────────────────────────────────────────────────────────
// CR Status & Admin Management
// ──────────────────────────────────────────────────────────────

export async function checkCRStatus(userEmail?: string | null): Promise<CRStatus> {
  // Check code config first for instant local resolution
  const preSections = getPreConfiguredSections(userEmail);

  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        isCR: preSections.length > 0,
        assignedSections: preSections,
        isAdmin: false,
      };
    }

    const res = await fetch(`${BACKEND_URL}/api/timetable/cr-status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return {
        isCR: preSections.length > 0,
        assignedSections: preSections,
        isAdmin: false,
      };
    }

    const data = await res.json();
    const mergedSections = Array.from(new Set([...preSections, ...(data.assignedSections || [])]));

    return {
      isCR: mergedSections.length > 0 || data.isAdmin,
      assignedSections: mergedSections,
      isAdmin: Boolean(data.isAdmin),
    };
  } catch {
    return {
      isCR: preSections.length > 0,
      assignedSections: preSections,
      isAdmin: false,
    };
  }
}

export async function fetchAllCRs(): Promise<CRAssignmentRecord[]> {
  try {
    const token = await getAuthToken();
    if (!token) return [];

    const res = await fetch(`${BACKEND_URL}/api/timetable/admin/crs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.crs || [];
  } catch (err) {
    console.error("Failed to fetch CRs:", err);
    return [];
  }
}

export async function assignCRRole(data: { email: string; section: string; name?: string }): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: "Please log in" };

    const res = await fetch(`${BACKEND_URL}/api/timetable/admin/assign-cr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();
    if (!res.ok) return { success: false, error: body.error || "Failed to assign CR" };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error" };
  }
}

export async function revokeCRRole(crId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: "Please log in" };

    const res = await fetch(`${BACKEND_URL}/api/timetable/admin/revoke-cr/${crId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await res.json();
    if (!res.ok) return { success: false, error: body.error || "Failed to revoke CR" };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error" };
  }
}

// ──────────────────────────────────────────────────────────────
// Section Assignments API
// ──────────────────────────────────────────────────────────────

export async function fetchSectionAssignments(section: string): Promise<SectionAssignment[]> {
  try {
    const token = await getAuthToken();
    const url = `${BACKEND_URL}/api/assignments?section=${encodeURIComponent(section)}`;

    const res = await fetch(url, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.assignments || [];
  } catch (err) {
    console.error("Failed to fetch assignments:", err);
    return [];
  }
}

export async function createSectionAssignment(data: {
  section: string;
  subject: string;
  subjectCode?: string;
  title: string;
  description?: string;
  dueDate: string;
  submissionFormat: string;
  materialUrl?: string;
  maxMarks?: number;
}): Promise<{ success: boolean; assignment?: SectionAssignment; error?: string }> {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: "Please log in" };

    const res = await fetch(`${BACKEND_URL}/api/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();
    if (!res.ok) return { success: false, error: body.message || body.error || "Failed to create assignment" };
    return { success: true, assignment: body.assignment };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error" };
  }
}

export async function deleteSectionAssignment(assignmentId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: "Please log in" };

    const res = await fetch(`${BACKEND_URL}/api/assignments/${assignmentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await res.json();
    if (!res.ok) return { success: false, error: body.message || body.error || "Failed to delete assignment" };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error" };
  }
}

export async function toggleAssignmentProgress(assignmentId: number): Promise<{ success: boolean; isCompleted?: boolean; error?: string }> {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, error: "Please log in" };

    const res = await fetch(`${BACKEND_URL}/api/assignments/${assignmentId}/toggle-done`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await res.json();
    if (!res.ok) return { success: false, error: body.error || "Failed to toggle status" };
    return { success: true, isCompleted: body.isCompleted };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error" };
  }
}
