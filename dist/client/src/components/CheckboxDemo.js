"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxDemo = void 0;
const checkbox_1 = require("@/components/ui/checkbox");
function CheckboxDemo({ text, value, name, handleChange }) {
    return (<div className="flex items-center space-x-2 m-2 text-lg">
      <checkbox_1.Checkbox id={value} value={value} onCheckedChange={(e) => handleChange(e, value)} name={name}/>
      <label htmlFor={value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {text}
      </label>
    </div>);
}
exports.CheckboxDemo = CheckboxDemo;
