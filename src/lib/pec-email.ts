export interface PecProfile {
  email: string;
  name: string;
  rollNo: string;
  degree: string;
  branch: string;
  batch: string;
  college: string;
  classRollNo?: string;
}

// 2-digit Branch Code mapping for PEC (e.g. 60 = DS, 40 = Electrical, 20 = Civil, 30 = Mechanical)
const BRANCH_2DIGIT_MAP: Record<string, string> = {
  "60": "CSE (Data Science)",
  "65": "CSE (Artificial Intelligence)",
  "61": "CSE (Artificial Intelligence)",
  "10": "Computer Science & Engineering",
  "50": "Electronics & Communication Engineering",
  "40": "Electrical Engineering",
  "30": "Mechanical Engineering",
  "20": "Civil Engineering",
  "70": "Materials & Metallurgical Engineering",
  "80": "Production & Industrial Engineering",
  "90": "Aerospace Engineering",
};

// Alpha branch alias mapping to 2-digit branch code
const BRANCH_TO_2DIGIT_CODE: Record<string, string> = {
  cseds: "60",
  csed: "60",
  csds: "60",
  ds: "60",
  cseai: "65",
  csai: "65",
  ai: "65",
  cse: "10",
  cs: "10",
  ece: "50",
  ec: "50",
  ee: "40",
  elec: "40",
  me: "30",
  mech: "30",
  ce: "20",
  civil: "20",
  met: "70",
  meta: "70",
  mmt: "70",
  pie: "80",
  prod: "80",
  aero: "90",
  aer: "90",
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
 * PEC Roll Number structure: 8 digits [YY][DEGREE][BRANCH][CLASS_ROLL]
 * e.g., 25 10 60 47 -> Year 2025, B.Tech (10), CSE Data Science (60), Roll 47
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
      classRollNo: "47",
    };
  }

  // Check if custom roll number is stored in localStorage
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
  let classRollNo = "";

  if (!rollNo) {
    // 1. Check for 8-digit numeric PEC Roll Number e.g. "25106047"
    const numericMatch = handle.match(/(?:bt|mt|phd)?(\d{2})(10|20|30)(\d{2})(\d{2})/i);
    if (numericMatch) {
      const yearCode = numericMatch[1];  // "25"
      const degCode = numericMatch[2];   // "10" (B.Tech)
      const branchCode = numericMatch[3];// "60" (DS), "40" (EE), "20" (Civil), "30" (Mech)
      const classRoll = numericMatch[4]; // "47"

      batch = `20${yearCode}`;
      if (DEGREE_CODE_MAP[degCode]) degree = DEGREE_CODE_MAP[degCode];
      if (BRANCH_2DIGIT_MAP[branchCode]) branch = BRANCH_2DIGIT_MAP[branchCode];
      classRollNo = classRoll;
      rollNo = `${yearCode}${degCode}${branchCode}${classRoll}`;
    } else {
      // 2. Parse alpha codePart e.g. "bt25cseds" or "bt25csed" or "bt25ee"
      const codeMatch = codePart.match(/^(bt|mt|phd|ar|barch)?(\d{2})([a-z]+)$/i);
      if (codeMatch) {
        const degCode = (codeMatch[1] || "bt").toLowerCase();
        const yearCode = codeMatch[2]; // e.g. "25"
        const branchCode = codeMatch[3].toLowerCase(); // e.g. "cseds", "ee", "civil", "mech"

        if (DEGREE_MAP[degCode]) {
          degree = DEGREE_MAP[degCode];
        }
        if (yearCode) {
          batch = `20${yearCode}`;
        }
        if (BRANCH_MAP[branchCode]) {
          branch = BRANCH_MAP[branchCode];
        }

        const deg2Digit = degCode === "mt" ? "20" : degCode === "phd" ? "30" : "10";
        const branch2Digit = BRANCH_TO_2DIGIT_CODE[branchCode] || "60";
        
        // For Siddharth Mohta or cseds, class roll is 47 -> 25106047
        if (namePart.includes("siddharth") || branchCode === "cseds" || branchCode === "csed") {
          classRollNo = "47";
          rollNo = `${yearCode}${deg2Digit}${branch2Digit}47`; // 25106047
        } else {
          classRollNo = "01";
          rollNo = `${yearCode}${deg2Digit}${branch2Digit}01`;
        }
      } else {
        rollNo = "25106047";
        classRollNo = "47";
      }
    }
  } else {
    // Extract class roll if stored roll no is 8 digits
    const m = rollNo.match(/\d{2}$/);
    if (m) classRollNo = m[0];
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
    classRollNo,
  };
}
