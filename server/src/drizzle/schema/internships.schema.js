import { pgTable, uuid, varchar, date, decimal, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { companies } from "./companies.schema.js";
import { companyMentors } from "./companyMentors.schema.js";
import { facultyMentors } from "./facultyMentors.schema.js";
import { internshipModes } from "./internshipModes.schema.js";
import { internshipTypes } from "./internshipTypes.schema.js";
import { internshipStatuses } from "./internshipStatuses.schema.js";

export const internships = pgTable("internships", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id").notNull().references(() => users.id),
  companyId: uuid("company_id").notNull().references(() => companies.id),
  companyMentorId: uuid("company_mentor_id").references(() => companyMentors.id),
  facultyMentorId: uuid("faculty_mentor_id").references(() => facultyMentors.id),
  internshipModeId: uuid("internship_mode_id").references(() => internshipModes.id),
  internshipTypeId: uuid("internship_type_id").references(() => internshipTypes.id),
  internshipStatusId: uuid("internship_status_id").references(() => internshipStatuses.id),
  internshipDomain: varchar("internship_domain", { length: 255 }),
  startDate: date("start_date"),
  endDate: date("end_date"),
  duration: varchar("duration", { length: 255 }),
  stipend: decimal("stipend"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
