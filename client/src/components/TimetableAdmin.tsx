import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import React, { FormEvent } from "react";
import { useUser } from "@/context/UserProvider";
import { useRoom } from "@/context/RoomProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Trash2 } from "lucide-react";
import { useTimetable } from "@/context/TimetableProvider";
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
} from "./ui/alert-dialog";

interface BodyInterface {
  course: string;
  semester: string;
  stream: string;
  classes: ClassInterface[];
}

export interface ClassInterface {
  teacher: string;
  paperId: string;
  subject: string;
  allotedRoom: string;
  allotedTime: string;
  day: string;
}

function TimetableAdmin() {
  const navigate = useNavigate();
  const { timeslots, teachers, days, user } = useUser();
  const { rooms, fetchRooms } = useRoom();
  const { timetables, getAllTimetables, deleteTimetable, addTimetable } = useTimetable();

  React.useEffect(() => {
    if (!user._id) {
      navigate("/login");
    } else {
      if (!user.isAdmin) navigate("/bookroom");
    }
  }, [user]);

  React.useEffect(() => {
    getAllTimetables();
    fetchRooms();
  }, []);

  const [body, setBody] = React.useState<BodyInterface>({
    course: "",
    semester: "",
    stream: "",
    classes: [
      {
        allotedRoom: "",
        allotedTime: "",
        teacher: "",
        paperId: "",
        subject: "",
        day: "",
      },
    ],
  });
  function IncreaseClasses() {
    const classes = [
      ...body.classes,
      {
        allotedRoom: "",
        allotedTime: "",
        teacher: "",
        paperId: "",
        subject: "",
        day: "Monday",
      },
    ];
    setBody({
      ...body,
      classes,
    });
  }
  function DecreaseClasses() {
    if (body.classes.length === 1) return;
    const classes = body.classes.splice(0, body.classes.length - 1);
    setBody({
      ...body,
      classes,
    });
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addTimetable(body)
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  }
  function handleClassChange(e: React.ChangeEvent<HTMLInputElement>) {
    const index = e.target.parentElement?.parentElement?.dataset.index;
    if (!index) return console.log("Index not found");
    setBody({
      ...body,
      classes: body.classes.map((cls, i) => {
        if (i === parseInt(index?.toString())) {
          return {
            ...cls,
            [e.target.name]: e.target.value,
          };
        }
        return cls;
      }),
    });
  }

  return (
    <section className="min-h-screen min-w-screen">
      <form onSubmit={handleSubmit}>
        <Card className="w-4/5 mx-auto dark:bg-card bg-zinc-100 mt-10">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="course"
                  className="flex flex-start mx-2 text-lg"
                >
                  Course
                </Label>
                <Input
                  id="course"
                  placeholder="Course"
                  name="course"
                  value={body.course}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="semester"
                  className="flex flex-start mx-2 text-lg"
                >
                  Semester
                </Label>
                <Select
                  name="semester"
                  onValueChange={(value) =>
                    setBody({
                      ...body,
                      semester: value,
                    })
                  }
                >
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
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="stream"
                  className="flex flex-start mx-2 text-lg"
                >
                  Stream
                </Label>
                <Select
                  name="stream"
                  onValueChange={(value) =>
                    setBody({
                      ...body,
                      stream: value,
                    })
                  }
                >
                  <SelectTrigger id="stream">
                    <SelectValue placeholder="Stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Label
                        htmlFor="0-teacher"
                        className="flex flex-start mx-2 text-lg"
                      >
                        Classes
                      </Label>
                    </td>
                  </tr>
                  {body.classes.map((cls: ClassInterface, index: number) => {
                    return (
                      <tr
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
                        key={index}
                        data-index={index}
                      >
                        <td>
                          <Select
                            name="teacher"
                            onValueChange={(value) =>
                              setBody({
                                ...body,
                                classes: body.classes.map((cls) => {
                                  if (cls === body.classes[index]) {
                                    cls.teacher = value;
                                  }
                                  return cls;
                                }),
                              })
                            }
                          >
                            <SelectTrigger id={`${index}-teacher`}>
                              <SelectValue placeholder="Teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              {teachers.length ? (
                                teachers.map((teacher, index) => {
                                  if (!teacher.isAdmin)
                                    return (
                                      <SelectItem
                                        value={teacher._id}
                                        key={index}
                                      >
                                        {teacher.fullName}
                                      </SelectItem>
                                    );
                                })
                              ) : (
                                <SelectItem value="na" disabled>
                                  No teachers
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </td>
                        <td>
                          <Input
                            placeholder="Paper ID"
                            name="paperId"
                            value={cls.paperId}
                            type="number"
                            onChange={handleClassChange}
                            inputMode="numeric"
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Subject"
                            name="subject"
                            value={cls.subject}
                            onChange={handleClassChange}
                            inputMode="text"
                          />
                        </td>
                        <td>
                          <Select
                            name="room"
                            onValueChange={(value) =>
                              setBody({
                                ...body,
                                classes: body.classes.map((cls) => {
                                  if (cls === body.classes[index]) {
                                    cls.allotedRoom = value;
                                  }
                                  return cls;
                                }),
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Room number" />
                            </SelectTrigger>
                            <SelectContent>
                              {rooms.length ? (
                                rooms.map((room, index) => {
                                  return (
                                    <SelectItem value={room._id} key={index}>
                                      {room.roomNumber}
                                    </SelectItem>
                                  );
                                })
                              ) : (
                                <SelectItem value="na" disabled>
                                  No rooms
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </td>
                        <td>
                          <Select
                            name={`${index}-time`}
                            onValueChange={(value) =>
                              setBody({
                                ...body,
                                classes: body.classes.map((cls) => {
                                  if (cls === body.classes[index]) {
                                    cls.allotedTime = value;
                                  }
                                  return cls;
                                }),
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Time alloted" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeslots.map((timeslot, index) => {
                                return (
                                  <SelectItem value={timeslot} key={index}>
                                    {timeslot.split("-")?.join(" to ")}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </td>
                        <td>
                          <Select
                            name={`${index}-day`}
                            onValueChange={(value) =>
                              setBody({
                                ...body,
                                classes: body.classes.map((cls) => {
                                  if (cls === body.classes[index]) {
                                    cls.day = value;
                                  }
                                  return cls;
                                }),
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                              {days.map((day, index) => {
                                return (
                                  <SelectItem value={day} key={index}>
                                    {day}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="flex flex-start mt-2 gap-2">
                    <td>
                      <Button
                        variant="secondary"
                        onClick={IncreaseClasses}
                        type="button"
                      >
                        Add more
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="destructive"
                        onClick={DecreaseClasses}
                        type="button"
                        disabled={body.classes.length === 1}
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
            <Button
              type="submit"
              size="lg"
              disabled={
                body.semester.length === 0 ||
                body.stream.length === 0 ||
                body.course.length < 2 ||
                body.classes[0].allotedRoom.length === 0 ||
                body.classes[0].allotedTime.length === 0 ||
                body.classes[0].day.length === 0 ||
                body.classes[0].paperId.length === 4 ||
                body.classes[0].subject.length === 4 ||
                body.classes[0].teacher.length === 0
              }
            >
              Create
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Table className="mx-auto w-5/6 md:w-4/6 my-6 bg-zinc-100 dark:bg-zinc-900">
        <TableHeader>
          <TableRow className="hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead>Stream</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timetables.length ? (
            timetables.map((timetable, index) => {
              return (
                <TableRow
                  key={index}
                  className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  <TableCell>{timetable.stream}</TableCell>
                  <TableCell className="text-ellipsis">
                    {timetable.course}
                  </TableCell>
                  <TableCell>{timetable.semester}</TableCell>
                  <TableCell className="w-fit">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="destructive">
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete timetable?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteTimetable(timetable._id)}
                          >
                            Delete
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
              <TableCell colSpan={4}>No timetables</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}

export default TimetableAdmin;
