import { Router } from "express";
import AuthController from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { authLimiter } from "../middlewares/rateLimiterMiddleware.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", authLimiter, AuthController.login);
router.post("/refresh-token", AuthController.refreshTokens);

// Secured routes
router.post("/logout", verifyJWT, AuthController.logout);
router.post("/logout-all", verifyJWT, AuthController.logoutAll);

export default router;