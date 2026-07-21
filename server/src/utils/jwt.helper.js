import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, roleId) => {
  return jwt.sign(
    { _id: userId, role: roleId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d" }
  );
};
