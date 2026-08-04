import { pgTable, uuid, varchar, integer, timestamp, text } from "drizzle-orm/pg-core";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  bucketName: varchar("bucket_name", { length: 255 }).notNull(),
  objectKey: text("object_key").notNull(),
  originalFilename: varchar("original_filename", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 255 }).notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  entityType: varchar("entity_type", { length: 255 }), // e.g. "USER_PROFILE", "WEEKLY_REPORT"
  entityId: uuid("entity_id"), // ID of the business entity this belongs to (optional, but good for joins/cleanup)
});
