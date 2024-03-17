import React from "react";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useRoom } from "@/context/RoomProvider";

function AddRoom() {
  const { rooms } = useRoom();
  const navigate = useNavigate();

  const [body, setBody] = React.useState([
    {
      roomNumber: "",
      capacity: "",
      location: "",
    },
  ]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const index = e.target.parentElement?.parentElement?.dataset.index;
    if (!index) return console.log("Index not found");
  }
  return (
    <section className="min-h-screen min-w-screen">
      <form>
        <Card className="w-5/6 md:w-3/5 mx-auto dark:bg-card bg-zinc-100 mt-10">
          <CardHeader>
            <CardTitle className="text-2xl">Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <table>
                <tbody>
                  {body.map((room, index) => {
                    return (
                      <tr
                        className="grid grid-cols-3"
                        key={index}
                        data-index={index}
                      >
                        <td>
                          <Input
                            id={`${index}-room`}
                            placeholder="Room number"
                            name="roomNumber"
                            inputMode="text"
                            value={room.roomNumber}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Capacity"
                            name="capacity"
                            inputMode="numeric"
                            value={room.capacity}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Location"
                            name="location"
                            inputMode="text"
                            value={room.location}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="flex flex-start mt-2 gap-2">
                    <td>
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() =>
                          setBody([
                            ...body,
                            {
                              roomNumber: "",
                              capacity: "",
                              location: "",
                            },
                          ])
                        }
                      >
                        Add more
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="destructive"
                        type="button"
                        disabled={body.length === 1}
                        onClick={() => {
                          if (body.length === 1) return;
                          setBody(body.splice(0, body.length - 1));
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="reset"
              size="lg"
              onClick={() => navigate("/admin/teachersabsent")}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg">
              Add
            </Button>
          </CardFooter>
        </Card>
      </form>
      <h1 className="my-4 text-center text-2xl">Available Rooms</h1>
      <Table className="mx-auto w-5/6 md:w-3/5 my-6">
        <TableHeader>
          <TableRow>
            <TableHead>Room Number</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Sitting Capacity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.location}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default AddRoom;
