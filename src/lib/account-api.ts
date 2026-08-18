import { firebaseAuth } from "@/lib/firebase";

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (isLocal ? "http://localhost:3001" : "");

async function getAuthHeaders(): Promise<HeadersInit> {
  const token = await firebaseAuth.getIdToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export interface AccountStatus {
  id: string | number;
  email: string;
  name: string;
  account_type: "pec_verified" | "fresher_temp";
  email_verified: boolean;
  pec_email?: string | null;
  is_fresher: boolean;
  is_admin: boolean;
}

/**
 * Request OTP to link a newly assigned PEC email address to the current fresher account
 */
export async function requestLinkPecEmail(pecEmail: string): Promise<{ success: boolean; message: string; debugOtp?: string }> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BACKEND_URL}/api/account/link-pec-email`, {
    method: "POST",
    headers,
    body: JSON.stringify({ pec_email: pecEmail }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to send PEC verification code.");
  }
  return data;
}

/**
 * Verify OTP and upgrade current account to pec_verified in-place
 */
export async function verifyAndLinkPecEmail(pecEmail: string, otp: string): Promise<{ success: boolean; message: string; user: any; token?: string }> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BACKEND_URL}/api/account/verify-link-pec-email`, {
    method: "POST",
    headers,
    body: JSON.stringify({ pec_email: pecEmail, otp }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to verify PEC verification code.");
  }
  return data;
}

/**
 * Fetch current account status from backend
 */
export async function fetchAccountStatus(): Promise<AccountStatus | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BACKEND_URL}/api/account/status`, { headers });
    if (!res.ok) return null;
    const data = await res.json();
    return data.account || null;
  } catch (err) {
    console.warn("Failed to fetch account status:", err);
    return null;
  }
}
