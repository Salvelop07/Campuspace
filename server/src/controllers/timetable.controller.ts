import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { TimeTable } from "../models/timetable.model";
import { ApiResponse } from "../utils/ApiResponse";

const addTimetable = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "User not verified");
  }

  const { isAdmin } = req.user;
  if (!isAdmin) {
    throw new ApiError(403, "User not authorized");
  }

  const { course, semester, classes, stream } = req.body;
  if (
    !course.trim() ||
    !semester.trim() ||
    !stream.trim() ||
    !classes ||
    !classes.length ||
    !classes[0].allotedRoom.trim() ||
    !classes[0].allotedTime.trim() ||
    !classes[0].teacher.trim() ||
    !classes[0].subject.trim()
  ) {
    throw new ApiError(
      400,
      "Course, semester, stream and classes are required"
    );
  }

  const timetable = TimeTable.create({
    course,
    semester,
    classes,
  });

  if (!timetable) {
    throw new ApiError(500, "Something went wrong, while creating timetable");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, timetable, "Timetable created successfully"));
});

const deleteTimetable = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "User not verified");
  }

  const { timetableId } = req.params;
  if (!timetableId) {
    throw new ApiError(400, "Timetable id is required");
  }

  const { isAdmin } = req.user;
  if (!isAdmin) {
    throw new ApiError(403, "User not authorized");
  }

  await TimeTable.findByIdAndDelete(timetableId);

  return res.status(200).json(new ApiResponse(200, {}, "Timetable deleted"));
});

export { addTimetable, deleteTimetable };
