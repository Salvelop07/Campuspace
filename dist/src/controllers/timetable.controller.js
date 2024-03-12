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
const timetable_model_1 = require("../models/timetable.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const addTimetable = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, "User not verified");
    }
    const { isAdmin } = req.user;
    if (!isAdmin) {
        throw new ApiError_1.ApiError(401, "User not authorized");
    }
    const { course, semester, classes, stream } = req.body;
    if (!course.trim() ||
        !semester.trim() ||
        !stream.trim() ||
        !classes.length ||
        !classes[0].allotedRoom.trim() ||
        !classes[0].allotedTime.trim() ||
        !classes[0].teacher.trim() ||
        !classes[0].subject.trim()) {
        throw new ApiError_1.ApiError(400, "Course, semester, stream and classes are required");
    }
    const timetable = timetable_model_1.TimeTable.create({
        course,
        semester,
        classes,
    });
    if (!timetable) {
        throw new ApiError_1.ApiError(500, "Something went wrong, while creating timetable");
    }
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(201, timetable, "Timetable created successfully"));
}));
const removeTimetable = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, "User not verified");
    }
    const { isAdmin } = req.user;
    if (!req.user) {
    }
}));
