import { internshipModes } from "../schema/internshipModes.schema.js";

export async function seedInternshipModes(db) {
  await db.insert(internshipModes).values([
    {
      modeName: "Online"
    },
    {
      modeName: "Offline"
    },
    {
      modeName: "Hybrid"
    },
  ]).onConflictDoNothing({ target: internshipModes.modeName });
}
