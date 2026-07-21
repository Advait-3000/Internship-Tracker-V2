import { relations } from "drizzle-orm";
import { internshipStatuses } from "../schema/internshipStatuses.schema.js";
import { internships } from "../schema/internships.schema.js";

export const internshipStatusesRelations = relations(internshipStatuses, ({ one, many }) => ({
  internships: many(internships),
}));
