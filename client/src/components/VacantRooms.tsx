import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoom } from "@/context/RoomProvider";

export interface RoomInterface {
  id: string;
  roomNumber: string;
  capacity: number;
  location: string;
}

export function VacantRooms() {
  const { rooms } = useRoom();
  return (
    <section className="min-h-screen">
      <h1 className="text-3xl text-center my-6">Vacant rooms</h1>
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
    </section>
  );
}
