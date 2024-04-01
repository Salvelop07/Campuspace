import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "./ui/table";
import { Button } from "./ui/button";
import { CalendarPlus } from "lucide-react";
import { useRoom } from "../context/RoomProvider";
import { useUser } from "@/context/UserProvider";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const { rooms, fetchVacantRooms, bookRoom, bookedRooms, getBookedRooms } = useRoom();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user._id) {
      return navigate("/login");
    } else {
      if (!user.isAdmin) {
        navigate("/bookroom");
        fetchVacantRooms();
        getBookedRooms(user._id);
      }
    }
  }, [user]);

  return (
    <section className="min-h-screen">
      <h1 className="text-center text-3xl my-4">Vacant Rooms</h1>
      <Table className="mx-auto w-5/6 md:w-3/5 my-6 bg-zinc-100 dark:bg-zinc-900">
        <TableHeader>
          <TableRow className="hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead>Stream</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!bookedRooms.length && rooms.length ? (
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
                        <Button
                          size="icon"
                          variant="default"
                          title="Book room"
                        >
                          <CalendarPlus />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to book the room {roomNumber} ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You will not be able to book further rooms for current hour, if you change your mind you will have to unbook this room?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => bookRoom(_id)}
                          >
                            Continue
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
    </section>
  );
}
