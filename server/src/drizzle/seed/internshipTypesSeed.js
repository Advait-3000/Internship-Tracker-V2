import { internshipTypes } from "../schema/internshipTypes.schema.js";

export async function seedInternshipTypes(db) {
  await db.insert(internshipTypes).values([
    {
      typeName: "Summer"
    },
    {
      typeName: "Winter"
    },
    {
      typeName: "Semester"
    },
  ]).onConflictDoNothing({ target: internshipTypes.typeName });
}
