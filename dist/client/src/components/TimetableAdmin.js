"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CardWithForm_1 = require("./CardWithForm");
function TimetableAdmin() {
    const [body, setBody] = react_1.default.useState({
        course: "",
        semester: "",
        classes: [
            {
                allotedRoom: "",
                allotedTime: "",
                teacher: "",
                paperId: "",
                subject: "",
                day: ""
            }
        ]
    });
    function IncreaseClasses() {
        const classes = [...body.classes, {
                allotedRoom: "",
                allotedTime: "",
                teacher: "",
                paperId: "",
                subject: "",
                day: "Monday"
            }];
        setBody(Object.assign(Object.assign({}, body), { classes }));
    }
    function DecreaseClasses() {
        if (body.classes.length === 1)
            return;
        const classes = body.classes.splice(0, body.classes.length - 1);
        setBody(Object.assign(Object.assign({}, body), { classes }));
    }
    function handleSubmit(e) {
        e.preventDefault();
    }
    function handleChange(e) {
        setBody(Object.assign(Object.assign({}, body), { [e.target.name]: e.target.value }));
    }
    function setDayValue(value, index) {
        if (index === -1)
            return console.log("Index not found");
        setBody(Object.assign(Object.assign({}, body), { classes: body.classes.map((cls) => {
                if (cls === body.classes[index]) {
                    cls.day = value;
                }
                return cls;
            }) }));
    }
    function handleClassChange(e) {
        var _a, _b;
        const index = (_b = (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.dataset.index;
        if (!index)
            return console.log("Index not found");
        setBody(Object.assign(Object.assign({}, body), { classes: body.classes.map((cls, i) => {
                if (i === parseInt(index === null || index === void 0 ? void 0 : index.toString())) {
                    return Object.assign(Object.assign({}, cls), { [e.target.name]: e.target.value });
                }
                return cls;
            }) }));
    }
    return (<>
            <CardWithForm_1.CardWithForm course={body.course} semester={body.semester} classes={body.classes} handleChange={handleChange} handleSubmit={handleSubmit} IncreaseClasses={IncreaseClasses} DecreaseClasses={DecreaseClasses} handleClassChange={handleClassChange} setDayValue={setDayValue}/>
        </>);
}
exports.default = TimetableAdmin;
