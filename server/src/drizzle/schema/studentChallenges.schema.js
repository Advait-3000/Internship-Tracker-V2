import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { internships } from "./internships.schema.js";
import { challengeTypes } from "./challengeTypes.schema.js";

export const studentChallenges = pgTable("student_challenges", {
  id: uuid("id").defaultRandom().primaryKey(),
  internshipId: uuid("internship_id").notNull().references(() => internships.id),
  challengeTypeId: uuid("challenge_type_id").references(() => challengeTypes.id),
  description: text("description"),
  supportRequired: text("support_required"),
  createdAt: timestamp("created_at"),
});
