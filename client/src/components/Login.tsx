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
import { useUser } from "@/context/UserProvider";
import { CheckboxDemo } from "./CheckboxDemo";

function Login() {
  const { loginUser, loading, user } = useUser();
  const navigate = useNavigate();
  const [creds, setCreds] = React.useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = React.useState(false);

  React.useEffect(() => {
    if (user._id) {
      if (user.isAdmin) {
        return navigate("/admin/teachersabsent");
      }
      navigate("/bookroom");
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginUser(creds.email, creds.password);
    // navigate("/admin/teachersabsent");
  }

  return (
    <section className="min-h-screen min-w-screen">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Card className="lg:w-2/5 sm:w-3/5 w-4/5 mx-auto dark:bg-card bg-zinc-100 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={creds.email}
                autoComplete="email"
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
                loading || creds.email.length < 5 || creds.password.length < 6
              }
            >
              Login
            </Button>
            <Button
              variant="outline"
              type="reset"
              size="lg"
              disabled={loading}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}

export default Login;
