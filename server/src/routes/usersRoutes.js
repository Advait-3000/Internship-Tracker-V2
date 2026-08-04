import { Router } from "express";
import UserController from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const router = Router();

router.use(verifyJWT); // Secure all user routes

router.get("/", requireRole("SUPERADMIN", "ADMIN", "FACULTY_MENTOR"), UserController.getUsers);
router.get("/faculty/students", requireRole("FACULTY", "FACULTY_MENTOR"), UserController.getFacultyStudents);
router.get("/:departmentId", requireRole("SUPERADMIN", "ADMIN"), UserController.getUserByDepartmentId);
router.get("/:id", UserController.getUserById);
router.get("/role/:roleId", UserController.getUserByRole);
router.put("/:id", UserController.updateUser);
router.delete("/:id", requireRole("ADMIN"), UserController.deleteUser);


export default router;
 