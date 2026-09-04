import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { departments } from "./departments.schema.js";

export const branches = pgTable("branches", {
  id: uuid("id").defaultRandom().primaryKey(),
  departmentId: uuid("department_id").notNull().references(() => departments.id),
  branchName: varchar("branch_name", { length: 255 }).notNull(),
  description: text("description"),
});
