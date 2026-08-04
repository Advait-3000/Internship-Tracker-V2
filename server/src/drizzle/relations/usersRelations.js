import { relations } from "drizzle-orm";
import { users } from "../schema/usersSchema.js";
import { departments } from "../schema/departmentsSchema.js";
import { branches } from "../schema/branchesSchema.js";
import { academicYears } from "../schema/academicYearsSchema.js";
import { divisions } from "../schema/divisionsSchema.js";
import { semesters } from "../schema/semestersSchema.js";
import { studentStatuses } from "../schema/studentStatusesSchema.js";
import { roles } from "../schema/rolesSchema.js";
import { facultyMentors } from "../schema/facultyMentorsSchema.js";
import { internships } from "../schema/internshipsSchema.js";
import { notifications } from "../schema/notificationsSchema.js";

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
