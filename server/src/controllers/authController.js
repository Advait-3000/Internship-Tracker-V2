import AuthService from "../services/authservice.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

class AuthController {
  register = asyncHandler(async (req, res) => {
    const user = await AuthService.register(req.body);

    res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  });

  login = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } =
      await AuthService.login(req.body);

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "User logged in successfully"
        )
      );
  });

  logout = asyncHandler(async (req, res) => {
    await AuthService.logout(req.user.id);

    res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  });

  logoutAll = asyncHandler(async (req, res) => {
    await AuthService.logout(req.user.id);

    res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, {}, "Logged out from all devices"));
  });

  refreshTokens = asyncHandler(async (req, res) => {
    const refreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;

    const tokens = await AuthService.refreshTokens(refreshToken);

    res
      .status(200)
      .cookie("accessToken", tokens.accessToken, cookieOptions)
      .cookie("refreshToken", tokens.refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          tokens,
          "Access token refreshed"
        )
      );
  });
}

export default new AuthController();