import React from 'react'
import data from "../../data2.json"
import { TeacherInterface } from './TeachersAbsentAdmin'
import { Card, CardTitle, CardHeader, CardContent } from './ui/card'

function TeachersAbsent() {
  const [teachers, setTeachers] = React.useState<TeacherInterface[]>([])
  React.useEffect(() => {
    setTeachers(data)
  })

  return (
    <Card className="md:w-3/5 w-4/5 mx-auto dark:bg-zinc-900 bg-gray-300 mt-8 select-none">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Teachers Absent</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <tbody className="grid md:grid-cols-2 grid-cols-1">
              {teachers.map((teacher, index) => {
                return (
                  <tr key={index} className="grid grid-cols-3">
                    <td>{teacher.fullName}</td>
                    <td>-</td>
                    <td>{teacher.email}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
  )
}

export default TeachersAbsent