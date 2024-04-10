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
import { useTimetable } from "@/context/TimetableProvider";
import React from "react";

function Timetable() {
  const { timetable, courses, getCourses, getTimetable } = useTimetable();

  const [body, setBody] = React.useState({
    stream: "",
    course: "",
    semester: "",
  });

  const [semester, setSemester] = React.useState<number[]>([]);
  const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  React.useEffect(() => {
    courses.map((course) => {
      if (course.course === body.course) {
        return setSemester(course.semester);
      }
    });
  }, [body.course]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getTimetable(body.stream, body.course, body.semester);
  }

  return (
    <section className="min-h-screen min-w-screen">
      <form onSubmit={handleSubmit}>
        <Card className="w-4/5 md:w-3/5 mx-auto my-6 bg-zinc-100 dark:bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Timetable</CardTitle>
            <CardDescription>View coursewise timetable</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stream">Select Stream</Label>
                <Select
                  name="stream"
                  onValueChange={(value: string) => {
                    getCourses(value);
                    setBody({ ...body, stream: value });
                  }}
                >
                  <SelectTrigger id="stream">
                    <SelectValue placeholder="Stream" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Commerce">Commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="course">Select Course</Label>
                <Select
                  name="course"
                  onValueChange={(value: string) =>
                    setBody({ ...body, course: value })
                  }
                >
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {courses.length ? (
                      courses.map((course, index) => {
                        return (
                          <SelectItem value={course.course} key={index}>
                            {course.course}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <SelectItem value="na" disabled>
                        No courses
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="semester" className="flex flex-start">
                  Semester
                </Label>
                <Select
                  name="semester"
                  onValueChange={(value: string) =>
                    setBody({ ...body, semester: value })
                  }
                >
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semester.length ? (
                      semester.map((sem, index) => {
                        return (
                          <SelectItem value={sem.toString()} key={index}>
                            {semesters[sem - 1]}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <SelectItem value="0">No semester</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-evenly">
            <Button type="submit" size="lg">
              View
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Table className="mx-auto md:w-5/6 w-full my-4 bg-zinc-100 dark:bg-zinc-900">
        <TableHeader>
          <TableRow className="hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead className="min-w-12">Time</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Paper Id</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timetable.classes.length ? (
            timetable.classes.map((cls, index) => {
              return (
                <TableRow
                  key={index}
                  className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800 min-w-20"
                >
                  <TableCell>
                    {cls.allotedTime.split("-").join("AM - ")}PM
                  </TableCell>
                  <TableCell>{cls.day}</TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>{cls.allotedRoom?.roomNumber}</TableCell>
                  <TableCell>{cls.teacher?.fullName}</TableCell>
                  <TableCell>{cls.paperId}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <TableCell colSpan={8}>No timetable</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}

export default Timetable;
