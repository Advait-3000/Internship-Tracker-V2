import { projectStatuses } from "../schema/projectStatuses.schema.js";

export async function seedProjectStatuses(db) {
  await db.insert(projectStatuses).values([
    {
      statusName: "Not Started"
    },
    {
      statusName: "In Progress"
    },
    {
      statusName: "Completed"
    },
    {
      statusName: "On Hold"
    },
  ]).onConflictDoNothing({ target: projectStatuses.statusName });
}
