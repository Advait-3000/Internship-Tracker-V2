import { relations } from "drizzle-orm";
import { mentorReviews } from "../schema/mentorReviews.schema.js";
import { weeklyReports } from "../schema/weeklyReports.schema.js";
import { companyMentors } from "../schema/companyMentors.schema.js";

export const mentorReviewsRelations = relations(mentorReviews, ({ one, many }) => ({
  WeeklyReports: one(weeklyReports, {
    fields: [mentorReviews.weeklyReportId],
    references: [weeklyReports.id],
  }),
  CompanyMentors: one(companyMentors, {
    fields: [mentorReviews.companyMentorId],
    references: [companyMentors.id],
  }),
}));
