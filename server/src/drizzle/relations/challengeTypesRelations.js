import { relations } from "drizzle-orm";
import { challengeTypes } from "../schema/challengeTypesSchema.js";
import { studentChallenges } from "../schema/studentChallengesSchema.js";

export const challengeTypesRelations = relations(challengeTypes, ({ one, many }) => ({
  studentChallenges: many(studentChallenges),
}));
