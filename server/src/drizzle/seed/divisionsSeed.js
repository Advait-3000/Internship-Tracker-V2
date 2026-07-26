import { divisions } from "../schema/divisions.schema.js";

export async function seedDivisions(db) {
  await db.insert(divisions).values([
    {
      divisionName: "A"
    },
    {
      divisionName: "B"
    },
    {
      divisionName: "C"
    },
  ]).onConflictDoNothing({ target: divisions.divisionName });
}
