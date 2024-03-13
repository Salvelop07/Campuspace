import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { Room } from "../models/room.model";
import { ApiResponse } from "../utils/ApiResponse";

const getRooms = asyncHandler(async (_: Request, res: Response) => {
  const rooms = await Room.find();
  if (!rooms) {
    throw new ApiError(404, "Rooms not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Rooms were retrieved successfully"));
});

// const getVacantRooms = asyncHandler(async (req: Request, res: Response) => {
//   const {day} = req.query
//   if (!day) {
//     throw new ApiError(400, "Day is required");
//   }

//   const rooms = await Room.find();
// })

const addRooms = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "User not verified");
  }

  const { isAdmin } = req.user;
  if (!isAdmin) {
    throw new ApiError(403, "User not authorized");
  }

  const { rooms } = req.body;
  if (
    !rooms ||
    !rooms.length ||
    !rooms[0].roomNumber ||
    !rooms[0].capacity ||
    !rooms[0].location
  ) {
    throw new ApiError(400, "Rooms required");
  }
  const roomNumbers = rooms.map(
    (room: { roomNumber: string; capacity: number; location: string }) =>
      room.roomNumber
  );

  const roomExists = await Room.findOne({ roomNumber: { $in: roomNumbers } });
  if (roomExists) {
    throw new ApiError(400, "Some room already exists with same room number");
  }

  const createRooms = await Room.create(rooms);
  if (!createRooms) {
    throw new ApiError(400, "Rooms not created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createRooms, "Rooms were created"));
});

const deleteRoom = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "User not verified");
  }

  const { roomId } = req.params;
  if (!roomId) {
    throw new ApiError(400, "Room id is required");
  }

  const { isAdmin } = req.user;
  if (!isAdmin) {
    throw new ApiError(403, "User not authorized");
  }

  await Room.findByIdAndDelete(roomId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Room deleted successfully"));
});

export { addRooms, deleteRoom, getRooms };
