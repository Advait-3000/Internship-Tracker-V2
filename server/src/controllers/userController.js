import UserService from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class UserController {
  getUsers = asyncHandler(async (req, res) => {
    const users = await UserService.getAllUsers(req.query);
    res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
  });

  getUserByDepartmentId = asyncHandler(async (req, res) => {
    const users = await UserService.getUsersByDepartmentId(req.params.departmentId);
    res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
  });

  getUserById = asyncHandler(async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, user, "User retrieved successfully"));
  });

  getUserByRole = asyncHandler(async (req, res) => {
    // Pass requester ID for role-based access control
    const requesterId = req.user?._id; 
    const usersByRole = await UserService.getUserByRole(req.params.roleId, requesterId);
    res
      .status(200)
      .json(new ApiResponse(200, usersByRole, "Users retrieved successfully"));
  });

  getFacultyStudents = asyncHandler(async (req, res) => {
    const facultyUserId = req.user?._id;
    const students = await UserService.getFacultyStudents(facultyUserId);
    res
      .status(200)
      .json(new ApiResponse(200, students, "Assigned students retrieved successfully"));
  });

  updateUser = asyncHandler(async (req, res) => {
    const updatedUser = await UserService.updateUser(
      req.params.id,
      req.body
    );

    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully"));
  });

  deleteUser = asyncHandler(async (req, res) => {
    await UserService.deleteUser(req.params.id);

    res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully"));
  });
}

export default new UserController();