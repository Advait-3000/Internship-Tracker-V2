import { relations } from "drizzle-orm";
import { projects } from "../schema/projects.schema.js";
import { internships } from "../schema/internships.schema.js";
import { weeklyReports } from "../schema/weeklyReports.schema.js";

export const projectsRelations = relations(projects, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [projects.internshipId],
    references: [internships.id],
  }),
  weeklyReports: many(weeklyReports),
}));
