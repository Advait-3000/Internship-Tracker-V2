import { internshipStatuses } from "../schema/internshipStatuses.schema.js";

export async function seedInternshipStatuses(db) {
  await db.insert(internshipStatuses).values([
    {
      statusName: "Pending"
    },
    {
      statusName: "Approved"
    },
    {
      statusName: "Ongoing"
    },
    {
      statusName: "Completed"
    },
    {
      statusName: "Rejected"
    },
  ]).onConflictDoNothing({ target: internshipStatuses.statusName });
}
