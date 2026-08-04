import { relations } from "drizzle-orm";
import { internshipStatuses } from "../schema/internshipStatusesSchema.js";
import { internships } from "../schema/internshipsSchema.js";

export const internshipStatusesRelations = relations(internshipStatuses, ({ one, many }) => ({
  internships: many(internships),
}));
