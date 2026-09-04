import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const divisions = pgTable("divisions", {
  id: uuid("id").defaultRandom().primaryKey(),
  divisionName: varchar("division_name", { length: 255 }).notNull().unique(),
});
