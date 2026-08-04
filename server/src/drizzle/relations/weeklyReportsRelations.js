import { relations } from "drizzle-orm";
import { weeklyReports } from "../schema/weeklyReportsSchema.js";
import { internships } from "../schema/internshipsSchema.js";
import { projects } from "../schema/projectsSchema.js";
import { projectStatuses } from "../schema/projectStatusesSchema.js";
import { mentorReviews } from "../schema/mentorReviewsSchema.js";

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
