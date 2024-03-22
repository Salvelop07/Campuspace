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
import { toast } from "sonner";

export interface TeacherInterface {
  _id: string;
  fullName: string;
  email: string;
}

function TeachersAbsentAdmin() {
  const navigate = useNavigate();
  const { user, teachers } = useUser();
  const [body, setBody] = React.useState<TeacherInterface[]>([]);
  function handleChange(checked: boolean, teacherEmail: string) {
    if (!checked) {
      return setBody((prev) =>
        prev.filter((teacher) => teacher.email !== teacherEmail)
      );
    }
    const teacher = teachers.find((teacher) => teacher.email === teacherEmail);
    if (!teacher) return console.log("Teacher not found");
    setBody([...body, teacher]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(body);
  }

  React.useEffect(() => {
    if(!user._id){
      toast("Please login again")
      navigate("/login")
    }
  }, []);
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
                {teachers.map((teacher, index) => {
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
                })}
              </tbody>
            </table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" size="lg">
              Mark as Absent
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}

export default TeachersAbsentAdmin;
