import { relations } from "drizzle-orm";
import { internshipTypes } from "../schema/internshipTypes.schema.js";
import { internships } from "../schema/internships.schema.js";

export const internshipTypesRelations = relations(internshipTypes, ({ one, many }) => ({
  internships: many(internships),
}));
