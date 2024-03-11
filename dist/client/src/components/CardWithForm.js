"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardWithForm = void 0;
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const react_router_dom_1 = require("react-router-dom");
function CardWithForm({ course, semester, classes, handleChange, handleSubmit, IncreaseClasses, DecreaseClasses, handleClassChange, setDayValue }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<form onSubmit={handleSubmit}>
      <card_1.Card className="w-4/5 mx-auto dark:bg-zinc-900 bg-gray-300 mt-10">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-2xl">Timetable</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label_1.Label htmlFor="course" className="flex flex-start mx-2 text-lg">Course</label_1.Label>
              <input_1.Input id="course" placeholder="Course" name="course" value={course} onChange={handleChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label_1.Label htmlFor="course" className="flex flex-start mx-2 text-lg">Course</label_1.Label>
              <input_1.Input id="course" placeholder="Course" name="course" value={semester} onChange={handleChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label_1.Label htmlFor="semester" className="flex flex-start mx-2 text-lg">Semester</label_1.Label>
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
            <div className="flex flex-col space-y-1.5">
              <label_1.Label htmlFor="stream" className="flex flex-start mx-2 text-lg">Stream</label_1.Label>
              <select_1.Select>
                <select_1.SelectTrigger id="stream">
                  <select_1.SelectValue placeholder="Stream"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="arts">Arts</select_1.SelectItem>
                  <select_1.SelectItem value="science">Science</select_1.SelectItem>
                  <select_1.SelectItem value="commerce">Commerce</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            <table>
              <tbody>
                <tr>
                  <td><label_1.Label htmlFor="semester" className="flex flex-start mx-2 text-lg">Classes</label_1.Label></td>
                </tr>
                {classes.map((cls, index) => {
            return (<tr className="grid grid-cols-6" key={index} data-index={index}>
                      <td>
                        <input_1.Input placeholder="Teacher" name="teacher" value={cls.teacher} onChange={handleClassChange} inputMode="text"/>
                      </td>
                      <td>
                        <input_1.Input placeholder="Paper ID" name="paperId" value={cls.paperId} onChange={handleClassChange} inputMode="numeric"/>
                      </td>
                      <td>
                        <input_1.Input placeholder="Subject" name="subject" value={cls.subject} onChange={handleClassChange} inputMode="text"/>
                      </td>
                      <td>
                        <input_1.Input placeholder="Alloted room" name="allotedRoom" value={cls.allotedRoom} onChange={handleClassChange} inputMode="text"/>
                      </td>
                      <td>
                        <input_1.Input placeholder="Time alloted" name="allotedTime" value={cls.allotedTime} onChange={handleClassChange} inputMode="text"/>
                      </td>
                      <td>
                        <select_1.Select onValueChange={(value) => setDayValue(value, index)}>
                          <select_1.SelectTrigger>
                            <select_1.SelectValue placeholder="Day"/>
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectItem value="Monday">Monday</select_1.SelectItem>
                            <select_1.SelectItem value="Tuesday">Tuesday</select_1.SelectItem>
                            <select_1.SelectItem value="Wednesday">Wednesday</select_1.SelectItem>
                            <select_1.SelectItem value="Thursday">Thursday</select_1.SelectItem>
                            <select_1.SelectItem value="Friday">Friday</select_1.SelectItem>
                            <select_1.SelectItem value="Satruday">Satruday</select_1.SelectItem>
                            <select_1.SelectItem value="Sunday">Sunday</select_1.SelectItem>
                          </select_1.SelectContent>
                        </select_1.Select>
                      </td>
                    </tr>);
        })}
                <tr className="flex flex-start mt-2 gap-2">
                  <td><button_1.Button variant="secondary" onClick={IncreaseClasses} type="button">Add more</button_1.Button></td>
                  <td><button_1.Button variant="destructive" onClick={DecreaseClasses} type="button" disabled={classes.length === 1}>Remove</button_1.Button></td>
                </tr>
              </tbody>
            </table>

          </div>
        </card_1.CardContent>
        <card_1.CardFooter className="flex justify-between">
          <button_1.Button variant="outline" type="reset" size="lg" onClick={() => navigate("/")}>Cancel</button_1.Button>
          <button_1.Button type="submit" size="lg">Create</button_1.Button>
        </card_1.CardFooter>
      </card_1.Card>
    </form>);
}
exports.CardWithForm = CardWithForm;
