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
    !rooms[0].roomNumber.trim() ||
    !rooms[0].capacity.trim() ||
    !rooms[0].location.trim()
  ) {
    throw new ApiError(400, "Rooms required");
  }

  const createRooms = await Room.bulkSave(rooms);
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
