import { pgTable, uuid, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  title: varchar("title", { length: 255 }),
  message: text("message"),
  isRead: boolean("is_read"),
  createdAt: timestamp("created_at"),
});
