"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTable = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const timeTableSchema = new mongoose_1.default.Schema({
    course: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    classes: [{
            allotedRoom: String,
            allotedTime: String,
            teacher: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "user"
            },
            paperId: Number,
            subject: String,
            day: String
        }],
    timetableImage: {
        type: String,
        required: true
    }
});
const TimeTable = mongoose_1.default.model("TimeTable", timeTableSchema);
exports.TimeTable = TimeTable;
