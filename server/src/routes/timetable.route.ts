import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware";
import {
  addTimetable,
  deleteTimetable,
} from "../controllers/timetable.controller";

const router = Router();

router.use(verifyJWT);

router.route("/new").post(addTimetable);

router.route("/delete/:timetableId").delete(deleteTimetable);

export default router;
