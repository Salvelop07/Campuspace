"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherAbsent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const teacherAbsentSchema = new mongoose_1.default.Schema({
    teachers: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user"
        }],
    day: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    expireAfterSeconds: 86400
});
const TeacherAbsent = mongoose_1.default.model("teacherabsent", teacherAbsentSchema);
exports.TeacherAbsent = TeacherAbsent;
