import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const projectStatuses = pgTable("project_statuses", {
  id: uuid("id").defaultRandom().primaryKey(),
  statusName: varchar("status_name", { length: 255 }).notNull().unique(),
});
