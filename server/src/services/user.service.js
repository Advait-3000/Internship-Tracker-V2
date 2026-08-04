import { db } from "../config/db.js";
import { users } from "../drizzle/schema/usersSchema.js";
import { facultyMentors } from "../drizzle/schema/facultyMentorsSchema.js";
import { eq, ilike, and, desc } from "drizzle-orm";

import { ApiError } from "../utils/ApiError.js";
import { UserValidator } from "../validations/userValidation.js";
import { DepartmentValidator } from "../validations/departmentValidation.js";

class UserService {
  async getAllUsers(filters = {}) {
    const validFilters = UserValidator.validateGetUsersQuery(filters);

    const conditions = [];

    if (validFilters.search) {
      conditions.push(
        ilike(users.fullName, `%${validFilters.search}%`)
      );
    }

    if (validFilters.email) {
      conditions.push(eq(users.email, validFilters.email));
    }

    if (validFilters.departmentId) {
      conditions.push(
        eq(users.departmentId, validFilters.departmentId)
      );
    }

    const whereClause =
      conditions.length > 0
        ? and(...conditions)
        : undefined;

    return db.query.users.findMany({
      where: whereClause,
      orderBy: [desc(users.createdAt)],
      columns: {
        passwordHash: false,
        refreshToken: false,
      },
    });
  }

  async getUsersByDepartmentId(departmentId) {
    const validDepartmentId = DepartmentValidator.validateDepartmentId(departmentId);
    console.log(validDepartmentId)
    return await db.query.users.findMany({
      where: eq(users.departmentId, validDepartmentId),
      orderBy: [desc(users.createdAt)],
      columns: {
        passwordHash: false,
        refreshToken: false,
      },
      with: {
        Departments: true,
      },
    });
  }

  async getUserById(userId) {
    const validId = UserValidator.validateId(userId, "User ID");

    const user = await db.query.users.findFirst({
      where: eq(users.id, validId),
      columns: {
        passwordHash: false,
        refreshToken: false,
      },
      with: {
        Departments: true,
        Branches: true,
        AcademicYears: true,
        Divisions: true,
        Semesters: true,
        StudentStatuses: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }

  async getUserByRole(roleId, requesterId) {
    const validRoleId = UserValidator.validateRoleId(roleId, "Role ID");
    
    // Default condition is just by roleId
    const conditions = [eq(users.roleId, validRoleId)];

    // If a requester context is provided, apply access control
    if (requesterId) {
      const requester = await db.query.users.findFirst({
        where: eq(users.id, requesterId),
        with: { Roles: true }
      });

      if (requester && requester.Roles) {
        const requesterRole = requester.Roles.roleName.toUpperCase();
        
        if (requesterRole === "ADMIN") {
          // Admins can only see users of their own department
          if (requester.departmentId) {
            conditions.push(eq(users.departmentId, requester.departmentId));
          } else {
            // If admin has no department, they shouldn't see anything for security
            throw new ApiError(403, "Admin does not have an assigned department");
          }
        } else if (requesterRole === "FACULTY" || requesterRole === "FACULTY_MENTOR") {
          // Faculty can only see users assigned to them as a mentor
          const facultyMentorRecord = await db.query.facultyMentors.findFirst({
            where: eq(facultyMentors.userId, requester.id)
          });
          
          if (facultyMentorRecord) {
            conditions.push(eq(users.facultyMentorId, facultyMentorRecord.id));
            if (requester.departmentId) {
               conditions.push(eq(users.departmentId, requester.departmentId));
            }
          } else {
            // If faculty is not found in facultyMentors, they have no assigned students
            return []; 
          }
        }
        // SUPERADMIN has no additional filters
      }
    }

    const usersByRole = await db.query.users.findMany({
      where: and(...conditions),
      columns: {
        passwordHash: false,
        refreshToken: false,
      },
      with: {
        Departments: true,
        Branches: true,
        AcademicYears: true,
        Divisions: true,
        Semesters: true,
        StudentStatuses: true,
      },
    });

    if (!usersByRole) {
      throw new ApiError(404, "Users not found for this role");
    }

    return usersByRole;
  }

  async getFacultyStudents(facultyUserId) {
    const validUserId = UserValidator.validateId(facultyUserId, "Faculty User ID");

    const facultyMentorRecord = await db.query.facultyMentors.findFirst({
      where: eq(facultyMentors.userId, validUserId)
    });

    if (!facultyMentorRecord) {
      throw new ApiError(404, "Faculty mentor profile not found for this user");
    }

    const students = await db.query.users.findMany({
      where: eq(users.facultyMentorId, facultyMentorRecord.id),
      columns: {
        passwordHash: false,
        refreshToken: false,
      },
      with: {
        Departments: true,
        Branches: true,
        AcademicYears: true,
        Divisions: true,
        Semesters: true,
        StudentStatuses: true,
      }
    });

    return students;
  }

  async updateUser(userId, data) {
    const validId =
      UserValidator.validateId(userId, "User ID");

    const validData =
      UserValidator.validateUpdateUser(data);

    const existingUser =
      await db.query.users.findFirst({
        where: eq(users.id, validId),
      });

    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    const [updatedUser] = await db
      .update(users)
      .set({
        ...validData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, validId))
      .returning({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        mobileNumber: users.mobileNumber,
        gender: users.gender,
        address: users.address,
        imageUrl: users.imageUrl,
        departmentId: users.departmentId,
        branchId: users.branchId,
      });

    return updatedUser;
  }

  async deleteUser(userId) {
    const validId =
      UserValidator.validateId(userId, "User ID");

    const existingUser =
      await db.query.users.findFirst({
        where: eq(users.id, validId),
      });

    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    await db.delete(users).where(eq(users.id, validId));

    return {
      id: validId,
    };
  }
}

export default new UserService();