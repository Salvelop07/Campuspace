import mongoose from "mongoose";
import { Room } from "./room.model";

interface RoomOccupiedInterface extends mongoose.Document {
  room: string;
  occupiedBy: string;
}

interface RoomOccupiedModel extends mongoose.Model<RoomOccupiedInterface> {
  isRoomAvailable(time: string, roomId: string): Promise<boolean>
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
  const freeRooms = await Room.aggregate([
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
              roomId: { $toString: "$room" },
              _id: 0,
            },
          },
        ],
        as: "occupiedrooms",
      },
    },
    {
      $lookup: {
        from: "timetables",
        pipeline: [
          { $unwind: "$classes" },
          {
            $match: {
              "classes.allotedTime": time,
            },
          },
          {
            $group: {
              _id: null,
              rooms: {
                $addToSet: {
                  $toString: "$classes.allotedRoom",
                },
              },
            },
          },
        ],
        as: "timetable",
      },
    },
    {
      $project: {
        rooms: {
          $reduce: {
            input: "$timetable.rooms",
            initialValue: [],
            in: {
              $concatArrays: ["$$value", "$$this"],
            },
          },
        },
        _id: { $toString: "$_id" },
        roomNumber: 1,
        capacity: 1,
        location: 1,
        occupiedrooms: {
          $map: {
            input: "$occupiedrooms",
            as: "item",
            in: "$$item.roomId",
          },
        },
      },
    },
    {
      $match: {
        $expr: {
          $not: {
            $in: [
              "$_id",
              {
                $concatArrays: [
                  "$rooms",
                  "$occupiedrooms",
                ],
              },
            ],
          },
        },
      },
    },
    {
      $project: {
        rooms: 0,
        occupiedrooms: 0,
      },
    },
  ])
  if (freeRooms.length === 0) {
    return false
  }
  freeRooms.map((room) => {
    if (room._id.toString() === roomId) {
      return false
    }
  })
  return true
}

roomOccupiedSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

export const RoomOccupied = mongoose.model<RoomOccupiedInterface, RoomOccupiedModel>(
  "occupiedroom",
  roomOccupiedSchema
);
