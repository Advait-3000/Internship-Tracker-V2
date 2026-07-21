import { pgTable, uuid, date, decimal, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { internships } from "./internships.schema.js";

export const dailyWorkLogs = pgTable("daily_work_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  internshipId: uuid("internship_id").notNull().references(() => internships.id),
  workDate: date("work_date"),
  hoursWorked: decimal("hours_worked"),
  taskPerformed: text("task_performed"),
  status: varchar("status", { length: 255 }),
  remarks: text("remarks"),
  createdAt: timestamp("created_at"),
});
