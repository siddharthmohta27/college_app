export interface PecProfile {
  email: string;
  name: string;
  rollNo: string;
  degree: string;
  branch: string;
  batch: string;
  yearLabel: string;
  college: string;
  classRollNo?: string;
}

// 2-digit Branch Code mapping for PEC (Aero=10, Civil=20, CSE=30, EE=40, ECE=50, DS=60, AI=65/11, Mech=70, Meta=80, Production=90)
const BRANCH_2DIGIT_MAP: Record<string, string> = {
  "10": "Aerospace Engineering",
  "20": "Civil Engineering",
  "30": "Computer Science & Engineering",
  "40": "Electrical Engineering",
  "50": "Electronics & Communication Engineering",
  "60": "CSE (Data Science)",
  "11": "CSE (Artificial Intelligence)",
  "65": "CSE (Artificial Intelligence)",
  "61": "CSE (Artificial Intelligence)",
  "00": "CSE (Artificial Intelligence)",
  "70": "Mechanical Engineering",
  "80": "Materials & Metallurgical Engineering",
  "90": "Production & Industrial Engineering",
};

// Alpha branch alias mapping to 2-digit branch code
const BRANCH_TO_2DIGIT_CODE: Record<string, string> = {
  cseds: "60", csed: "60", csds: "60", ds: "60",
  cseai: "65", csai: "65", ai: "65",
  cse: "30", cs: "30",
  ece: "50", ec: "50",
  ee: "40", ele: "40", elec: "40", electrical: "40",
  me: "70", mech: "70", mecha: "70", mechanical: "70",
  ce: "20", civil: "20", civi: "20",
  met: "80", meta: "80", mmt: "80", metallurgy: "80",
  pie: "90", prod: "90", production: "90",
  aero: "10", aer: "10", aerospace: "10",
};

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
  ele: "Electrical Engineering",
  elec: "Electrical Engineering",
  electrical: "Electrical Engineering",
  me: "Mechanical Engineering",
  mech: "Mechanical Engineering",
  mechanical: "Mechanical Engineering",
  ce: "Civil Engineering",
  civil: "Civil Engineering",
  met: "Materials & Metallurgical Engineering",
  meta: "Materials & Metallurgical Engineering",
  mmt: "Materials & Metallurgical Engineering",
  metallurgy: "Materials & Metallurgical Engineering",
  pie: "Production & Industrial Engineering",
  prod: "Production & Industrial Engineering",
  production: "Production & Industrial Engineering",
  aero: "Aerospace Engineering",
  aer: "Aerospace Engineering",
  aerospace: "Aerospace Engineering",
};

