"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
const cloudinary_1 = require("../utils/cloudinary");
const timetable_model_1 = require("../models/timetable.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const addTimeTable = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, "User not verified");
    }
    const { _id, isAdmin } = req.user;
    if (!isAdmin) {
        throw new ApiError_1.ApiError(401, "User not authorized");
    }
    const { course, semester, classes } = req.body;
    if (!course.trim() || !semester.trim() || !classes.length || !classes[0].allotedRoom.trim() || !classes[0].allotedTime.trim() || !classes[0].teacher.trim() || !classes[0].subject.trim()) {
        throw new ApiError_1.ApiError(400, "Course, semester and classes are required");
    }
    if (!req.file || !req.file.path) {
        throw new ApiError_1.ApiError(400, "Timetable image is required");
    }
    const timetableLocalPath = req.file.path;
    const timetableImage = yield (0, cloudinary_1.uploadToCloudinary)(timetableLocalPath);
    const timetable = timetable_model_1.TimeTable.create({
        course,
        semester,
        classes,
        timetableImage
    });
    if (!timetable) {
        throw new ApiError_1.ApiError(500, "Something went wrong, while creating timetable");
    }
    res.status(201).json(new ApiResponse_1.ApiResponse(201, timetable, "Timetable created successfully"));
}));
