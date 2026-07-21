import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const internshipStatuses = pgTable("internship_statuses", {
  id: uuid("id").defaultRandom().primaryKey(),
  statusName: varchar("status_name", { length: 255 }).notNull().unique(),
});
