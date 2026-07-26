import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { users } from "../drizzle/schema/usersSchema.js";
import { roles } from "../drizzle/schema/rolesSchema.js";
import { eq } from "drizzle-orm";

import { ApiError } from "../utils/ApiError.js";
import {
  hashPassword,
  comparePassword,
} from "../utils/passwordHelper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwtHelper.js";

import { AuthValidator } from "../validations/authValidation.js";

class AuthService {
  async register(data) {
    const validatedData = AuthValidator.validateRegister(data);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (existingUser) {
      throw new ApiError(409, "User with email already exists");
    }

    const hashedPassword = await hashPassword(validatedData.password);

    let roleId = null;
    let roleName = null;

    if (validatedData.roleName) {
      const role = await db.query.roles.findFirst({
        where: eq(
          roles.roleName,
          validatedData.roleName.toLowerCase()
        ),
      });

      if (role) {
        roleId = role.id;
        roleName = role.roleName;
      }
    }

    const [newUser] = await db
      .insert(users)
      .values({
        fullName: validatedData.fullName,
        email: validatedData.email,
        passwordHash: hashedPassword,
        roleId,
      })
      .returning();

    const {
      passwordHash,
      refreshToken,
      ...userWithoutSensitiveInfo
    } = newUser;

    if (roleName) {
      userWithoutSensitiveInfo.role = roleName;
    }

    return userWithoutSensitiveInfo;
  }

  async login(data) {
    const validatedData = AuthValidator.validateLogin(data);

    const user = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
      with: {
        Roles: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
      validatedData.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = generateAccessToken(
      user.id,
      user.roleId
    );

    const refreshToken = generateRefreshToken(user.id);

    await db
      .update(users)
      .set({
        refreshToken,
      })
      .where(eq(users.id, user.id));

    const {
      passwordHash,
      refreshToken: dbRefreshToken,
      Roles,
      ...userWithoutSensitiveInfo
    } = user;

    if (Roles) {
      userWithoutSensitiveInfo.role = Roles.roleName;
    }

    return {
      user: userWithoutSensitiveInfo,
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(incomingRefreshToken) {
    const validatedData =
      AuthValidator.validateRefreshToken({
        refreshToken: incomingRefreshToken,
      });

    try {
      jwt.verify(
        validatedData.refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
    } catch {
      throw new ApiError(
        401,
        "Invalid or expired refresh token"
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(
        users.refreshToken,
        validatedData.refreshToken
      ),
    });

    if (!user) {
      throw new ApiError(
        401,
        "Invalid refresh token or already used"
      );
    }

    const accessToken = generateAccessToken(
      user.id,
      user.roleId
    );

    const refreshToken = generateRefreshToken(user.id);

    await db
      .update(users)
      .set({
        refreshToken,
      })
      .where(eq(users.id, user.id));

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId) {
    await db
      .update(users)
      .set({
        refreshToken: null,
      })
      .where(eq(users.id, userId));
  }
}

export default new AuthService();