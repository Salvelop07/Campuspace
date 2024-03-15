import mongoose from "mongoose";

interface RoomOccupiedInterface extends mongoose.Document {
  room: string;
  occupiedBy: string;
}

const roomOccupiedSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
    },
    occupiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    expireAfterSeconds: 3600,
  }
);

export const RoomOccupied = mongoose.model<RoomOccupiedInterface>(
  "occupiedroom",
  roomOccupiedSchema
);
