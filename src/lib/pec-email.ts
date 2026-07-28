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

// 2-digit Branch Code mapping for PEC (e.g. 60 = DS, 30 = CS, 10 = Mechanical, 40 = Electrical, 20 = Civil, 50 = ECE)
const BRANCH_2DIGIT_MAP: Record<string, string> = {
  "60": "CSE (Data Science)",
  "65": "CSE (Artificial Intelligence)",
  "61": "CSE (Artificial Intelligence)",
  "30": "Computer Science & Engineering",
  "10": "Mechanical Engineering",
  "50": "Electronics & Communication Engineering",
  "40": "Electrical Engineering",
  "20": "Civil Engineering",
  "70": "Materials & Metallurgical Engineering",
  "80": "Production & Industrial Engineering",
  "90": "Aerospace Engineering",
};

// Alpha branch alias mapping to 2-digit branch code
const BRANCH_TO_2DIGIT_CODE: Record<string, string> = {
  cseds: "60", csed: "60", csds: "60", ds: "60",
  cseai: "65", csai: "65", ai: "65",
  cse: "30", cs: "30",
  ece: "50", ec: "50",
  ee: "40", ele: "40", elec: "40", electrical: "40",
  me: "10", mech: "10", mechanical: "10",
  ce: "20", civil: "20",
  met: "70", meta: "70", mmt: "70", metallurgy: "70",
  pie: "80", prod: "80", production: "80",
  aero: "90", aer: "90", aerospace: "90",
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
function formatNameFromEmail(namePart: string): string {
  if (!namePart) return "PEC Student";

  let clean = namePart.replace(/[0-9_]/g, " ").trim();

  if (!clean.includes(" ")) {
    const surnames = [
      "mohta", "singh", "sharma", "kumar", "gupta", "verma", "jain", "agarwal",
      "bansal", "goyal", "mehta", "chawla", "kool", "kaur", "garg", "malhotra",
      "sood", "bhatia", "arora", "kapoor", "joshi", "rao", "reddy", "patel", "pratap"
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
 * Parse PEC email like `siddharthmohta.bt25cseds@pec.edu.in` or `ayaanpratapsingh.bt25ele@pec.edu.in`
 * PEC Roll Number structure: 8 digits [YY][DEGREE][BRANCH][CLASS_ROLL]
 * e.g., 25 10 40 21 -> Year 2025, B.Tech (10), Electrical (40), Roll 21
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
      // Only keep stored roll no if it's not the old hardcoded 25106047 for non-Siddharth users
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

  if (!rollNo) {
    // 1. Search for 8-digit numeric PEC Roll Number in handle, email, OR overrideDisplayName (e.g. "bt25104021" or "25104021" or "25106012")
    const fullSearch = `${handle} ${emailText} ${overrideDisplayName || ""}`;
    const numericMatch = fullSearch.match(/(?:bt|mt|phd)?(\d{2})(10|20|30)(\d{2})(\d{2})/i);

    if (numericMatch) {
      const yearCode = numericMatch[1];   // "25"
      const degCode = numericMatch[2];    // "10" (B.Tech)
      const branchCode = numericMatch[3]; // "40" (EE), "60" (DS), "50" (ECE), "10" (CSE)
      const classRoll = numericMatch[4];  // "21" or "47"

      batch = `20${yearCode}`;
      if (DEGREE_CODE_MAP[degCode]) degree = DEGREE_CODE_MAP[degCode];
      if (BRANCH_2DIGIT_MAP[branchCode]) branch = BRANCH_2DIGIT_MAP[branchCode];
      classRollNo = classRoll;
      rollNo = `${yearCode}${degCode}${branchCode}${classRoll}`;
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
          // Calculate a unique roll number derived from name for other students
          let hash = 0;
          for (let i = 0; i < namePart.length; i++) {
            hash = (hash << 5) - hash + namePart.charCodeAt(i);
            hash |= 0;
          }
          const num = (Math.abs(hash) % 45) + 2; // 02 to 46
          classRollNo = num < 10 ? `0${num}` : `${num}`;
          rollNo = `${yearCode}${deg2Digit}${branch2Digit}${classRollNo}`;
        }
      } else {
        if (namePart.includes("siddharth")) {
          rollNo = "25106047";
          classRollNo = "47";
        } else {
          rollNo = "25106001";
          classRollNo = "01";
        }
      }
    }
  } else {
    const m = rollNo.match(/\d{2}$/);
    if (m) classRollNo = m[0];
  }

  // Format student name, stripping any leading roll numbers like "bt25104021 "
  let rawName = overrideDisplayName && overrideDisplayName.trim().length > 0
    ? overrideDisplayName
    : formatNameFromEmail(namePart);

  const name = rawName.replace(/^(?:bt|mt|phd)?\d{7,8}\s*/i, "").trim() || rawName;

  return {
    email: email || "",
    name,
    rollNo,
    degree,
    branch,
    batch,
    college: defaultCollege,
    classRollNo,
  };
}
