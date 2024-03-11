"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./src/middlewares/error.middleware"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "5mb" }));
app.use(express_1.default.static("public"));
const user_route_1 = __importDefault(require("./src/routes/user.route"));
app.use("/api/v1/users", user_route_1.default);
const __dirname1 = path_1.default.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname1, "client", "dist")));
    app.get("*", (_, res) => {
        res.sendFile(path_1.default.resolve(__dirname1, "client", "dist", "index.html"));
    });
}
else {
    app.get("/", (_, res) => {
        res.send("App is under development!");
    });
}
app.use(error_middleware_1.default);
exports.default = app;
