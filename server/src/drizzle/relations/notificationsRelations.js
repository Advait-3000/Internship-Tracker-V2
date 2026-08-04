import { relations } from "drizzle-orm";
import { notifications } from "../schema/notificationsSchema.js";
import { users } from "../schema/usersSchema.js";

export const notificationsRelations = relations(notifications, ({ one, many }) => ({
  Users: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
