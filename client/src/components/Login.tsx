import React from 'react'
import { Card, CardContent, CardFooter, CardTitle, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { Label } from '@radix-ui/react-label'

function Login() {
  const navigate = useNavigate()
  const [creds, setCreds] = React.useState({ email: "", password: "" })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <>
      <Card className="md:w-2/5 w-3/5 mx-auto dark:bg-zinc-900 bg-gray-300 mt-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
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
          <Button type="submit" size="lg">Login</Button>
          <Button variant="outline" type="reset" size="lg" onClick={() => navigate("/")}>Cancel</Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default Login