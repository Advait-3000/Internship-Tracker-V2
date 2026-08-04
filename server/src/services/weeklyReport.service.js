import { db } from "../config/db.js";
import { weeklyReports } from "../drizzle/schema/weeklyReportsSchema.js";
import { eq, and, desc, inArray } from "drizzle-orm";
import { ApiError } from "../utils/ApiError.js";
import { WeeklyReportValidator } from "../validations/weeklyReportValidation.js";
import { users } from "../drizzle/schema/usersSchema.js";
import { internships } from "../drizzle/schema/internshipsSchema.js";
import { facultyMentors } from "../drizzle/schema/facultyMentorsSchema.js";
import { companyMentors } from "../drizzle/schema/companyMentorsSchema.js";

class WeeklyReportService {
  async createWeeklyReport(data) {
    const validData = WeeklyReportValidator.validateCreateWeeklyReport(data);

    const [newReport] = await db
      .insert(weeklyReports)
      .values({
        ...validData,
        submittedAt: new Date(),
      })
      .returning();

    return newReport;
  }

  async getWeeklyReports(filters = {}, user = null) {
    const conditions = [];

    if (user && user._id) {
      const requester = await db.query.users.findFirst({
        where: eq(users.id, user._id),
        with: { Roles: true }
      });

      if (!requester) return [];

      const roleName = requester.Roles?.roleName?.toUpperCase() || "STUDENT";
      let allowedInternshipIds = null;

      if (roleName !== "SUPERADMIN") {
        if (roleName === "ADMIN") {
          const departmentId = requester.departmentId;
          if (!departmentId) {
            allowedInternshipIds = [];
          } else {
            const studentsInDept = await db.query.users.findMany({
              where: eq(users.departmentId, departmentId),
              columns: { id: true }
            });
            const studentIds = studentsInDept.map(s => s.id);
            if (studentIds.length === 0) {
              allowedInternshipIds = [];
            } else {
              const adminInternships = await db.query.internships.findMany({
                where: inArray(internships.studentId, studentIds),
                columns: { id: true }
              });
              allowedInternshipIds = adminInternships.map(i => i.id);
            }
          }
        } else if (roleName === "FACULTY" || roleName === "FACULTY_MENTOR") {
          const facultyMentorRecord = await db.query.facultyMentors.findFirst({
            where: eq(facultyMentors.userId, user._id)
          });
          if (!facultyMentorRecord) {
            allowedInternshipIds = [];
          } else {
            const facConditions = [eq(internships.facultyMentorId, facultyMentorRecord.id)];
            let proceed = true;
            if (requester.departmentId) {
              const studentsInDept = await db.query.users.findMany({
                where: eq(users.departmentId, requester.departmentId),
                columns: { id: true }
              });
              const studentIds = studentsInDept.map(s => s.id);
              if (studentIds.length > 0) {
                facConditions.push(inArray(internships.studentId, studentIds));
              } else {
                proceed = false;
                allowedInternshipIds = [];
              }
            }
            if (proceed) {
              const facInternships = await db.query.internships.findMany({
                where: and(...facConditions),
                columns: { id: true }
              });
              allowedInternshipIds = facInternships.map(i => i.id);
            }
          }
        } else if (roleName === "COMPANY_MENTOR") {
          const companyMentorRecord = await db.query.companyMentors.findFirst({
            where: eq(companyMentors.userId, user._id)
          });
          if (!companyMentorRecord) {
            allowedInternshipIds = [];
          } else {
            const compInternships = await db.query.internships.findMany({
              where: eq(internships.companyMentorId, companyMentorRecord.id),
              columns: { id: true }
            });
            allowedInternshipIds = compInternships.map(i => i.id);
          }
        } else {
          // Default to STUDENT
          const studInternships = await db.query.internships.findMany({
            where: eq(internships.studentId, user._id),
            columns: { id: true }
          });
          allowedInternshipIds = studInternships.map(i => i.id);
        }
      }

      // If empty array, user has no access to any internships
      if (allowedInternshipIds !== null && allowedInternshipIds.length === 0) {
        return [];
      }
      
      // If array has items, filter by those IDs
      if (allowedInternshipIds !== null && allowedInternshipIds.length > 0) {
        conditions.push(inArray(weeklyReports.internshipId, allowedInternshipIds));
      }
      // If allowedInternshipIds is null, user is SUPERADMIN, so no internshipId restriction
    }

    if (filters.internshipId) {
      const validId = WeeklyReportValidator.validateId(filters.internshipId, "Internship ID");
      conditions.push(eq(weeklyReports.internshipId, validId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    return await db.query.weeklyReports.findMany({
      where: whereClause,
      orderBy: [desc(weeklyReports.submittedAt)],
    });
  }

  async updateWeeklyReport(id, data) {
    const validId = WeeklyReportValidator.validateId(id, "Weekly Report ID");
    const validData = WeeklyReportValidator.validateUpdateWeeklyReport(data);

    const existingReport = await db.query.weeklyReports.findFirst({
      where: eq(weeklyReports.id, validId),
    });

    if (!existingReport) {
      throw new ApiError(404, "Weekly report not found");
    }

    const [updatedReport] = await db
      .update(weeklyReports)
      .set({
        ...validData,
      })
      .where(eq(weeklyReports.id, validId))
      .returning();

    return updatedReport;
  }
}

export default new WeeklyReportService();
