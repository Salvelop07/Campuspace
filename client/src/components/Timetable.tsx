import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import jsonData from "../../data.json";

function Timetable() {
  return (
    <section className="min-h-screen min-w-screen">
      <Card className="w-4/5 md:w-3/5 mx-auto my-6 bg-zinc-100 dark:bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-center">Timetable</CardTitle>
          <CardDescription>View coursewise timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stream">Select Stream</Label>
                <Select>
                  <SelectTrigger id="stream">
                    <SelectValue placeholder="Stream" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="course">Select Course</Label>
                <Select>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next" disabled>
                      Please select stream
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="semester" className="flex flex-start">
                  Semester
                </Label>
                <Select>
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">I</SelectItem>
                    <SelectItem value="2">II</SelectItem>
                    <SelectItem value="3">III</SelectItem>
                    <SelectItem value="4">IV</SelectItem>
                    <SelectItem value="5">V</SelectItem>
                    <SelectItem value="6">VI</SelectItem>
                    <SelectItem value="7">VII</SelectItem>
                    <SelectItem value="8">VIII</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-evenly">
          <Button>View</Button>
        </CardFooter>
      </Card>
      <Table className="mx-auto w-5/6 md:w-3/5 my-4 bg-zinc-100 dark:bg-zinc-900">
        <TableHeader>
          <TableRow className="hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead>Teacher</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Subject</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jsonData.map((teacher, index) => {
            return (
              <TableRow
                key={index}
                className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <TableCell>{teacher.roomNumber}</TableCell>
                <TableCell>{teacher.capacity}</TableCell>
                <TableCell>{teacher.location}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default Timetable;
