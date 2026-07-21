import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";
import { internships } from "./internships.schema.js";

export const learningOutcomes = pgTable("learning_outcomes", {
  id: uuid("id").defaultRandom().primaryKey(),
  internshipId: uuid("internship_id").notNull().references(() => internships.id),
  newSkills: text("new_skills"),
  softwareTools: text("software_tools"),
  certifications: text("certifications"),
  workshops: text("workshops"),
  githubRepository: varchar("github_repository", { length: 255 }),
  documentationLink: varchar("documentation_link", { length: 255 }),
  demoLink: varchar("demo_link", { length: 255 }),
  presentationLink: varchar("presentation_link", { length: 255 }),
});
