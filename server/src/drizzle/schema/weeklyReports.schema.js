import { pgTable, uuid, integer, date, decimal, text, json, timestamp } from "drizzle-orm/pg-core";
import { internships } from "./internships.schema.js";
import { projects } from "./projects.schema.js";
import { projectStatuses } from "./projectStatuses.schema.js";

export const weeklyReports = pgTable("weekly_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  internshipId: uuid("internship_id").notNull().references(() => internships.id),
  projectId: uuid("project_id").references(() => projects.id),
  weekNumber: integer("week_number"),
  reportingFrom: date("reporting_from"),
  reportingTo: date("reporting_to"),
  totalHoursWorked: decimal("total_hours_worked"),
  workingDays: integer("working_days"),
  attendancePercentage: decimal("attendance_percentage"),
  leaveTaken: integer("leave_taken"),
  leaveReason: text("leave_reason"),
  keyTasksCompleted: text("key_tasks_completed"),
  technologiesUsed: json("technologies_used"),
  deliverablesSubmitted: text("deliverables_submitted"),
  skillsLearned: text("skills_learned"),
  ongoingTasks: text("ongoing_tasks"),
  targetGoals: text("target_goals"),
  projectStatusId: uuid("project_status_id").references(() => projectStatuses.id),
  submittedAt: timestamp("submitted_at"),
});
