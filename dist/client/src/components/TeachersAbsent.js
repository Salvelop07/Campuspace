"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const data2_json_1 = __importDefault(require("../../data2.json"));
const card_1 = require("./ui/card");
function TeachersAbsent() {
    const [teachers, setTeachers] = react_1.default.useState([]);
    react_1.default.useEffect(() => {
        setTeachers(data2_json_1.default);
    });
    return (<card_1.Card className="md:w-3/5 w-4/5 mx-auto dark:bg-zinc-900 bg-gray-300 mt-8 select-none">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-2xl text-center">Teachers Absent</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <table className="w-full">
            <tbody className="grid md:grid-cols-2 grid-cols-1">
              {teachers.map((teacher, index) => {
            return (<tr key={index} className="grid grid-cols-3">
                    <td>{teacher.fullName}</td>
                    <td>-</td>
                    <td>{teacher.email}</td>
                  </tr>);
        })}
            </tbody>
          </table>
        </card_1.CardContent>
      </card_1.Card>);
}
exports.default = TeachersAbsent;
