import { Router } from "express";
import {
  becomeAdmin,
  deleteTeacher,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
import verifyJWT from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyJWT);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/admin/:teacherId").patch(becomeAdmin);

router.route("/delete/:teacherId").delete(deleteTeacher);

export default router;