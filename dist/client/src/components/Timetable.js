"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const select_1 = require("./ui/select");
const button_1 = require("./ui/button");
const card_1 = require("./ui/card");
const react_label_1 = require("@radix-ui/react-label");
const table_1 = require("./ui/table");
function Timetable() {
    return (<>
      <card_1.Card className="w-4/5 md:w-3/5 mx-auto">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-xl text-center">Timetable</card_1.CardTitle>
          <card_1.CardDescription>View coursewise timetable</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <react_label_1.Label htmlFor="stream">Select Stream</react_label_1.Label>
                <select_1.Select>
                  <select_1.SelectTrigger id="stream">
                    <select_1.SelectValue placeholder="Stream"/>
                  </select_1.SelectTrigger>
                  <select_1.SelectContent position="popper">
                    <select_1.SelectItem value="arts">Arts</select_1.SelectItem>
                    <select_1.SelectItem value="science">Science</select_1.SelectItem>
                    <select_1.SelectItem value="commerce">Commerce</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <react_label_1.Label htmlFor="course">Select Course</react_label_1.Label>
                <select_1.Select>
                  <select_1.SelectTrigger id="course">
                    <select_1.SelectValue placeholder="Select"/>
                  </select_1.SelectTrigger>
                  <select_1.SelectContent position="popper">
                    <select_1.SelectItem value="next" disabled>Please select stream</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
              <div className="flex flex-col space-y-1.5">
              <react_label_1.Label htmlFor="semester" className="flex flex-start">Semester</react_label_1.Label>
              <select_1.Select>
                <select_1.SelectTrigger id="semester">
                  <select_1.SelectValue placeholder="Semester"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="1">I</select_1.SelectItem>
                  <select_1.SelectItem value="2">II</select_1.SelectItem>
                  <select_1.SelectItem value="3">III</select_1.SelectItem>
                  <select_1.SelectItem value="4">IV</select_1.SelectItem>
                  <select_1.SelectItem value="5">V</select_1.SelectItem>
                  <select_1.SelectItem value="6">VI</select_1.SelectItem>
                  <select_1.SelectItem value="7">VII</select_1.SelectItem>
                  <select_1.SelectItem value="8">VIII</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            </div>
          </form>
        </card_1.CardContent>
        <card_1.CardFooter className="flex justify-evenly">
          <button_1.Button variant="outline">Go back</button_1.Button>
          <button_1.Button>View</button_1.Button>
        </card_1.CardFooter>
      </card_1.Card>
      <table_1.Table className="mx-auto w-3/5 md:4/5 mt-10">
        <table_1.TableRow>
          <table_1.TableHead>Teacher</table_1.TableHead>
          <table_1.TableHead>Room</table_1.TableHead>
          <table_1.TableHead>Course</table_1.TableHead>
        </table_1.TableRow>
        <table_1.TableRow>
          <table_1.TableCell>Teacher</table_1.TableCell>
          <table_1.TableCell>Room</table_1.TableCell>
          <table_1.TableCell>Course</table_1.TableCell>
        </table_1.TableRow>
      </table_1.Table>
    </>);
}
exports.default = Timetable;
