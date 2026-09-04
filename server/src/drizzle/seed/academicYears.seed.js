import { academicYears } from "../schema/academicYears.schema.js";

export async function seedAcademicYears(db) {
  await db.insert(academicYears).values([
    {
      yearName: "2023-2024"
    },
    {
      yearName: "2024-2025"
    },
  ]).onConflictDoNothing({ target: academicYears.yearName });
}
