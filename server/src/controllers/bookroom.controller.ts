import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { RoomOccupied } from "../models/occupiedroom.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const bookRoom = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "User not verified");
  }
  const { _id } = req.user;
  const { roomId } = req.params;

  if (!roomId) {
    return res.status(400).json({ message: "Teachers and room are required" });
  }

  const roomOccupied = await RoomOccupied.create({
    occupiedBy: _id,
    room: roomId,
  });

  if (!roomOccupied) {
    throw new ApiError(400, "Room not booked");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, roomOccupied, "Room booked successfully"));
});

export { bookRoom };
