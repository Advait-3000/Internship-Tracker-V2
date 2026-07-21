import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const documentTypes = pgTable("document_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  typeName: varchar("type_name", { length: 255 }).notNull().unique(),
});
