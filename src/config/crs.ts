/**
 * Pre-configured / Coded Default Class Representatives (CRs)
 * You can add any student email/SID here to automatically grant CR authority for a section.
 * Admins can also dynamically grant or revoke CR roles via the in-app Admin UI!
 */

export interface PreConfiguredCR {
  email: string;
  section: string;
  name: string;
}

export const INITIAL_SECTION_CRS: PreConfiguredCR[] = [
  {
    email: "siddharthmohta.bt25cseds@pec.edu.in",
    section: "DS1",
    name: "Siddharth Mohta",
  },
  {
    email: "umangkumararora.bt25cseds@pec.edu.in",
    section: "DS1",
    name: "Umang Kumar Arora",
  },
  {
    email: "siddharthmohta33@gmail.com",
    section: "DS1",
    name: "Siddharth Mohta (Admin)",
  },
];

/**
 * Check if an email has pre-configured hardcoded CR authority for a specific section
 */
export function isPreConfiguredCR(email?: string | null, section?: string | null): boolean {
  if (!email || !section) return false;
  const cleanEmail = email.toLowerCase().trim();
  const cleanSection = section.toUpperCase().trim();

  return INITIAL_SECTION_CRS.some(
    (cr) =>
      cr.email.toLowerCase().trim() === cleanEmail &&
      cr.section.toUpperCase().trim() === cleanSection
  );
}

/**
 * Get all sections for which an email has pre-configured CR authority
 */
export function getPreConfiguredSections(email?: string | null): string[] {
  if (!email) return [];
  const cleanEmail = email.toLowerCase().trim();

  return INITIAL_SECTION_CRS.filter(
    (cr) => cr.email.toLowerCase().trim() === cleanEmail
  ).map((cr) => cr.section);
}
