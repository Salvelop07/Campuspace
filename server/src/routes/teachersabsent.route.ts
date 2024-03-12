import { Router } from "express";
import {
  addTeachers,
  getTeachersAbsent,
} from "../controllers/teachersabsent.controller";
import verifyJWT from "../middlewares/auth.middleware";

const router = Router();

router.route("/new").post(verifyJWT, addTeachers);

router.route("/").get(getTeachersAbsent);

export default router;
