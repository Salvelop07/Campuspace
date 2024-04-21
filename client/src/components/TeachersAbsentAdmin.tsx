import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import React from "react";
import { Button } from "./ui/button";
import { CheckboxDemo } from "./CheckboxDemo";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function TeachersAbsentAdmin() {
  const navigate = useNavigate();
  const {
    user,
    teachers,
    getAllTeachers,
    addTeachersAbsent,
    teachersAbsent,
    getTeachersAbsent,
  } = useUser();

  React.useEffect(() => {
    if (!user._id) {
      navigate("/login");
    } else {
      if (!user.isAdmin) navigate("/bookroom");
    }
  }, [user]);

  React.useEffect(() => {
    getAllTeachers();
    getTeachersAbsent();
  }, []);

  const [body, setBody] = React.useState<string[]>([]);
  function handleChange(checked: boolean, teacherId: string) {
    if (!checked) {
      return setBody((prev) => prev.filter((teacher) => teacher !== teacherId));
    }
    const teacher = teachers.find((teacher) => teacher._id === teacherId);
    if (!teacher) return console.log("Teacher not found");
    setBody([...body, teacher._id]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await addTeachersAbsent(body);
    setBody([]);
  }

  return (
    <section className="min-h-screen min-w-screen">
      <form onSubmit={handleSubmit}>
        <Card className="md:w-3/5 w-4/5 mx-auto dark:bg-card bg-zinc-100 my-8">
          <CardHeader>
            <CardTitle className="text-2xl">Teachers Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <tbody className="grid md:grid-cols-2 grid-cols-1">
                {teachers.length ? (
                  teachers.map((teacher, index) => {
                    if (
                      !teachersAbsent.some(
                        (teacherAbsent) => teacher._id === teacherAbsent._id
                      ) && !teacher.isAdmin
                    )
                      return (
                        <tr key={index}>
                          <td>
                            <CheckboxDemo
                              text={teacher.fullName}
                              value={teacher._id}
                              handleChange={handleChange}
                              name="teacher"
                            />
                          </td>
                        </tr>
                      );
                  })
                ) : (
                  <tr>
                    <td>No teachers</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" size="lg" disabled={body.length === 0}>
              Mark as Absent
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Table className="mx-auto md:w-3/5 w-4/5 mb-2">
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachersAbsent.length ? (
            teachersAbsent.map((teacher, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{teacher.fullName}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No teachers absent</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}

export default TeachersAbsentAdmin;
