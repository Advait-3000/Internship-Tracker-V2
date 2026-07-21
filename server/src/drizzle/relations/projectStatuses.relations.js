import { relations } from "drizzle-orm";
import { projectStatuses } from "../schema/projectStatuses.schema.js";
import { weeklyReports } from "../schema/weeklyReports.schema.js";

export const projectStatusesRelations = relations(projectStatuses, ({ one, many }) => ({
  weeklyReports: many(weeklyReports),
}));
