import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

function TeacherRegister() {
  const navigate = useNavigate()
  const [creds, setCreds] = React.useState({
    fullName: "",
    email: "",
    password: ""
  })
  return (
    <section className="min-h-screen min-w-screen">
    <Card className="lg:w-2/5 sm:w-3/5 w-4/5 mx-auto dark:bg-card bg-zinc-100 mt-8">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Register teacher</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="fullName">Name</Label>
            <Input
              id="fullName"
              placeholder="Full Name"
              type="fullName"
              value={creds.fullName}
              onChange={(e) => setCreds({ ...creds, fullName: e.target.value })}
            />
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
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-evenly">
        <Button type="submit" size="lg">Register</Button>
        <Button variant="outline" type="reset" size="lg" onClick={() => navigate("/admin/teachersabsent")}>Cancel</Button>
      </CardFooter>
    </Card>
    </section>
  )
}

export default TeacherRegister