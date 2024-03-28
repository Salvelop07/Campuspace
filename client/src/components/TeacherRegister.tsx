import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "./ui/table";
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
import { Trash2, User, UserCog } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserProvider";
import { CheckboxDemo } from "./CheckboxDemo";

function TeacherRegister() {
  const navigate = useNavigate();
  const { user, teachers, deleteUser, changeAdmin, loading, registerTeacher } =
    useUser();

  React.useEffect(() => {
    if (!user._id) {
      navigate("/login");
    } else {
      if (!user.isAdmin) navigate("/bookroom");
    }
  }, [user]);

  const [creds, setCreds] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPwd, setShowPwd] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    registerTeacher(creds.fullName, creds.email, creds.password);
    setCreds({
      fullName: "",
      email: "",
      password: "",
    });
  }
  return (
    <section className="min-h-screen min-w-screen">
      <form onSubmit={handleSubmit}>
        <Card className="lg:w-2/5 sm:w-3/5 w-4/5 mx-auto dark:bg-card bg-zinc-100 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Register teacher
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="fullName">Name</Label>
              <Input
                id="fullName"
                placeholder="Full Name"
                type="fullName"
                value={creds.fullName}
                onChange={(e) =>
                  setCreds({ ...creds, fullName: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                autoComplete="email"
                value={creds.email}
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type={showPwd ? "text" : "password"}
                value={creds.password}
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
              />
              <CheckboxDemo
                text="Show Password"
                value={"showpwd"}
                name="show-password"
                handleChange={() => setShowPwd(!showPwd)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-evenly">
            <Button
              type="submit"
              size="lg"
              disabled={
                creds.email.length < 4 ||
                creds.fullName.length < 4 ||
                creds.password.length < 6 ||
                loading
              }
            >
              Register
            </Button>
            <Button
              variant="outline"
              type="reset"
              size="lg"
              onClick={() => navigate("/admin/teachersabsent")}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Table className="mx-auto w-5/6 md:w-3/5 my-6 bg-zinc-100 dark:bg-zinc-900">
        <TableHeader>
          <TableRow className="hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.length ? (
            teachers.map((teacher, index) => {
              return (
                <TableRow
                  key={index}
                  className="w-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  <TableCell>{teacher.fullName}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.isAdmin ? "Admin" : "Teacher"}</TableCell>
                  <TableCell className="w-fit gap-2 flex">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="default"
                          title={
                            teacher.isAdmin ? "Make teacher" : "Make admin"
                          }
                        >
                          {teacher.isAdmin ? <UserCog /> : <User />}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to change the user privileges?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will make the user{" "}
                            {teacher.isAdmin ? "a teacher" : "an admin"}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => changeAdmin(teacher._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="destructive"
                          title="Delete user"
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete the user?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteUser(teacher._id)}
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

export default TeacherRegister;
