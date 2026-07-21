import { documentTypes } from "../schema/documentTypes.schema.js";

export async function seedDocumentTypes(db) {
  await db.insert(documentTypes).values([
    {
      typeName: "Offer Letter"
    },
    {
      typeName: "Completion Certificate"
    },
    {
      typeName: "NOC"
    },
    {
      typeName: "Weekly Report"
    },
  ]).onConflictDoNothing({ target: documentTypes.typeName });
}
