import { pgTable, uuid, varchar, date, text, timestamp } from "drizzle-orm/pg-core";
import { departments } from "./departments.schema.js";
import { branches } from "./branches.schema.js";
import { academicYears } from "./academicYears.schema.js";
import { divisions } from "./divisions.schema.js";
import { semesters } from "./semesters.schema.js";
import { studentStatuses } from "./studentStatuses.schema.js";
import { roles } from "./roles.schema.js";
import { facultyMentors } from "./facultyMentors.schema.js";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  rollNumber: varchar("roll_number", { length: 255 }).unique(),
  universityRegistrationNumber: varchar("university_registration_number", { length: 255 }).unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  mobileNumber: varchar("mobile_number", { length: 255 }),
  dateOfBirth: date("date_of_birth"),
  gender: varchar("gender", { length: 255 }),
  address: text("address"),
  departmentId: uuid("department_id").references(() => departments.id),
  branchId: uuid("branch_id").references(() => branches.id),
  academicYearId: uuid("academic_year_id").references(() => academicYears.id),
  divisionId: uuid("division_id").references(() => divisions.id),
  semesterId: uuid("semester_id").references(() => semesters.id),
  studentStatusId: uuid("student_status_id").references(() => studentStatuses.id),
  facultyMentorId: uuid("faculty_mentor_id").references(() => facultyMentors.id),
  roleId: uuid("role_id").references(() => roles.id),
  imageUrl: text("image_url"),
  refreshToken: text("refresh_token"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
