import { relations } from "drizzle-orm";
import { dailyWorkLogs } from "../schema/dailyWorkLogs.schema.js";
import { internships } from "../schema/internships.schema.js";

export const dailyWorkLogsRelations = relations(dailyWorkLogs, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [dailyWorkLogs.internshipId],
    references: [internships.id],
  }),
}));
