import { relations } from "drizzle-orm";
import { studentChallenges } from "../schema/studentChallenges.schema.js";
import { internships } from "../schema/internships.schema.js";
import { challengeTypes } from "../schema/challengeTypes.schema.js";

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
