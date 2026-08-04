import { Router } from "express";
import ProfileController from "../controllers/profileController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(verifyJWT); // Secure all profile routes

router.put("/:id", ProfileController.updateProfile);
router.get("/:id", ProfileController.getProfileById);

export default router;
