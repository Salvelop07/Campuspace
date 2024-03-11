"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong!", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.data = null;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
