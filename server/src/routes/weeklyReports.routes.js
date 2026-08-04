import { Router } from "express";
import WeeklyReportController from "../controllers/weeklyReportController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", WeeklyReportController.createWeeklyReport);
router.get("/", WeeklyReportController.getWeeklyReports);
router.get("/:id", WeeklyReportController.getWeeklyReportById);
router.put("/:id", WeeklyReportController.updateWeeklyReport);

export default router;
