import { studentStatuses } from "../schema/studentStatuses.schema.js";

export async function seedStudentStatuses(db) {
  await db.insert(studentStatuses).values([
    {
      statusName: "Active",
      description: "Currently studying"
    },
    {
      statusName: "Alumni",
      description: "Graduated"
    },
    {
      statusName: "Suspended",
      description: "Temporarily suspended"
    },
  ]).onConflictDoNothing({ target: studentStatuses.statusName });
}
