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
  const { roomId, time } = req.body;

  if (!roomId || !time) {
    return res.status(400).json({ message: "Time and room are required" });
  }

  const isAvailable = await RoomOccupied.isRoomAvailable(time, roomId)

  if (!isAvailable) {
    throw new ApiError(400, "Room already occupied")
  }

  const roomOccupied = await RoomOccupied.create({
    occupiedBy: _id,
    room: roomId,
    time
  })

  if (!roomOccupied) {
    throw new ApiError(400, "Room not booked");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, roomOccupied, "Room booked successfully"));
});

const unbookRoom = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "User not verified");
  }

  const { _id } = req.user;
  const { bookingId } = req.params;

  const bookedRoom = await RoomOccupied.findById(bookingId)
  if (!bookedRoom) {
    throw new ApiError(404, "Invalid booking ID")
  }

  const isAuthorized = bookedRoom.occupiedBy.toString() === _id.toString()
  if (!isAuthorized) {
    throw new ApiError(403, "Room not booked by current teacher")
  }

  await bookedRoom.deleteOne()

  return res.status(200).json(
    new ApiResponse(200, {}, "Room unbooked successfully")
  )
})

const getBookedRooms = asyncHandler(async (req: Request, res: Response) => {
  const { time, teacherId } = req.query;

  let conditions: { time?: string, occupiedBy?: string } = {}

  if (time && typeof time === "string") {
    conditions.time = time
  }

  if (teacherId && typeof teacherId === "string") {
    conditions.occupiedBy = teacherId
  }

  const bookedRooms = await RoomOccupied.find(conditions)
  .populate({
    path: "room",
    select: "roomNumber capacity location",
    model: "room",
    strictPopulate: false
  });
  if (!bookedRooms || !bookedRooms.length) {
    throw new ApiError(404, "No booked rooms found")
  }

  return res.status(200).json(
    new ApiResponse(200, bookedRooms, "Booked rooms found")
  )
})

export { bookRoom, unbookRoom, getBookedRooms };
