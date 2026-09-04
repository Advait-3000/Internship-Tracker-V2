import { relations } from "drizzle-orm";
import { users } from "../schema/users.schema.js";
import { departments } from "../schema/departments.schema.js";
import { branches } from "../schema/branches.schema.js";
import { academicYears } from "../schema/academicYears.schema.js";
import { divisions } from "../schema/divisions.schema.js";
import { semesters } from "../schema/semesters.schema.js";
import { studentStatuses } from "../schema/studentStatuses.schema.js";
import { roles } from "../schema/roles.schema.js";
import { facultyMentors } from "../schema/facultyMentors.schema.js";
import { internships } from "../schema/internships.schema.js";
import { notifications } from "../schema/notifications.schema.js";

export const usersRelations = relations(users, ({ one, many }) => ({
  Departments: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
  Branches: one(branches, {
    fields: [users.branchId],
    references: [branches.id],
  }),
  AcademicYears: one(academicYears, {
    fields: [users.academicYearId],
    references: [academicYears.id],
  }),
  Divisions: one(divisions, {
    fields: [users.divisionId],
    references: [divisions.id],
  }),
  Semesters: one(semesters, {
    fields: [users.semesterId],
    references: [semesters.id],
  }),
  StudentStatuses: one(studentStatuses, {
    fields: [users.studentStatusId],
    references: [studentStatuses.id],
  }),
  Roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  facultyMentor: one(users, {
    fields: [users.facultyMentorId],
    references: [users.id],
    relationName: "facultyMentor",
  }),
  internships: many(internships),
  notifications: many(notifications),
}));
