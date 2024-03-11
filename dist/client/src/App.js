"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const TimetableAdmin_1 = __importDefault(require("./components/TimetableAdmin"));
// import Navbar from './components/Navbar'
const TableDemo_1 = require("./components/TableDemo");
const TeachersAbsentAdmin_1 = __importDefault(require("./components/TeachersAbsentAdmin"));
const TeachersAbsent_1 = __importDefault(require("./components/TeachersAbsent"));
const Login_1 = __importDefault(require("./components/Login"));
const ErrorPage_1 = __importDefault(require("./components/ErrorPage"));
const Timetable_1 = __importDefault(require("./components/Timetable"));
const ModeToggle_1 = require("./components/ModeToggle");
function App() {
    return (<>
      {/* <Navbar /> */}
      <ModeToggle_1.ModeToggle />
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route element={<Login_1.default />} path="/admin/login"/>
        <react_router_dom_1.Route element={<TimetableAdmin_1.default />} path="/admin/timetable"/>
        <react_router_dom_1.Route element={<TeachersAbsentAdmin_1.default />} path="/admin/teachersabsent"/>

        <react_router_dom_1.Route element={<Timetable_1.default />} path="/timetable"/>
        <react_router_dom_1.Route element={<TableDemo_1.TableDemo />} path="/"/>
        <react_router_dom_1.Route element={<TeachersAbsent_1.default />} path="/teachersabsent"/>

        <react_router_dom_1.Route element={<ErrorPage_1.default />} path="/*"/>
      </react_router_dom_1.Routes>
    </>);
}
exports.default = App;
