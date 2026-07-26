import { relations } from "drizzle-orm";
import { finalFeedback } from "../schema/finalFeedbackSchema.js";
import { internships } from "../schema/internshipsSchema.js";

export const finalFeedbackRelations = relations(finalFeedback, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [finalFeedback.internshipId],
    references: [internships.id],
  }),
}));
