import { relations } from "drizzle-orm";
import { mentorReviews } from "../schema/mentorReviewsSchema.js";
import { weeklyReports } from "../schema/weeklyReportsSchema.js";
import { companyMentors } from "../schema/companyMentorsSchema.js";

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