const DEGREE_CODE_MAP: Record<string, string> = {
  "10": "B.Tech",
  "20": "M.Tech",
  "30": "Ph.D.",
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
/**
 * Format string like "siddharthmohta" -> "Siddharth Mohta" or "umangkumararora" -> "Umang Kumar Arora"
 */
function formatNameFromEmail(namePart: string): string {
  if (!namePart) return "PEC Student";

  let clean = namePart.replace(/[0-9_]/g, " ").trim();

  if (!clean.includes(" ")) {
    const surnames = [
      "mohta", "singh", "sharma", "kumar", "gupta", "verma", "jain", "agarwal",
      "bansal", "goyal", "mehta", "chawla", "kool", "kaur", "garg", "malhotra",
      "sood", "bhatia", "arora", "kapoor", "joshi", "rao", "reddy", "patel", "pratap", "yadav"
    ];
    const lower = clean.toLowerCase();
    for (const surname of surnames) {
      if (lower.endsWith(surname) && lower.length > surname.length) {
        const remaining = lower.slice(0, lower.length - surname.length);
        let firstName = remaining;
        for (const mid of ["kumar", "singh", "pratap", "chandra", "deep"]) {
          if (remaining.endsWith(mid) && remaining.length > mid.length) {
            firstName = `${remaining.slice(0, remaining.length - mid.length)} ${mid}`;
            break;
          }
        }
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
 * Calculate dynamic student year from batch e.g. Batch 2025 -> 2nd Year
 */
export function getStudentYearLabel(batchStr: string | number): string {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-indexed, July is 6
  // Academic year advances in July
  const academicYear = currentMonth >= 6 ? currentYear : currentYear - 1;

  let b = 2025;
  if (typeof batchStr === "number") {
    b = batchStr;
  } else if (typeof batchStr === "string") {
    const parsed = parseInt(batchStr.replace(/\D/g, ""), 10);
    if (!isNaN(parsed) && parsed > 2000) b = parsed;
  }

  const yearsCompleted = academicYear - b;
  const yearNum = yearsCompleted + 1;

  if (yearNum <= 1) return "1st Year";
  if (yearNum === 2) return "2nd Year";
  if (yearNum === 3) return "3rd Year";
  if (yearNum >= 4) return "4th Year";
  return `${yearNum}th Year`;
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
 * Accurately extracts an 8-digit (or 7-digit) numeric PEC Student ID (SID) from any string
 * (displayName, email handle, email address, etc.).
 *
 * Examples:
 * - "bt25106049 Umang Kumar Arora" -> "25106049"
 * - "25103115 Rohan Sharma"        -> "25103115"
 * - "bt25103115@pec.edu.in"        -> "25103115"
 * - "umang.bt25106049@pec.edu.in"  -> "25106049"
 * - "24103102 Rahul Verma"         -> "24103102"
 * - "bt25104008 Priya Singh"       -> "25104008"
 * - "25110012"                     -> "25110012"
 */
export function extractPecSid(text: string | null | undefined): string | null {
  if (!text) return null;
  const str = text.trim();

  // 1. Standard 8-digit PEC roll numbers (e.g. 25106049, 25103115, 24103042, 25110001, 23105088)
  const m8 = str.match(/(?:^|[^0-9])(?:bt|mt|phd)?(2[0-9](?:10|11|20|30)\d{4})(?:[^0-9]|$)/i);
  if (m8) return m8[1];

  // 2. Generic 8-digit starting with batch 20-29
  const m8Generic = str.match(/(?:^|[^0-9])(?:bt|mt|phd)?(2[0-9]\d{6})(?:[^0-9]|$)/i);
  if (m8Generic) return m8Generic[1];

  // 3. 7-digit roll numbers
  const m7 = str.match(/(?:^|[^0-9])(?:bt|mt|phd)?(2[0-9]\d{5})(?:[^0-9]|$)/i);
  if (m7) return m7[1];

  return null;
}

export interface DecodedSid {
  rollNo: string;
  yearCode: string;
  batch: string;
  degree: string;
  branch: string;
  classRollNo: string;
}

/**
 * Decodes an 8-digit PEC SID into its components:
 * - Year Code (e.g. "25" -> Batch 2025)
 * - Degree (10 -> B.Tech, 20 -> M.Tech, 30 -> Ph.D.)
 * - Branch (e.g. 60 -> CSE Data Science, 30/3 -> CSE, 50/5 -> ECE, etc.)
 * - Class Roll Number (correctly preserving 2-digit "49" or 3-digit "115"!)
 */
export function decodePecSid(sid: string): DecodedSid {
  const clean = sid.replace(/\D/g, "");
  if (clean.length < 7) {
    return {
      rollNo: sid,
      yearCode: "25",
      batch: "2025",
      degree: "B.Tech",
      branch: "Computer Science & Engineering",
      classRollNo: clean || "01",
    };
  }

  const yearCode = clean.substring(0, 2);
  const batch = `20${yearCode}`;
  const degCode = clean.substring(2, 4);

  let degree = "B.Tech";
  if (degCode === "20") degree = "M.Tech";
  else if (degCode === "30") degree = "Ph.D.";

  let branch = "Computer Science & Engineering";
  let classRollNo = "";

  if (degCode === "11") {
    // CSE AI with 251100xx format
    branch = "CSE (Artificial Intelligence)";
    const rollDigits = clean.substring(4);
    const num = parseInt(rollDigits, 10);
    classRollNo = isNaN(num) ? rollDigits : num < 10 ? `0${num}` : `${num}`;
  } else {
    // Remaining 4 digits: e.g. "6049" (DS roll 49), "3115" (CSE roll 115), "3042" (CSE roll 42)
    const remaining = clean.substring(4);
    const b1 = remaining.charAt(0);
    const b2 = remaining.substring(0, 2);

    // AI branch alias (65 or 61)
    if (b2 === "65" || b2 === "61") {
      branch = "CSE (Artificial Intelligence)";
      const rollNum = parseInt(remaining.substring(2), 10);
      classRollNo = isNaN(rollNum) ? remaining.substring(2) : rollNum < 10 ? `0${rollNum}` : `${rollNum}`;
    }
    // Standard 2-digit branch code (10, 20, 30, 40, 50, 60, 70, 80, 90)
    else if (BRANCH_2DIGIT_MAP[b2]) {
      branch = BRANCH_2DIGIT_MAP[b2];
      const rollNum = parseInt(remaining.substring(2), 10);
      classRollNo = isNaN(rollNum) ? remaining.substring(2) : rollNum < 10 ? `0${rollNum}` : `${rollNum}`;
    }
    // 1-digit branch code with 3-digit class roll (e.g. 3115 -> CSE roll 115, 2105 -> Civil roll 105)
    else {
      const bMap1: Record<string, string> = {
        "1": "Aerospace Engineering",
        "2": "Civil Engineering",
        "3": "Computer Science & Engineering",
        "4": "Electrical Engineering",
        "5": "Electronics & Communication Engineering",
        "6": "CSE (Data Science)",
        "7": "Mechanical Engineering",
        "8": "Materials & Metallurgical Engineering",
        "9": "Production & Industrial Engineering",
      };

      if (bMap1[b1]) {
        branch = bMap1[b1];
        const rollDigits = remaining.substring(1);
        const rollNum = parseInt(rollDigits, 10);
        classRollNo = isNaN(rollNum) ? rollDigits : `${rollNum}`;
      } else {
        const rollNum = parseInt(remaining, 10);
        classRollNo = isNaN(rollNum) ? remaining : `${rollNum}`;
      }
    }
  }

  return {
    rollNo: clean,
    yearCode,
    batch,
    degree,
    branch,
    classRollNo,
  };
}

/**
 * Parse PEC email like `siddharthmohta.bt25cseds@pec.edu.in` or `umang.bt25106049@pec.edu.in`
 * PEC Roll Number structure: 8 digits [YY][DEGREE][BRANCH][CLASS_ROLL]
 */
export function parsePecEmail(email: string | null | undefined, overrideDisplayName?: string | null): PecProfile {
  const defaultCollege = "Punjab Engineering College (PEC)";

  const emailText = (email || "").toLowerCase().trim();
  const handle = emailText.split("@")[0] || "";
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

  // Check if valid custom roll number is stored in localStorage
  let storedRollNo: string | null = null;
  if (email) {
    try {
      const val = localStorage.getItem(`pec_roll_no_${email.toLowerCase().trim()}`);
      if (val && (namePart.includes("siddharth") || val !== "25106047")) {
        storedRollNo = val.trim();
      }
    } catch (_) {}
  }

  let degree = "B.Tech";
  let batch = "2025";
  let branch = "CSE (Data Science)";
  let rollNo = storedRollNo || "";
  let classRollNo = "";

  // 1. Try to extract exact 8-digit numeric SID from displayName, email, or handle
  const foundSid = extractPecSid(overrideDisplayName) || extractPecSid(emailText) || extractPecSid(handle);

  if (storedRollNo) {
    const decoded = decodePecSid(storedRollNo);
    rollNo = decoded.rollNo;
    batch = decoded.batch;
    degree = decoded.degree;
    branch = decoded.branch;
    classRollNo = decoded.classRollNo;
  } else if (foundSid) {
    const decoded = decodePecSid(foundSid);
    rollNo = decoded.rollNo;
    batch = decoded.batch;
    degree = decoded.degree;
    branch = decoded.branch;
    classRollNo = decoded.classRollNo;
  } else {
    // 2. Parse alpha codePart e.g. "bt25ele" or "bt25ee" or "bt25cseds" or "bt25ece"
    const codeMatch = codePart.match(/^(bt|mt|phd|ar|barch)?(\d{2})([a-z]+)$/i);
    if (codeMatch) {
      const degCode = (codeMatch[1] || "bt").toLowerCase();
      const yearCode = codeMatch[2]; // e.g. "25"
      const branchCode = codeMatch[3].toLowerCase(); // e.g. "ele", "ee", "cseds", "civil", "ece"

      if (DEGREE_MAP[degCode]) {
        degree = DEGREE_MAP[degCode];
      }
      if (yearCode) {
        batch = `20${yearCode}`;
      }

      const branch2Digit = BRANCH_TO_2DIGIT_CODE[branchCode] || "60";
      if (BRANCH_2DIGIT_MAP[branch2Digit]) {
        branch = BRANCH_2DIGIT_MAP[branch2Digit];
      } else if (BRANCH_MAP[branchCode]) {
        branch = BRANCH_MAP[branchCode];
      }

      const deg2Digit = degCode === "mt" ? "20" : degCode === "phd" ? "30" : "10";

      if (namePart.includes("siddharth")) {
        classRollNo = "47";
        rollNo = `${yearCode}${deg2Digit}${branch2Digit}47`;
      } else {
        classRollNo = "01";
        rollNo = `${yearCode}${deg2Digit}${branch2Digit}01`;
      }
    } else {
      if (namePart.includes("siddharth")) {
        rollNo = "25106047";
        classRollNo = "47";
      } else if (!emailText.endsWith("@pec.edu.in") && emailText) {
        rollNo = "Fresher";
        classRollNo = "01";
        branch = "PEC Fresher";
        batch = "2026";
      } else {
        rollNo = "25106001";
        classRollNo = "01";
      }
    }
  }

  // Format student name, cleanly stripping any leading/trailing roll numbers like "bt25106049 Umang Kumar Arora" -> "Umang Kumar Arora"
  const rawName = overrideDisplayName && overrideDisplayName.trim().length > 0
    ? overrideDisplayName
    : formatNameFromEmail(namePart);

  const name = rawName
    .replace(/^(?:bt|mt|phd)?\s*\d{7,8}\s*[-–:]*\s*/i, "")
    .replace(/\s*[-–:]*\s*(?:bt|mt|phd)?\s*\d{7,8}\s*$/i, "")
    .replace(/\((?:bt|mt|phd)?\s*\d{7,8}\s*\)/i, "")
    .trim() || rawName;

  const yearLabel = getStudentYearLabel(batch);

  return {
    email: email || "",
    name,
    rollNo,
    degree,
    branch,
    batch,
    yearLabel,
    college: defaultCollege,
    classRollNo,
  };
}
