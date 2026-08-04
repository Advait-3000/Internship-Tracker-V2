import { relations } from "drizzle-orm";
import { companies } from "../schema/companiesSchema.js";
import { companyMentors } from "../schema/companyMentorsSchema.js";
import { internships } from "../schema/internshipsSchema.js";

export const companiesRelations = relations(companies, ({ one, many }) => ({
  companyMentors: many(companyMentors),
  internships: many(internships),
}));
