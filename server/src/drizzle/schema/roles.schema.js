import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  roleName: varchar("role_name", { length: 255 }).notNull().unique(),
  description: text("description"),
});
