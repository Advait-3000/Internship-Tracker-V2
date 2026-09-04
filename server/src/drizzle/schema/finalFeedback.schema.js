import { pgTable, uuid, integer, text, boolean, date } from "drizzle-orm/pg-core";
import { internships } from "./internships.schema.js";

export const finalFeedback = pgTable("final_feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  internshipId: uuid("internship_id").notNull().references(() => internships.id),
  overallExperience: integer("overall_experience"),
  keyLearnings: text("key_learnings"),
  suggestions: text("suggestions"),
  studentDeclaration: boolean("student_declaration"),
  submissionDate: date("submission_date"),
});
