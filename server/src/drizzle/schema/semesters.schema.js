import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const semesters = pgTable("semesters", {
  id: uuid("id").defaultRandom().primaryKey(),
  semesterName: varchar("semester_name", { length: 255 }).notNull().unique(),
});
