import { relations } from "drizzle-orm";
import { finalFeedback } from "../schema/finalFeedback.schema.js";
import { internships } from "../schema/internships.schema.js";

export const finalFeedbackRelations = relations(finalFeedback, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [finalFeedback.internshipId],
    references: [internships.id],
  }),
}));
