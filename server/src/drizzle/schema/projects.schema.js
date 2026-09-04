import { pgTable, uuid, varchar, text, date, decimal, timestamp } from "drizzle-orm/pg-core";
import { internships } from "./internships.schema.js";

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  internshipId: uuid("internship_id").notNull().references(() => internships.id),
  projectTitle: varchar("project_title", { length: 255 }).notNull(),
  projectDescription: text("project_description"),
  moduleAssigned: varchar("module_assigned", { length: 255 }),
  expectedCompletionDate: date("expected_completion_date"),
  currentProgress: decimal("current_progress"),
  completionPercentage: decimal("completion_percentage"),
  createdAt: timestamp("created_at"),
});
