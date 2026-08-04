import { relations } from "drizzle-orm";
import { internshipTypes } from "../schema/internshipTypesSchema.js";
import { internships } from "../schema/internshipsSchema.js";

export const internshipTypesRelations = relations(internshipTypes, ({ one, many }) => ({
  internships: many(internships),
}));
