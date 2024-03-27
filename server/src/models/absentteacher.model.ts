import mongoose from "mongoose";

interface TeacherAbsentInterface extends mongoose.Document {
  teacher: string;
  day: string;
}

const teacherAbsentSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    day: {
      type: String,
      required: true,
      trim: true,
    },
     createdAt: {
      type: Date,
      expires: 86400,
      default: Date.now
    }
  }
);

const TeacherAbsent = mongoose.model<TeacherAbsentInterface>(
  "absentteacher",
  teacherAbsentSchema
);

export { TeacherAbsentInterface, TeacherAbsent };
