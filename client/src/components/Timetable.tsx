import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from '@radix-ui/react-label'
import { Table, TableCell, TableHead, TableRow } from './ui/table'

function Timetable() {
  return (
    <>
      <Card className="w-4/5 md:w-3/5 mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center">Timetable</CardTitle>
          <CardDescription>View coursewise timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stream">Select Stream</Label>
                <Select>
                  <SelectTrigger id="stream">
                    <SelectValue placeholder="Stream" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="course">Select Course</Label>
                <Select>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next" disabled>Please select stream</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
              <Label htmlFor="semester" className="flex flex-start">Semester</Label>
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-evenly">
          <Button variant="outline">Go back</Button>
          <Button>View</Button>
        </CardFooter>
      </Card>
      <Table className="mx-auto w-3/5 md:4/5 mt-10">
        <TableRow>
          <TableHead>Teacher</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Course</TableHead>
        </TableRow>
        <TableRow>
          <TableCell>Teacher</TableCell>
          <TableCell>Room</TableCell>
          <TableCell>Course</TableCell>
        </TableRow>
      </Table>
    </>
  )
}

export default Timetable