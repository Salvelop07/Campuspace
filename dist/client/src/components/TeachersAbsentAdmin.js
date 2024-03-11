"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("./ui/card");
const react_1 = __importDefault(require("react"));
const button_1 = require("./ui/button");
const CheckboxDemo_1 = require("./CheckboxDemo");
const data2_json_1 = __importDefault(require("../../data2.json"));
const react_router_dom_1 = require("react-router-dom");
function TeachersAbsentAdmin() {
    const [body, setBody] = react_1.default.useState([]);
    const [teachers, setTeachers] = react_1.default.useState([]);
    // let savedTeachers: TeacherInterface[] = [];
    const navigate = (0, react_router_dom_1.useNavigate)();
    // const searchRef = React.useRef<HTMLInputElement>(null)
    function handleChange(checked, teacherEmail) {
        if (!checked) {
            return setBody((prev) => prev.filter(teacher => teacher.email !== teacherEmail));
        }
        const teacher = teachers.find(teacher => teacher.email === teacherEmail);
        if (!teacher)
            return console.log("Teacher not found");
        setBody([...body, teacher]);
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log(body);
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
    react_1.default.useEffect(() => {
        setTeachers(data2_json_1.default);
        // savedTeachers = data
    });
    return (<form onSubmit={handleSubmit}>
      <card_1.Card className="md:w-3/5 w-4/5 mx-auto dark:bg-zinc-900 bg-gray-300 mt-8">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-2xl">Teachers Absent</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <table className="w-full">
            {/* <thead>
          <tr className="grid grid-cols-12 mb-3">
            <td className="col-span-10"><Input placeholder="Search for teachers" ref={searchRef} /></td>
            <td className="col-span-2"><Button variant="outline" onClick={searchTeachers} type="button">Search</Button></td>
          </tr>
        </thead> */}
            <tbody className="grid md:grid-cols-2 grid-cols-1">
              {teachers.map((teacher, index) => {
            return (<tr key={index}>
                    <td><CheckboxDemo_1.CheckboxDemo text={teacher.fullName} value={teacher.email} handleChange={handleChange} name="teacher"/></td>
                  </tr>);
        })}
            </tbody>
          </table>
        </card_1.CardContent>
        <card_1.CardFooter className="flex justify-between">
          <button_1.Button variant="outline" type="reset" size="lg" onClick={() => navigate("/")}>Cancel</button_1.Button>
          <button_1.Button type="submit" size="lg">Create</button_1.Button>
        </card_1.CardFooter>
      </card_1.Card>
    </form>);
}
exports.default = TeachersAbsentAdmin;
