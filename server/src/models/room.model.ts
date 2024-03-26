import mongoose from "mongoose";
import { TimeTable } from "./timetable.model";

interface RoomInterface extends mongoose.Document {
  roomNumber: string;
  capacity: number;
  location: number;
}

interface RoomModel extends mongoose.Model<RoomInterface> {
  getOccupiedRooms(
    time: string
  ): Promise<{ rooms: string[] }[]>;
}

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.statics.getOccupiedRooms = function (time: string) {
  return TimeTable.aggregate(
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
      {
        $lookup: {
          from: "rooms",
          let: {
            busyrooms: "$rooms",
          },
          pipeline: [
            {
              $project: {
                _id: { $toString: "$_id" },
                roomNumber: 1,
                capacity: 1,
                location: 1,
              },
            },
            {
              $match: {
                $expr: {
                  $not: { $in: ["$_id", "$$busyrooms"], }
                },
              },
            },
          ],
          as: "rooms",
        },
      },
    ]
  )
}

const Room = mongoose.model<RoomInterface, RoomModel>("room", roomSchema);

export { Room, RoomInterface };
