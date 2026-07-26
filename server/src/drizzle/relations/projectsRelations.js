import { relations } from "drizzle-orm";
import { projects } from "../schema/projectsSchema.js";
import { internships } from "../schema/internshipsSchema.js";
import { weeklyReports } from "../schema/weeklyReportsSchema.js";

export const projectsRelations = relations(projects, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [projects.internshipId],
    references: [internships.id],
  }),
  weeklyReports: many(weeklyReports),
}));
