import { Router } from "express";
import LearningOutcomeController from "../controllers/learningOutcomeController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", LearningOutcomeController.createLearningOutcome);
router.get("/", LearningOutcomeController.getLearningOutcomes);
router.get("/:id", LearningOutcomeController.getLearningOutcomeById);
router.put("/:id", LearningOutcomeController.updateLearningOutcome);

export default router;
