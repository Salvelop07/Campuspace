"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./src/middlewares/error.middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "5mb" }));
app.use(express_1.default.static("public"));
const user_route_1 = __importDefault(require("./src/routes/user.route"));
app.use("/api/v1/users", user_route_1.default);
app.use(error_middleware_1.default);
exports.default = app;
