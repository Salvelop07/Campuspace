import mongoose from "mongoose";

interface TeacherAbsentInterface extends mongoose.Document {
  teachers: string[];
  day: string;
}

const teacherAbsentSchema = new mongoose.Schema(
  {
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    day: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    expireAfterSeconds: 86400,
  }
);

const TeacherAbsent = mongoose.model<TeacherAbsentInterface>(
  "teacherabsent",
  teacherAbsentSchema
);

export { TeacherAbsentInterface, TeacherAbsent };
