import { relations } from "drizzle-orm";
import { documents } from "../schema/documents.schema.js";
import { internships } from "../schema/internships.schema.js";
import { documentTypes } from "../schema/documentTypes.schema.js";

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
