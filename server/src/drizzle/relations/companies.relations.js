import { relations } from "drizzle-orm";
import { companies } from "../schema/companies.schema.js";
import { companyMentors } from "../schema/companyMentors.schema.js";
import { internships } from "../schema/internships.schema.js";

export const companiesRelations = relations(companies, ({ one, many }) => ({
  companyMentors: many(companyMentors),
  internships: many(internships),
}));
