import StudentChallengeService from "../services/studentChallenge.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class StudentChallengeController {
  createStudentChallenge = asyncHandler(async (req, res) => {
    const challenge = await StudentChallengeService.createStudentChallenge(req.body);
    res.status(201).json(new ApiResponse(201, challenge, "Student challenge created successfully"));
  });

  getStudentChallenges = asyncHandler(async (req, res) => {
    const challenges = await StudentChallengeService.getStudentChallenges(req.query, req.user);
    res.status(200).json(new ApiResponse(200, challenges, "Student challenges retrieved successfully"));
  });

  getStudentChallengeById = asyncHandler(async (req, res) => {
    const challenge = await StudentChallengeService.getStudentChallengeById(req.params.id, req.user);
    res.status(200).json(new ApiResponse(200, challenge, "Student challenge retrieved successfully"));
  });

  updateStudentChallenge = asyncHandler(async (req, res) => {
    const updatedChallenge = await StudentChallengeService.updateStudentChallenge(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, updatedChallenge, "Student challenge updated successfully"));
  });
}

export default new StudentChallengeController();
