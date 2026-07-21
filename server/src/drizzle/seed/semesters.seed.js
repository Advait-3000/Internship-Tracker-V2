import { semesters } from "../schema/semesters.schema.js";

export async function seedSemesters(db) {
  await db.insert(semesters).values([
    {
      semesterName: "Semester 1"
    },
    {
      semesterName: "Semester 2"
    },
    {
      semesterName: "Semester 3"
    },
    {
      semesterName: "Semester 4"
    },
    {
      semesterName: "Semester 5"
    },
    {
      semesterName: "Semester 6"
    },
    {
      semesterName: "Semester 7"
    },
    {
      semesterName: "Semester 8"
    },
  ]).onConflictDoNothing({ target: semesters.semesterName });
}
