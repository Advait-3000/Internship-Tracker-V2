import { relations } from "drizzle-orm";
import { weeklyReports } from "../schema/weeklyReports.schema.js";
import { internships } from "../schema/internships.schema.js";
import { projects } from "../schema/projects.schema.js";
import { projectStatuses } from "../schema/projectStatuses.schema.js";
import { mentorReviews } from "../schema/mentorReviews.schema.js";

export const weeklyReportsRelations = relations(weeklyReports, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [weeklyReports.internshipId],
    references: [internships.id],
  }),
  Projects: one(projects, {
    fields: [weeklyReports.projectId],
    references: [projects.id],
  }),
  ProjectStatuses: one(projectStatuses, {
    fields: [weeklyReports.projectStatusId],
    references: [projectStatuses.id],
  }),
  mentorReviews: many(mentorReviews),
}));
