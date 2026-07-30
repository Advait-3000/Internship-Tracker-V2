import { db } from "../config/db.js";
import { learningOutcomes } from "../drizzle/schema/learningOutcomesSchema.js";
import { eq, and, desc, inArray } from "drizzle-orm";
import { ApiError } from "../utils/ApiError.js";
import { LearningOutcomeValidator } from "../validations/learningOutcomeValidation.js";
import { users } from "../drizzle/schema/usersSchema.js";
import { internships } from "../drizzle/schema/internshipsSchema.js";
import { facultyMentors } from "../drizzle/schema/facultyMentorsSchema.js";
import { companyMentors } from "../drizzle/schema/companyMentorsSchema.js";

class LearningOutcomeService {
  async createLearningOutcome(data) {
    const validData = LearningOutcomeValidator.validateCreateLearningOutcome(data);

    const [newOutcome] = await db
      .insert(learningOutcomes)
      .values({
        ...validData,
      })
      .returning();

    return newOutcome;
  }

  async getLearningOutcomes(filters = {}, user = null) {
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
        conditions.push(inArray(learningOutcomes.internshipId, allowedInternshipIds));
      }
    }

    if (filters.internshipId) {
      const validId = LearningOutcomeValidator.validateId(filters.internshipId, "Internship ID");
      conditions.push(eq(learningOutcomes.internshipId, validId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    return await db.query.learningOutcomes.findMany({
      where: whereClause,
      orderBy: [desc(learningOutcomes.id)],
    });
  }

  async updateLearningOutcome(id, data) {
    const validId = LearningOutcomeValidator.validateId(id, "Outcome ID");
    const validData = LearningOutcomeValidator.validateUpdateLearningOutcome(data);

    const existingOutcome = await db.query.learningOutcomes.findFirst({
      where: eq(learningOutcomes.id, validId),
    });

    if (!existingOutcome) {
      throw new ApiError(404, "Learning outcome not found");
    }

    const [updatedOutcome] = await db
      .update(learningOutcomes)
      .set({
        ...validData,
      })
      .where(eq(learningOutcomes.id, validId))
      .returning();

    return updatedOutcome;
  }
}

export default new LearningOutcomeService();
