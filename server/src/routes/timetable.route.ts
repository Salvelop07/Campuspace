import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware";
import {
  addTimetable,
  deleteTimetable,
  getAllTimetables,
  getCourses,
  getTimetable,
} from "../controllers/timetable.controller";

const router = Router();

router.route("/courses").get(getCourses);

router.route("/").get(getTimetable);

router.route("/new").post(verifyJWT, addTimetable);

router.route("/delete/:timetableId").delete(verifyJWT, deleteTimetable);

router.route("/all").get(verifyJWT, getAllTimetables);

export default router;
