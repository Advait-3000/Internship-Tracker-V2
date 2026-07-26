import { relations } from "drizzle-orm";
import { companyMentors } from "../schema/companyMentorsSchema.js";
import { companies } from "../schema/companiesSchema.js";
import { internships } from "../schema/internshipsSchema.js";
import { mentorReviews } from "../schema/mentorReviewsSchema.js";

export const companyMentorsRelations = relations(companyMentors, ({ one, many }) => ({
  Companies: one(companies, {
    fields: [companyMentors.companyId],
    references: [companies.id],
  }),
  internships: many(internships),
  mentorReviews: many(mentorReviews),
}));
