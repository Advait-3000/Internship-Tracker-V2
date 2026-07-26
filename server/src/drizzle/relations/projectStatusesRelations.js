import { relations } from "drizzle-orm";
import { projectStatuses } from "../schema/projectStatusesSchema.js";
import { weeklyReports } from "../schema/weeklyReportsSchema.js";

export const projectStatusesRelations = relations(projectStatuses, ({ one, many }) => ({
  weeklyReports: many(weeklyReports),
}));
