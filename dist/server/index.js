"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./src/db"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 5000;
(0, db_1.default)()
    .then(() => app_1.default.listen(port, () => console.log(`Server is running on port ${port}`)))
    .catch(err => console.log("MONGODB_CONNECTION_ERROR !!!!", err));
