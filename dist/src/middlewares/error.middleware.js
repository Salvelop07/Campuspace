"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../utils/ApiError");
const mongoose_1 = require("mongoose");
const errorHandler = (err, _, res, next) => {
    let error = err;
    if (!(error instanceof ApiError_1.ApiError)) {
        const statusCode = error.statusCode || mongoose_1.Error ? 400 : 500;
        const message = error.message || "Something went wrong!";
        error = new ApiError_1.ApiError(statusCode, message, (error === null || error === void 0 ? void 0 : error.errors) || [], err === null || err === void 0 ? void 0 : err.stack);
    }
    const response = Object.assign(Object.assign(Object.assign({}, error), { message: error.message }), (process.env.NODE_ENV === "development" ? { stack: error.stack } : {}));
    return res.status(error.statusCode).json(response);
};
exports.default = errorHandler;
