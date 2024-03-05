import mongoose from "mongoose";

interface TeacherAbsentInterface extends mongoose.Document {
    teachers: string[],
    rooms: string[],
    createdAt: string,
    updatedAt: string
}

const teacherAbsentSchema = new mongoose.Schema({
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "room"
    }]
},{
    timestamps: true,
    expireAfterSeconds: 86400
})