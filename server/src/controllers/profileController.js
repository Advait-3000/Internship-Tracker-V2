import UserService from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class ProfileController {
  getProfileById = asyncHandler(async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, user, "Profile retrieved successfully"));
  });

  updateProfile = asyncHandler(async (req, res) => {
    const updatedUser = await UserService.updateUser(
      req.params.id,
      req.body
    );

    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
  });
}

export default new ProfileController();
