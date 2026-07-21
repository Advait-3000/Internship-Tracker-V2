import { departments } from "../schema/departments.schema.js";

export async function seedDepartments(db) {
  await db.insert(departments).values([
    {
      departmentName: "Computer Engineering",
      description: "CE Department"
    },
    {
      departmentName: "Information Technology",
      description: "IT Department"
    },
    {
      departmentName: "EXTC",
      description: "Electronics and Telecommunication"
    },
    {
      departmentName: "AI & DS",
      description: "Artificial Intelligence and Data Science"
    },
    {
      departmentName: "Mechanical",
      description: "Mechanical Engineering"
    },
  ]).onConflictDoNothing({ target: departments.departmentName });
}
