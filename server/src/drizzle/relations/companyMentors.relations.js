import { relations } from "drizzle-orm";
import { companyMentors } from "../schema/companyMentors.schema.js";
import { companies } from "../schema/companies.schema.js";
import { internships } from "../schema/internships.schema.js";
import { mentorReviews } from "../schema/mentorReviews.schema.js";

export const companyMentorsRelations = relations(companyMentors, ({ one, many }) => ({
  Companies: one(companies, {
    fields: [companyMentors.companyId],
    references: [companies.id],
  }),
  internships: many(internships),
  mentorReviews: many(mentorReviews),
}));
