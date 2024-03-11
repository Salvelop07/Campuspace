import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react"
import { ClassInterface } from "./TimetableAdmin"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom"


export function CardWithForm(
  { course, semester, classes, handleChange, handleSubmit, IncreaseClasses, DecreaseClasses, handleClassChange, setDayValue }:
    { course: string, semester: string, handleChange: ChangeEventHandler, classes: ClassInterface[], handleSubmit: FormEventHandler<HTMLFormElement>, IncreaseClasses: MouseEventHandler<HTMLButtonElement>, DecreaseClasses: MouseEventHandler<HTMLButtonElement>, handleClassChange: ChangeEventHandler<HTMLInputElement>, setDayValue: (value: string, index: number) => void }
) {
  const navigate = useNavigate()
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-4/5 mx-auto dark:bg-zinc-900 bg-gray-300 mt-10">
        <CardHeader>
          <CardTitle className="text-2xl">Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="course" className="flex flex-start mx-2 text-lg">Course</Label>
              <Input id="course" placeholder="Course" name="course" value={course} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="course" className="flex flex-start mx-2 text-lg">Course</Label>
              <Input id="course" placeholder="Course" name="course" value={semester} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="semester" className="flex flex-start mx-2 text-lg">Semester</Label>
              <Select>
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
              <Label htmlFor="stream" className="flex flex-start mx-2 text-lg">Stream</Label>
              <Select>
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
                  <td><Label htmlFor="semester" className="flex flex-start mx-2 text-lg">Classes</Label></td>
                </tr>
                {classes.map((cls: ClassInterface, index: number) => {
                  return (
                    <tr className="grid grid-cols-6" key={index} data-index={index}>
                      <td>
                        <Input placeholder="Teacher" name="teacher" value={cls.teacher} onChange={handleClassChange} inputMode="text" />
                      </td>
                      <td>
                        <Input placeholder="Paper ID" name="paperId" value={cls.paperId} onChange={handleClassChange} inputMode="numeric" />
                      </td>
                      <td>
                        <Input placeholder="Subject" name="subject" value={cls.subject} onChange={handleClassChange} inputMode="text" />
                      </td>
                      <td>
                        <Input placeholder="Alloted room" name="allotedRoom" value={cls.allotedRoom} onChange={handleClassChange} inputMode="text" />
                      </td>
                      <td>
                        <Input placeholder="Time alloted" name="allotedTime" value={cls.allotedTime} onChange={handleClassChange} inputMode="text" />
                      </td>
                      <td>
                        <Select onValueChange={(value) => setDayValue(value, index)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monday">Monday</SelectItem>
                            <SelectItem value="Tuesday">Tuesday</SelectItem>
                            <SelectItem value="Wednesday">Wednesday</SelectItem>
                            <SelectItem value="Thursday">Thursday</SelectItem>
                            <SelectItem value="Friday">Friday</SelectItem>
                            <SelectItem value="Satruday">Satruday</SelectItem>
                            <SelectItem value="Sunday">Sunday</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  )
                })}
                <tr className="flex flex-start mt-2 gap-2">
                  <td><Button variant="secondary" onClick={IncreaseClasses} type="button">Add more</Button></td>
                  <td><Button variant="destructive" onClick={DecreaseClasses} type="button" disabled={classes.length === 1}>Remove</Button></td>
                </tr>
              </tbody>
            </table>

          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="reset" size="lg" onClick={() => navigate("/")}>Cancel</Button>
          <Button type="submit" size="lg">Create</Button>
        </CardFooter>
      </Card >
    </form>
  )
}
