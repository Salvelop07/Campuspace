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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const user_model_1 = require("../models/user.model");
const verifyJWT = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new ApiError_1.ApiError(400, "Token is required");
        }
        const decodedToken = yield jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id)) {
            throw new ApiError_1.ApiError(401, "Invalid token");
        }
        const user = yield user_model_1.User.findById(decodedToken._id).select("-password");
        if (!user) {
            throw new ApiError_1.ApiError(400, "User not found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        let message = "Something went wrong while verifying the user";
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            message = "Token expired!";
        }
        next(error);
    }
});
exports.default = verifyJWT;
