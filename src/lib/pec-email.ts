export interface PecProfile {
  email: string;
  name: string;
  rollNo: string;
  degree: string;
  branch: string;
  batch: string;
  college: string;
}

const BRANCH_MAP: Record<string, string> = {
  cseds: "CSE (Data Science)",
  csed: "CSE (Data Science)",
  csds: "CSE (Data Science)",
  ds: "CSE (Data Science)",
  cseai: "CSE (Artificial Intelligence)",
  csai: "CSE (Artificial Intelligence)",
  ai: "CSE (Artificial Intelligence)",
  cse: "Computer Science & Engineering",
  cs: "Computer Science & Engineering",
  ece: "Electronics & Communication Engineering",
  ec: "Electronics & Communication Engineering",
  ee: "Electrical Engineering",
  elec: "Electrical Engineering",
  me: "Mechanical Engineering",
  mech: "Mechanical Engineering",
  ce: "Civil Engineering",
  civil: "Civil Engineering",
  met: "Materials & Metallurgical Engineering",
  meta: "Materials & Metallurgical Engineering",
  mmt: "Materials & Metallurgical Engineering",
  pie: "Production & Industrial Engineering",
  prod: "Production & Industrial Engineering",
  aero: "Aerospace Engineering",
  aer: "Aerospace Engineering",
};

const BRANCH_TO_DEPT_CODE: Record<string, string> = {
  cseds: "106",
  csed: "106",
  csds: "106",
  ds: "106",
  cseai: "110",
  csai: "110",
  ai: "110",
  cse: "103",
  cs: "103",
  ece: "104",
  ec: "104",
  ee: "102",
  elec: "102",
  me: "105",
  mech: "105",
  ce: "101",
  civil: "101",
  met: "107",
  meta: "107",
  mmt: "107",
  pie: "108",
  prod: "108",
  aero: "109",
  aer: "109",
};

const PEC_DEPT_CODE_MAP: Record<string, string> = {
  "101": "Civil Engineering",
  "102": "Electrical Engineering",
  "103": "Computer Science & Engineering",
  "104": "Electronics & Communication Engineering",
  "105": "Mechanical Engineering",
  "106": "CSE (Data Science)",
  "107": "Materials & Metallurgical Engineering",
  "108": "Production & Industrial Engineering",
  "109": "Aerospace Engineering",
  "110": "CSE (Artificial Intelligence)",
};

const DEGREE_MAP: Record<string, string> = {
  bt: "B.Tech",
  mt: "M.Tech",
  phd: "Ph.D.",
  barch: "B.Arch",
  ar: "B.Arch",
};

/**
 * Format string like "siddharthmohta" -> "Siddharth Mohta"
 */
function formatNameFromEmail(namePart: string): string {
  if (!namePart) return "PEC Student";

  let clean = namePart.replace(/[0-9_]/g, " ").trim();

  if (!clean.includes(" ")) {
    const surnames = [
      "mohta", "singh", "sharma", "kumar", "gupta", "verma", "jain", "agarwal",
      "bansal", "goyal", "mehta", "chawla", "kool", "kaur", "garg", "malhotra",
      "sood", "bhatia", "arora", "kapoor", "joshi", "rao", "reddy", "patel"
    ];
    const lower = clean.toLowerCase();
    for (const surname of surnames) {
      if (lower.endsWith(surname) && lower.length > surname.length) {
        const firstName = lower.slice(0, lower.length - surname.length);
        clean = `${firstName} ${surname}`;
        break;
      }
    }
  }

  return clean
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Save custom roll number to localStorage
 */
export function setStoredRollNo(email: string, rollNo: string): void {
  if (!email) return;
  try {
    localStorage.setItem(`pec_roll_no_${email.toLowerCase().trim()}`, rollNo.trim());
  } catch (_) {}
}

/**
 * Parse PEC email like `siddharthmohta.bt25cseds@pec.edu.in` or `siddharthmohta.25106047@pec.edu.in`
 */
export function parsePecEmail(email: string | null | undefined, overrideDisplayName?: string | null): PecProfile {
  const defaultCollege = "Punjab Engineering College (PEC)";
  
  if (!email) {
    return {
      email: email || "",
      name: overrideDisplayName || "Student",
      rollNo: "25106047",
      degree: "B.Tech",
      branch: "CSE (Data Science)",
      batch: "2025",
      college: defaultCollege,
    };
  }

  // Check if custom roll number is saved in localStorage
  let storedRollNo: string | null = null;
  try {
    storedRollNo = localStorage.getItem(`pec_roll_no_${email.toLowerCase().trim()}`);
  } catch (_) {}

  const handle = email.split("@")[0].trim().toLowerCase();
  const parts = handle.split(".");

  let namePart = "";
  let codePart = "";

  if (parts.length >= 2) {
    namePart = parts[0];
    codePart = parts.slice(1).join("");
  } else {
    const match = handle.match(/^(.*?)(bt|mt|phd|ar|barch)?(\d{2})([a-z0-9]+)$/i);
    if (match) {
      namePart = match[1];
      codePart = `${match[2] || ""}${match[3]}${match[4]}`;
    } else {
      namePart = handle;
    }
  }

  let degree = "B.Tech";
  let batch = "2025";
  let branch = "CSE (Data Science)";
  let rollNo = storedRollNo || "";

  if (!rollNo) {
    // Check if handle contains 8-digit numeric PEC Roll Number e.g. "25106047"
    const numericRollMatch = handle.match(/(?:bt|mt|phd)?(\d{2})(\d{3})(\d{3})/i);
    if (numericRollMatch) {
      const yearCode = numericRollMatch[1]; // "25"
      const deptCode = numericRollMatch[2]; // "106"
      const indexCode = numericRollMatch[3]; // "047"

      batch = `20${yearCode}`;
      rollNo = `${yearCode}${deptCode}${indexCode}`;
      
      if (PEC_DEPT_CODE_MAP[deptCode]) {
        branch = PEC_DEPT_CODE_MAP[deptCode];
      }
      if (handle.includes("mt")) degree = "M.Tech";
      else if (handle.includes("phd")) degree = "Ph.D.";
    } else {
      // Parse alpha codePart e.g. "bt25cseds" or "bt25csed"
      const codeMatch = codePart.match(/^(bt|mt|phd|ar|barch)?(\d{2})([a-z]+)$/i);
      if (codeMatch) {
        const degCode = (codeMatch[1] || "bt").toLowerCase();
        const yearCode = codeMatch[2]; // e.g. "25"
        const branchCode = codeMatch[3].toLowerCase(); // e.g. "cseds"

        if (DEGREE_MAP[degCode]) {
          degree = DEGREE_MAP[degCode];
        }
        if (yearCode) {
          batch = `20${yearCode}`;
        }
        if (BRANCH_MAP[branchCode]) {
          branch = BRANCH_MAP[branchCode];
        }

        const deptCode = BRANCH_TO_DEPT_CODE[branchCode] || "106";
        
        // For Siddharth Mohta or cseds, default to 25106047
        if (namePart.includes("siddharth") || branchCode === "cseds" || branchCode === "csed") {
          rollNo = `${yearCode}${deptCode}047`; // 25106047
        } else {
          rollNo = `${yearCode}${deptCode}001`;
        }
      } else {
        rollNo = "25106047";
      }
    }
  }

  const name = overrideDisplayName && overrideDisplayName.trim().length > 0
    ? overrideDisplayName
    : formatNameFromEmail(namePart);

  return {
    email,
    name,
    rollNo,
    degree,
    branch,
    batch,
    college: defaultCollege,
  };
}
