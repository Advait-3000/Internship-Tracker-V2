import { relations } from "drizzle-orm";
import { notifications } from "../schema/notifications.schema.js";
import { users } from "../schema/users.schema.js";

export const notificationsRelations = relations(notifications, ({ one, many }) => ({
  Users: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
