import WeeklyReportService from "../services/weeklyReportService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

class WeeklyReportController {
  createWeeklyReport = asyncHandler(async (req, res) => {
    const report = await WeeklyReportService.createWeeklyReport(req.body);
    res.status(201).json(new ApiResponse(201, report, "Weekly report created successfully"));
  });

  getWeeklyReports = asyncHandler(async (req, res) => {
    const reports = await WeeklyReportService.getWeeklyReports(req.query, req.user);
    res.status(200).json(new ApiResponse(200, reports, "Weekly reports retrieved successfully"));
  });

  getWeeklyReportById = asyncHandler(async (req, res) => {
    const report = await WeeklyReportService.getWeeklyReportById(req.params.id, req.user);
    res.status(200).json(new ApiResponse(200, report, "Weekly report retrieved successfully"));
  });

  updateWeeklyReport = asyncHandler(async (req, res) => {
    const updatedReport = await WeeklyReportService.updateWeeklyReport(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, updatedReport, "Weekly report updated successfully"));
  });
}

export default new WeeklyReportController();
