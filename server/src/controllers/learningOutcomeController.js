import LearningOutcomeService from "../services/learningOutcome.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class LearningOutcomeController {
  createLearningOutcome = asyncHandler(async (req, res) => {
    const outcome = await LearningOutcomeService.createLearningOutcome(req.body);
    res.status(201).json(new ApiResponse(201, outcome, "Learning outcome created successfully"));
  });

  getLearningOutcomes = asyncHandler(async (req, res) => {
    const outcomes = await LearningOutcomeService.getLearningOutcomes(req.query, req.user);
    res.status(200).json(new ApiResponse(200, outcomes, "Learning outcomes retrieved successfully"));
  });

  updateLearningOutcome = asyncHandler(async (req, res) => {
    const updatedOutcome = await LearningOutcomeService.updateLearningOutcome(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, updatedOutcome, "Learning outcome updated successfully"));
  });
}

export default new LearningOutcomeController();
