import { Router } from "express";
import StudentChallengeController from "../controllers/studentChallengeController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", StudentChallengeController.createStudentChallenge);
router.get("/", StudentChallengeController.getStudentChallenges);
router.get("/:id", StudentChallengeController.getStudentChallengeById);
router.put("/:id", StudentChallengeController.updateStudentChallenge);

export default router;
