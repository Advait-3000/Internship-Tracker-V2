import { relations } from "drizzle-orm";
import { internshipModes } from "../schema/internshipModesSchema.js";
import { internships } from "../schema/internshipsSchema.js";

export const internshipModesRelations = relations(internshipModes, ({ one, many }) => ({
  internships: many(internships),
}));
