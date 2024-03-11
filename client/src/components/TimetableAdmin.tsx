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
    console.log(body);
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
        <Card className="w-4/5 mx-auto dark:bg-zinc-900 bg-gray-300 mt-10">
          <CardHeader>
            <CardTitle className="text-2xl">Timetable</CardTitle>
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
                          <Input
                            id={`${index}-teacher`}
                            placeholder="Teacher"
                            name="teacher"
                            value={cls.teacher}
                            onChange={handleClassChange}
                            inputMode="text"
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="Paper ID"
                            name="paperId"
                            value={cls.paperId}
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
                          <Input
                            placeholder="Alloted room"
                            name="allotedRoom"
                            value={cls.allotedRoom}
                            onChange={handleClassChange}
                            inputMode="text"
                          />
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
                              <SelectItem value="8.30-9.30">8.30 AM to 9.30 AM</SelectItem>
                              <SelectItem value="9.30-10.30">9.30 AM to 10.30 AM</SelectItem>
                              <SelectItem value="10.30-11.30">10.30 AM to 11.30 AM</SelectItem>
                              <SelectItem value="11.30-12.30">11.30 AM to 12.30 PM</SelectItem>
                              <SelectItem value="12.30-1.30">12.30 PM to 1.30 PM</SelectItem>
                              <SelectItem value="1.30-2.30">1.30 to PM to 2.30 PM</SelectItem>
                              <SelectItem value="2.30-3.30">2.30 PM to 3.30 PM</SelectItem>
                              <SelectItem value="3.30-4.30">3.30 PM to 4.30 PM</SelectItem>
                              <SelectItem value="4.30-5.30">4.30 PM to 5.30 PM</SelectItem>
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
                              <SelectItem value="Monday">Monday</SelectItem>
                              <SelectItem value="Tuesday">Tuesday</SelectItem>
                              <SelectItem value="Wednesday">
                                Wednesday
                              </SelectItem>
                              <SelectItem value="Thursday">Thursday</SelectItem>
                              <SelectItem value="Friday">Friday</SelectItem>
                              <SelectItem value="Satruday">Satruday</SelectItem>
                              <SelectItem value="Sunday">Sunday</SelectItem>
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
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg">
              Create
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}

export default TimetableAdmin;
