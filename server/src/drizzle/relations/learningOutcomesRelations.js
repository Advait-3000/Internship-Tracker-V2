import { relations } from "drizzle-orm";
import { learningOutcomes } from "../schema/learningOutcomesSchema.js";
import { internships } from "../schema/internshipsSchema.js";

export const learningOutcomesRelations = relations(learningOutcomes, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [learningOutcomes.internshipId],
    references: [internships.id],
  }),
}));
