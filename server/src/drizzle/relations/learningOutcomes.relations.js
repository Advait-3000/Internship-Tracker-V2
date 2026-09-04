import { relations } from "drizzle-orm";
import { learningOutcomes } from "../schema/learningOutcomes.schema.js";
import { internships } from "../schema/internships.schema.js";

export const learningOutcomesRelations = relations(learningOutcomes, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [learningOutcomes.internshipId],
    references: [internships.id],
  }),
}));
