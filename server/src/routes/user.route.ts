import { Router } from "express";
import {
  becomeAdmin,
  deleteTeacher,
  getCurrentUser,
  getTeachers,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
import verifyJWT from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(getTeachers);

router.route("/login").post(loginUser);

router.route("/get").get(verifyJWT, getCurrentUser)

router.route("/register").post(verifyJWT, registerUser);

router.route("/admin/:teacherId").patch(verifyJWT, becomeAdmin);

router.route("/delete/:teacherId").delete(verifyJWT, deleteTeacher);

export default router;