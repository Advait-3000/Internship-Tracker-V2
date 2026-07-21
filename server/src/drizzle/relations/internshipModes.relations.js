import { relations } from "drizzle-orm";
import { internshipModes } from "../schema/internshipModes.schema.js";
import { internships } from "../schema/internships.schema.js";

export const internshipModesRelations = relations(internshipModes, ({ one, many }) => ({
  internships: many(internships),
}));
