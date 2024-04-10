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
    !course ||
    !semester ||
    !stream ||
    !classes ||
    !classes.length ||
    !classes[0].allotedRoom ||
    !classes[0].allotedTime ||
    !classes[0].teacher ||
    !classes[0].subject ||
    !classes[0].paperId ||
    !classes[0].day
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const timetable = await TimeTable.create({
    course,
    semester,
    classes,
    stream,
  });

  if (!timetable) {
    throw new ApiError(400, "Something went wrong, while creating timetable");
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

const getCourses = asyncHandler(async (req: Request, res: Response) => {
  const { stream } = req.query;
  if (!stream) {
    throw new ApiError(400, "Stream is required");
  }

  const courses = await TimeTable.aggregate([
    { $match: { stream } },
    {
      $group: {
        _id: "$course",
        semester: { $addToSet: "$semester" },
      },
    },
    {
      $project: {
        course: "$_id",
        semester: 1,
        _id: 0
      }
    }
  ]);

  if (!courses || !courses.length) {
    throw new ApiError(404, "Courses not found");
  }

  return res.status(200).json(new ApiResponse(200, courses, "Courses found"));
});

const getTimetable = asyncHandler(async (req: Request, res: Response) => {
  const { course, semester, stream } = req.query;
  if (!course || !semester || !stream) {
    throw new ApiError(400, "Course, semester and stream are required");
  }

  const timetable = await TimeTable.findOne({
    course,
    semester,
    stream,
  }).populate({
    path: "classes.teacher",
    select: "fullName",
    model: "user",
    strictPopulate: false,
  }).populate({
    path: "classes.allotedRoom",
    select: "roomNumber",
    model: "room",
    strictPopulate: false
  })

  if (!timetable) {
    throw new ApiError(404, "Timetable not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, timetable, "Timetable found"));
});

const getAllTimetables = asyncHandler(async (_: Request, res: Response) => {
  const timetables = await TimeTable.find().populate({
    path: "classes.teacher",
    select: "fullName",
    model: "user",
    strictPopulate: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, timetables, "Timetables found"));
});

export { addTimetable, deleteTimetable, getCourses, getTimetable, getAllTimetables };
