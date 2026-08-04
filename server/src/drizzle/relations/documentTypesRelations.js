import { relations } from "drizzle-orm";
import { documentTypes } from "../schema/documentTypesSchema.js";
import { documents } from "../schema/documentsSchema.js";

export const documentTypesRelations = relations(documentTypes, ({ one, many }) => ({
  documents: many(documents),
}));
