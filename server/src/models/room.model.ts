import mongoose from "mongoose";

interface RoomInterface extends mongoose.Document {
    roomNumber: string,
    capacity: number,
    location: number
    createdAt: string,
    updatedAt: string
}

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Room = mongoose.model("room", roomSchema)

export {
    Room,
    RoomInterface
}