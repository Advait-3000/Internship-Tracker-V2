import { roles } from "../schema/roles.schema.js";

export async function seedRoles(db) {
  await db.insert(roles).values([
    {
      roleName: "superadmin",
      description: "Super Admin role"
    },
    {
      roleName: "admin",
      description: "Admin role"
    },
    {
      roleName: "student",
      description: "Student role"
    },
    {
      roleName: "faculty",
      description: "Faculty role"
    },
    {
      roleName: "mentors",
      description: "Mentors role"
    },
    {
      roleName: "company",
      description: "Company role"
    },
  ]).onConflictDoNothing({ target: roles.roleName });
}
