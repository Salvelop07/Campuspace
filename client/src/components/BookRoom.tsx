import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "./ui/table";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { useRoom } from "../context/RoomProvider";
import { useUser } from "@/context/UserProvider";
import { toast } from "sonner";
import React from "react";
import { useNavigate } from "react-router-dom";

export function BookRoom() {
  const { user } = useUser();
  const { rooms } = useRoom();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user._id) {
      toast("Please login again");
      navigate("/login");
    } else {
      if (!user.isAdmin) navigate("/bookroom");
    }
  }, [user]);
  
  return (
    <section className="min-h-screen">
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
          {rooms.length ? (
            rooms.map((room, index) => {
              return (
                <TableRow
                  key={index}
                  className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>{room.location}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost">
                      <Bookmark />
                    </Button>
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
