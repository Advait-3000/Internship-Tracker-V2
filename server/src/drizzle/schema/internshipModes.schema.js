import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const internshipModes = pgTable("internship_modes", {
  id: uuid("id").defaultRandom().primaryKey(),
  modeName: varchar("mode_name", { length: 255 }).notNull().unique(),
});
