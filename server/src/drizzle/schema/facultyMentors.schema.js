import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";

export const facultyMentors = pgTable("faculty_mentors", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  designation: varchar("designation", { length: 255 }),
  officeEmail: varchar("office_email", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
});
