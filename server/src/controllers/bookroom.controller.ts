import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { RoomOccupied } from "../models/roomoccupied.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const bookRoom = asyncHandler(async (req: Request, res: Response) => {
  const { occupiedBy, room } = req.body;

  if (!occupiedBy || !room) {
    return res.status(400).json({ message: "Teachers and room are required" });
  }

  const roomOccupied = await RoomOccupied.create({
    occupiedBy,
    room,
  });

  if (!roomOccupied) {
    throw new ApiError(400, "Room not booked");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, roomOccupied, "Room booked successfully"));
});

export {
  bookRoom
}