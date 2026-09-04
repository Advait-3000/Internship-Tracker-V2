import { relations } from "drizzle-orm";
import { studentStatuses } from "../schema/studentStatuses.schema.js";
import { users } from "../schema/users.schema.js";

export const studentStatusesRelations = relations(studentStatuses, ({ one, many }) => ({
  users: many(users),
}));
