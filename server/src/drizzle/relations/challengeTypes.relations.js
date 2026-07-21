import { relations } from "drizzle-orm";
import { challengeTypes } from "../schema/challengeTypes.schema.js";
import { studentChallenges } from "../schema/studentChallenges.schema.js";

export const challengeTypesRelations = relations(challengeTypes, ({ one, many }) => ({
  studentChallenges: many(studentChallenges),
}));
