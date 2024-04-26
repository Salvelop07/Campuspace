import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "./ui/table";
import { Button } from "./ui/button";
import { CalendarPlus, CalendarMinus } from "lucide-react";
import { useRoom } from "../context/RoomProvider";
import { useUser } from "@/context/UserProvider";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function BookRoom() {
  const { user } = useUser();
  const {
    rooms,
    fetchVacantRooms,
    bookRoom,
    unbookRoom,
    bookedRoom,
    getBookedRooms,
    time,
  } = useRoom();

  React.useEffect(() => {
    fetchVacantRooms();
    getBookedRooms(user._id);
  }, []);

  return (
    <section className="min-h-screen">
      <h1
        className={`text-center text-3xl my-4 ${
          bookedRoom._id.length > 0 ? "hidden" : ""
        }`}
      >
        Vacant Rooms
      </h1>
      <Table
        className={`mx-auto w-5/6 md:w-3/5 my-6 bg-zinc-100 dark:bg-zinc-900 ${
          bookedRoom._id.length > 0 ? "hidden" : ""
        }`}
      >
        <TableHeader>
          <TableRow className="hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead>Room</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.length ? (
            rooms.map(({ roomNumber, capacity, location, _id }, index) => {
              return (
                <TableRow
                  key={index}
                  className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  <TableCell>{roomNumber}</TableCell>
                  <TableCell>{capacity}</TableCell>
                  <TableCell>{location}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="default" title="Book room">
                          <CalendarPlus />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to book the room {roomNumber}{" "}
                            ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You will not be able to book further rooms for
                            current hour, if you change your mind you will have
                            to unbook this room?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              bookRoom({
                                _id,
                                roomNumber,
                                capacity,
                                location,
                              })
                            }
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <TableCell colSpan={4}>No rooms</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <h1
        className={`text-center text-3xl my-4 ${
          bookedRoom._id.length > 0 ? "" : "hidden"
        }`}
      >
        Booked Rooms
      </h1>
      <Table
        className={`mx-auto w-5/6 md:w-3/5 my-6 bg-zinc-100 dark:bg-zinc-900 ${
          bookedRoom._id.length > 0 ? "" : "hidden"
        } `}
      >
        <TableHeader>
          <TableRow className="hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead>Room</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookedRoom._id.length ? (
            <TableRow className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <TableCell>{bookedRoom.room.roomNumber}</TableCell>
              <TableCell>{bookedRoom.room.capacity}</TableCell>
              <TableCell>{bookedRoom.room.location}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="default" title="Book room">
                      <CalendarMinus />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to unbook the room{" "}
                        {bookedRoom.room.roomNumber} ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        By doing this, You will be able to book further rooms
                        for current hour, if you change your mind you have to
                        book this room again?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => unbookRoom(bookedRoom)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <TableCell colSpan={4}>No rooms</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {time === "closed" && (
        <p className="text-red-600 text-xl text-center font-bold animate-pulse mx-auto">
          College is closed, Rooms cannot be booked.
        </p>
      )}
    </section>
  );
}
