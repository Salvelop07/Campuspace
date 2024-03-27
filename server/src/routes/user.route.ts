import { Router } from "express";
import {
  changeAdmin,
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

router.route("/admin/:teacherId").patch(verifyJWT, changeAdmin);

router.route("/delete/:teacherId").delete(verifyJWT, deleteTeacher);

export default router;