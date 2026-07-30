import { Router } from "express";
import weeklyReportRoutes from "./weeklyReports.routes.js";
import studentChallengeRoutes from "./studentChallenges.routes.js";
import learningOutcomeRoutes from "./learningOutcomes.routes.js";

const router = Router();

router.use("/weekly-reports", weeklyReportRoutes);
router.use("/student-challenges", studentChallengeRoutes);
router.use("/learning-outcomes", learningOutcomeRoutes);

export default router;
