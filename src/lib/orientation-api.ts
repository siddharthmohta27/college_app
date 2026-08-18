import { firebaseAuth } from "@/lib/firebase";

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const API_BASE = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api/orientation`
  : isLocal
    ? "http://localhost:3001/api/orientation"
    : "/api/orientation";

export interface OrientationData {
  success: boolean;
  map?: {
    title: string;
    image_url: string;
    extracted_text?: string;
  };
  venue?: {
    title: string;
    image_url: string;
    extracted_text?: string;
  };
  schedule?: Array<{
    id: number | string;
    time_slot?: string;
    time?: string;
    activity: string;
    venue: string;
    coordinator?: string;
    category?: "morning" | "inaugural" | "lunch" | "afternoon" | "general";
    sort_order?: number;
  }>;
}

export async function fetchOrientationData(): Promise<OrientationData | null> {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) {
      console.warn("Failed to fetch orientation from backend, status:", res.status);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Orientation API unreachable, using local fallback:", err);
    return null;
  }
}

export async function uploadOrientationData(payload: {
  map?: { title?: string; image_url?: string; extracted_text?: string };
  venue?: { title?: string; image_url?: string; extracted_text?: string };
  schedule?: any[];
}) {
  const token = await firebaseAuth.getIdToken();
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Failed to upload orientation content");
  }
  return json;
}
