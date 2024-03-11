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
exports.becomeAdmin = exports.loginUser = exports.registerUser = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const user_model_1 = require("../models/user.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const generateAccessToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        return yield user.generateAccessToken();
    }
    catch (err) {
        console.log(err);
        throw new ApiError_1.ApiError(500, "Something went wrong, while generating access and refresh tokens");
    }
});
const registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, isAdmin } = req.body;
    if (!fullName.trim() || !email.trim() || !password.trim()) {
        throw new ApiError_1.ApiError(400, "All fields are required");
    }
    const userExists = yield user_model_1.User.findOne({ email });
    if (userExists) {
        throw new ApiError_1.ApiError(400, "User with this email already exists");
    }
    const user = yield user_model_1.User.create({
        fullName, email, password
    });
    if (!user) {
        throw new ApiError_1.ApiError(400, "Something went wrong, while registering the user");
    }
    const accessToken = yield generateAccessToken(user._id.toString());
    res.status(201).json(new ApiResponse_1.ApiResponse(201, { user, accessToken }, "User registered successfully"));
}));
exports.registerUser = registerUser;
const loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
        throw new ApiError_1.ApiError(400, "All fields are required");
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    const isPasswordCorrect = yield user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError_1.ApiError(400, "Invalid email or password");
    }
    const accessToken = yield generateAccessToken(user._id.toString());
    res.status(200).json(new ApiResponse_1.ApiResponse(200, { user, accessToken }, "User logged in successfully"));
}));
exports.loginUser = loginUser;
const becomeAdmin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new ApiError_1.ApiError(401, "User not verified");
    }
    const { _id } = req.user;
    const user = yield user_model_1.User.findById(_id);
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    if (user.isAdmin) {
        throw new ApiError_1.ApiError(400, "User is already an admin");
    }
    user.isAdmin = true;
    user.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, {}, "User is now an admin"));
}));
exports.becomeAdmin = becomeAdmin;
