import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import React from "react"
import { Button } from "./ui/button"
import { CheckboxDemo } from "./CheckboxDemo"
import data from "../../data2.json"
import { useNavigate } from "react-router-dom"

export interface TeacherInterface {
  id: string
  fullName: string
  email: string
}


function TeachersAbsentAdmin() {
  const [body, setBody] = React.useState<TeacherInterface[]>([])
  const [teachers, setTeachers] = React.useState<TeacherInterface[]>([])
  // let savedTeachers: TeacherInterface[] = [];
  const navigate = useNavigate()
  // const searchRef = React.useRef<HTMLInputElement>(null)

  function handleChange(checked: boolean, teacherEmail: string) {
    if (!checked) {
      return setBody((prev) => prev.filter(teacher => teacher.email !== teacherEmail))
    }
    const teacher = teachers.find(teacher => teacher.email === teacherEmail)
    if (!teacher) return console.log("Teacher not found")
    setBody([...body, teacher])
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(body)
  }

  // function searchTeachers() {
  //   if (!searchRef.current) return
  //   const search = searchRef.current.value
  //   console.log(search)
  //   if (search === "") return setTeachers(savedTeachers)
  //   const filteredTeachers = savedTeachers.filter((teacher) => teacher.fullName.toLowerCase() === search.toLowerCase());
  //   console.log(filteredTeachers)
  //   setTeachers([])
  //   setTeachers(filteredTeachers)
  // }

  React.useEffect(() => {
    setTeachers(data)
    // savedTeachers = data
  })
  return (
    <form onSubmit={handleSubmit}>
      <Card className="md:w-3/5 w-4/5 mx-auto dark:bg-zinc-900 bg-gray-300 mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Teachers Absent</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            {/* <thead>
              <tr className="grid grid-cols-12 mb-3">
                <td className="col-span-10"><Input placeholder="Search for teachers" ref={searchRef} /></td>
                <td className="col-span-2"><Button variant="outline" onClick={searchTeachers} type="button">Search</Button></td>
              </tr>
            </thead> */}
            <tbody className="grid md:grid-cols-2 grid-cols-1">
              {teachers.map((teacher, index) => {
                return (
                  <tr key={index}>
                    <td><CheckboxDemo text={teacher.fullName} value={teacher.email} handleChange={handleChange} name="teacher" /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="reset" size="lg" onClick={() => navigate("/")}>Cancel</Button>
          <Button type="submit" size="lg">Create</Button>
        </CardFooter>
      </Card>
    </form >
  )
}

export default TeachersAbsentAdmin