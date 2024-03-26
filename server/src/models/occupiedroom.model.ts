import mongoose from "mongoose";
import { TimeTable } from "./timetable.model";

interface RoomOccupiedInterface extends mongoose.Document {
  room: string;
  occupiedBy: string;
}

interface RoomOccupiedModel extends mongoose.Model<RoomOccupiedInterface> {
  isRoomAvailable(time: string, roomId: string): Promise<{ rooms: string[] }[]>
}

const roomOccupiedSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
    },
    time: {
      type: String,
      required: true,
      trim: true
    },
    occupiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now,
    }
  }
);

roomOccupiedSchema.statics.isRoomAvailable = async function (time: string, roomId: string) {
  const occupiedRooms = await TimeTable.aggregate(
    [
      {
        $match: {
          "classes.allotedTime": time,
        },
      },
      {
        $group: {
          _id: "$classes.allotedRoom",
        },
      },
      {
        $unwind: "$_id",
      },
      {
        $group: {
          _id: null,
          room: {
            $addToSet: { $toString: "$_id" },
          },
        },
      },
      {
        $lookup: {
          from: "occupiedrooms",
          pipeline: [
            {
              $match: {
                time,
              },
            },
            {
              $project: {
                room: { $toString: "$room" },
                _id: 0,
              },
            },
          ],
          as: "occupiedrooms",
        },
      },
      {
        $project: {
          _id: 0,
          rooms: {
            $concatArrays: [
              "$room",
              "$occupiedrooms.room",
            ],
          },
        },
      },
    ]
  )
  if(occupiedRooms.length === 0 || occupiedRooms[0].rooms.includes(roomId)){
    return false
  }
  return true
}

roomOccupiedSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

export const RoomOccupied = mongoose.model<RoomOccupiedInterface, RoomOccupiedModel>(
  "occupiedroom",
  roomOccupiedSchema
);
