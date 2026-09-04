import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { internships } from "./internships.schema.js";
import { documentTypes } from "./documentTypes.schema.js";

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  internshipId: uuid("internship_id").notNull().references(() => internships.id),
  documentTypeId: uuid("document_type_id").notNull().references(() => documentTypes.id),
  title: varchar("title", { length: 255 }),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});
