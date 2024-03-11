import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadToCloudinary } from "../utils/cloudinary";
import { TimeTable } from "../models/timetable.model";
import { ApiResponse } from "../utils/ApiResponse";

const addTimeTable = asyncHandler(
    async (req: Request, res: Response) => {
        if (!req.user) {
            throw new ApiError(401, "User not verified")
        }

        const { _id, isAdmin } = req.user
        if (!isAdmin) {
            throw new ApiError(401, "User not authorized")
        }

        const { course, semester, classes, stream } = req.body
        if (!course.trim() || !semester.trim() || !stream.trim() || !classes.length || !classes[0].allotedRoom.trim() || !classes[0].allotedTime.trim() || !classes[0].teacher.trim() || !classes[0].subject.trim()) {
            throw new ApiError(400, "Course, semester and classes are required")
        }


        const timetable = TimeTable.create({
            course,
            semester,
            classes,
        })

        if (!timetable) {
            throw new ApiError(500, "Something went wrong, while creating timetable")
        }

        res.status(201).json(
            new ApiResponse(201, timetable, "Timetable created successfully")
        )
    }
)