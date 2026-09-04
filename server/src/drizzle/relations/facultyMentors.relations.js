import { relations } from "drizzle-orm";
import { facultyMentors } from "../schema/facultyMentors.schema.js";
import { users } from "../schema/users.schema.js";
import { internships } from "../schema/internships.schema.js";

export const facultyMentorsRelations = relations(facultyMentors, ({ one, many }) => ({
  Users: one(users, {
    fields: [facultyMentors.userId],
    references: [users.id],
  }),
  internships: many(internships),
}));
