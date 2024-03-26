import mongoose from "mongoose";

interface TeacherAbsentInterface extends mongoose.Document {
  teachers: string;
  day: string;
}

const teacherAbsentSchema = new mongoose.Schema(
  {
    teachers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
