import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  departmentName: varchar("department_name", { length: 255 }).notNull().unique(),
  description: text("description"),
});
