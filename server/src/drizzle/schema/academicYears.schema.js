import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const academicYears = pgTable("academic_years", {
  id: uuid("id").defaultRandom().primaryKey(),
  yearName: varchar("year_name", { length: 255 }).notNull().unique(),
});
