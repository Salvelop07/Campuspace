import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoom } from "@/context/RoomProvider";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "./ui/select";
import { useUser } from "@/context/UserProvider";

export interface RoomInterface {
  id: string;
  roomNumber: string;
  capacity: number;
  location: string;
}

export function VacantRooms() {
  const { rooms, fetchVacantRooms, time: currentTime } = useRoom();
  const { timeslots } = useUser();
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    setTime(currentTime);
  }, []);

  React.useEffect(() => {
    fetchVacantRooms(time);
  }, [time]);

  return (
    <section className="min-h-screen">
      <h1 className="text-3xl text-center my-6">Vacant rooms</h1>
      <p className="text-gray-600 dark:text-gray-300 mx-auto md:w-3/5 w-4/5 mb-3 flex gap-2 items-center justify-start">
        Classes available at:
        <Select
          name="stream"
          onValueChange={(value: string) => {
            setTime(value);
          }}
          disabled={time === "closed"}
        >
          <SelectTrigger id="stream" className="w-36">
            <SelectValue
              placeholder={
                time === "closed" ? " " : time?.split("-")?.join(" to ")
              }
            />
          </SelectTrigger>
          <SelectContent position="popper">
            {timeslots.map((timeslot: string, index) => {
              return (
                <SelectItem value={timeslot} key={index}>
                  {timeslot.split("-")?.join(" to ")}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </p>
      <Table className="mx-auto md:w-3/5 w-4/5 mb-6 bg-zinc-100 dark:bg-zinc-900">
        <TableHeader>
          <TableRow className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead>Room Number</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.length ? (
            rooms.map((room, index) => (
              <TableRow
                key={index}
                className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.location}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <TableCell colSpan={3}>No rooms</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {time === "closed" && (
        <p className="text-red-600 text-xl font-bold animate-pulse text-center">
          College is closed
        </p>
      )}
    </section>
  );
}
