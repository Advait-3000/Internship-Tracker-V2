import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { companies } from "./companies.schema.js";

export const companyMentors = pgTable("company_mentors", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id),
  mentorName: varchar("mentor_name", { length: 255 }).notNull(),
  designation: varchar("designation", { length: 255 }),
  contactNumber: varchar("contact_number", { length: 255 }),
  email: varchar("email", { length: 255 }),
});
