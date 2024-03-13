import { Router } from "express";
import {
  addTeachersAbsent,
  getTeachersAbsent,
} from "../controllers/teachersabsent.controller";
import verifyJWT from "../middlewares/auth.middleware";

const router = Router();

router.route("/").get(getTeachersAbsent);

router.route("/new").post(verifyJWT, addTeachersAbsent);

export default router;
