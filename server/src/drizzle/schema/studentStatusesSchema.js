import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const studentStatuses = pgTable("student_statuses", {
  id: uuid("id").defaultRandom().primaryKey(),
  statusName: varchar("status_name", { length: 255 }).notNull().unique(),
  description: text("description"),
});
