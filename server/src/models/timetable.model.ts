import mongoose from "mongoose"

interface TimeTableInterface extends mongoose.Document {
    course: string;
    semester: number;
    classes: {
        allotedRoom: string;
        allotedTime: string;
        teacher: string;
        paperId: number;
        subject: string;
    }[];
    createdAt: string,
    updatedAt: string
}

const timeTableSchema = new mongoose.Schema({
    course: {
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
            type: mongoose.Schema.Types.ObjectId,
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
})

const TimeTable = mongoose.model("TimeTable", timeTableSchema);

export {
    TimeTable,
    TimeTableInterface
};