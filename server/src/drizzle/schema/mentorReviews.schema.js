import { pgTable, uuid, date, text, integer, boolean } from "drizzle-orm/pg-core";
import { weeklyReports } from "./weeklyReports.schema.js";
import { companyMentors } from "./companyMentors.schema.js";

export const mentorReviews = pgTable("mentor_reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  weeklyReportId: uuid("weekly_report_id").notNull().references(() => weeklyReports.id),
  companyMentorId: uuid("company_mentor_id").references(() => companyMentors.id),
  reviewDate: date("review_date"),
  mentorFeedback: text("mentor_feedback"),
  mentorSuggestions: text("mentor_suggestions"),
  mentorRating: integer("mentor_rating"),
  reviewed: boolean("reviewed"),
});
