import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware";
import {
  addTimetable,
  deleteTimetable,
  getCourses,
  getTimetable,
} from "../controllers/timetable.controller";

const router = Router();

router.route("/courses").get(getCourses);

router.route("/").get(getTimetable);

router.route("/new").post(verifyJWT, addTimetable);

router.route("/delete/:timetableId").delete(verifyJWT, deleteTimetable);

export default router;
