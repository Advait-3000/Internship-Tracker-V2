import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  address: text("address"),
  website: varchar("website", { length: 255 }),
  hrName: varchar("hr_name", { length: 255 }),
  hrContactNumber: varchar("hr_contact_number", { length: 255 }),
  hrEmail: varchar("hr_email", { length: 255 }),
  createdAt: timestamp("created_at"),
});
