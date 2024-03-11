import React from "react";
import data from "../../data2.json";
import { TeacherInterface } from "./TeachersAbsentAdmin";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function TeachersAbsent() {
  const [teachers, setTeachers] = React.useState<TeacherInterface[]>([]);
  React.useEffect(() => {
    setTeachers(data);
  });

  return (
    <section className="min-h-screen min-w-screen">
    <Card className="md:w-3/5 w-5/6 mx-auto dark:bg-zinc-900 bg-gray-200 my-6 select-none">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Teachers Absent</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{teacher.fullName}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </section>
  );
}

export default TeachersAbsent;
