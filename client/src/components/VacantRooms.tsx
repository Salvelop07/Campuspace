import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import rooms from "../../data.json"


export interface RoomInterface {
  id: string,
  roomNumber: string,
  capacity: number,
  location: string,
}

export function VacantRooms() {
  return (
    <>
    <h1 className="text-3xl text-center my-6">Vacant rooms</h1>
    <Table className="mx-auto md:w-3/5 w-4/5">
      <TableHeader>
        <TableRow>
          <TableHead>Room Number</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room, index) => (
          <TableRow key={index} className="w-full">
            <TableCell>{room.roomNumber}</TableCell>
            <TableCell>{room.capacity}</TableCell>
            <TableCell>{room.location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>{rooms.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </>
  )
}