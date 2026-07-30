import { db } from "../config/db.js";
import { studentChallenges } from "../drizzle/schema/studentChallengesSchema.js";
import { eq, and, desc, inArray } from "drizzle-orm";
import { ApiError } from "../utils/ApiError.js";
import { StudentChallengeValidator } from "../validations/studentChallengeValidation.js";
import { users } from "../drizzle/schema/usersSchema.js";
import { internships } from "../drizzle/schema/internshipsSchema.js";
import { facultyMentors } from "../drizzle/schema/facultyMentorsSchema.js";
import { companyMentors } from "../drizzle/schema/companyMentorsSchema.js";

class StudentChallengeService {
  async createStudentChallenge(data) {
    const validData = StudentChallengeValidator.validateCreateStudentChallenge(data);

    const [newChallenge] = await db
      .insert(studentChallenges)
      .values({
        ...validData,
        createdAt: new Date(),
      })
      .returning();

    return newChallenge;
  }

  async getStudentChallenges(filters = {}, user = null) {
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
      
      if (allowedInternshipIds !== null && allowedInternshipIds.length === 0) {
        return [];
      }
      
      if (allowedInternshipIds !== null && allowedInternshipIds.length > 0) {
        conditions.push(inArray(studentChallenges.internshipId, allowedInternshipIds));
      }
    }

    if (filters.internshipId) {
      const validId = StudentChallengeValidator.validateId(filters.internshipId, "Internship ID");
      conditions.push(eq(studentChallenges.internshipId, validId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    return await db.query.studentChallenges.findMany({
      where: whereClause,
      orderBy: [desc(studentChallenges.createdAt)],
    });
  }

  async updateStudentChallenge(id, data) {
    const validId = StudentChallengeValidator.validateId(id, "Challenge ID");
    const validData = StudentChallengeValidator.validateUpdateStudentChallenge(data);

    const existingChallenge = await db.query.studentChallenges.findFirst({
      where: eq(studentChallenges.id, validId),
    });

    if (!existingChallenge) {
      throw new ApiError(404, "Student challenge not found");
    }

    const [updatedChallenge] = await db
      .update(studentChallenges)
      .set({
        ...validData,
      })
      .where(eq(studentChallenges.id, validId))
      .returning();

    return updatedChallenge;
  }
}

export default new StudentChallengeService();
