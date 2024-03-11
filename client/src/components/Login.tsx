import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardHeader,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function Login() {
  const navigate = useNavigate();
  const [creds, setCreds] = React.useState({ email: "", password: "" });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="min-h-screen min-w-screen">
      <Card className="lg:w-2/5 sm:w-3/5 w-4/5 mx-auto dark:bg-zinc-900 bg-zinc-100 mt-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="user">Designation</Label>
              <Select>
                <SelectTrigger id="user">
                  <SelectValue placeholder="Designation" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={creds.email}
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={creds.password}
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-evenly">
          <Button type="submit" size="lg">
            Login
          </Button>
          <Button
            variant="outline"
            type="reset"
            size="lg"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Login;
