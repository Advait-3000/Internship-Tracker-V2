import { relations } from "drizzle-orm";
import { documentTypes } from "../schema/documentTypes.schema.js";
import { documents } from "../schema/documents.schema.js";

export const documentTypesRelations = relations(documentTypes, ({ one, many }) => ({
  documents: many(documents),
}));
