import { relations } from "drizzle-orm";
import { studentChallenges } from "../schema/studentChallengesSchema.js";
import { internships } from "../schema/internshipsSchema.js";
import { challengeTypes } from "../schema/challengeTypesSchema.js";

export const studentChallengesRelations = relations(studentChallenges, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [studentChallenges.internshipId],
    references: [internships.id],
  }),
  ChallengeTypes: one(challengeTypes, {
    fields: [studentChallenges.challengeTypeId],
    references: [challengeTypes.id],
  }),
}));
