import { relations } from "drizzle-orm";
import { internships } from "../schema/internshipsSchema.js";
import { users } from "../schema/usersSchema.js";
import { companies } from "../schema/companiesSchema.js";
import { companyMentors } from "../schema/companyMentorsSchema.js";
import { facultyMentors } from "../schema/facultyMentorsSchema.js";
import { internshipModes } from "../schema/internshipModesSchema.js";
import { internshipTypes } from "../schema/internshipTypesSchema.js";
import { internshipStatuses } from "../schema/internshipStatusesSchema.js";
import { projects } from "../schema/projectsSchema.js";
import { weeklyReports } from "../schema/weeklyReportsSchema.js";
import { dailyWorkLogs } from "../schema/dailyWorkLogsSchema.js";
import { studentChallenges } from "../schema/studentChallengesSchema.js";
import { learningOutcomes } from "../schema/learningOutcomesSchema.js";
import { documents } from "../schema/documentsSchema.js";
import { finalFeedback } from "../schema/finalFeedbackSchema.js";

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
