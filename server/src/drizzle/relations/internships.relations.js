import { relations } from "drizzle-orm";
import { internships } from "../schema/internships.schema.js";
import { users } from "../schema/users.schema.js";
import { companies } from "../schema/companies.schema.js";
import { companyMentors } from "../schema/companyMentors.schema.js";
import { facultyMentors } from "../schema/facultyMentors.schema.js";
import { internshipModes } from "../schema/internshipModes.schema.js";
import { internshipTypes } from "../schema/internshipTypes.schema.js";
import { internshipStatuses } from "../schema/internshipStatuses.schema.js";
import { projects } from "../schema/projects.schema.js";
import { weeklyReports } from "../schema/weeklyReports.schema.js";
import { dailyWorkLogs } from "../schema/dailyWorkLogs.schema.js";
import { studentChallenges } from "../schema/studentChallenges.schema.js";
import { learningOutcomes } from "../schema/learningOutcomes.schema.js";
import { documents } from "../schema/documents.schema.js";
import { finalFeedback } from "../schema/finalFeedback.schema.js";

export const internshipsRelations = relations(internships, ({ one, many }) => ({
  Users: one(users, {
    fields: [internships.studentId],
    references: [users.id],
  }),
  Companies: one(companies, {
    fields: [internships.companyId],
    references: [companies.id],
  }),
  CompanyMentors: one(companyMentors, {
    fields: [internships.companyMentorId],
    references: [companyMentors.id],
  }),
  FacultyMentors: one(facultyMentors, {
    fields: [internships.facultyMentorId],
    references: [facultyMentors.id],
  }),
  InternshipModes: one(internshipModes, {
    fields: [internships.internshipModeId],
    references: [internshipModes.id],
  }),
  InternshipTypes: one(internshipTypes, {
    fields: [internships.internshipTypeId],
    references: [internshipTypes.id],
  }),
  InternshipStatuses: one(internshipStatuses, {
    fields: [internships.internshipStatusId],
    references: [internshipStatuses.id],
  }),
  projects: many(projects),
  weeklyReports: many(weeklyReports),
  dailyWorkLogs: many(dailyWorkLogs),
  studentChallenges: many(studentChallenges),
  learningOutcomes: many(learningOutcomes),
  documents: many(documents),
  finalFeedback: many(finalFeedback),
}));
