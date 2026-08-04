import { relations } from "drizzle-orm";
import { documents } from "../schema/documentsSchema.js";
import { internships } from "../schema/internshipsSchema.js";
import { documentTypes } from "../schema/documentTypesSchema.js";

export const documentsRelations = relations(documents, ({ one, many }) => ({
  Internships: one(internships, {
    fields: [documents.internshipId],
    references: [internships.id],
  }),
  DocumentTypes: one(documentTypes, {
    fields: [documents.documentTypeId],
    references: [documentTypes.id],
  }),
}));
