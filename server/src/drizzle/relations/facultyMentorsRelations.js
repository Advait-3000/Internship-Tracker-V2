import { relations } from "drizzle-orm";
import { facultyMentors } from "../schema/facultyMentorsSchema.js";
import { users } from "../schema/usersSchema.js";
import { internships } from "../schema/internshipsSchema.js";

export const facultyMentorsRelations = relations(facultyMentors, ({ one, many }) => ({
  Users: one(users, {
    fields: [facultyMentors.userId],
    references: [users.id],
  }),
  internships: many(internships),
}));
