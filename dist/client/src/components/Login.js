"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const card_1 = require("./ui/card");
const button_1 = require("./ui/button");
const input_1 = require("./ui/input");
const react_router_dom_1 = require("react-router-dom");
const react_label_1 = require("@radix-ui/react-label");
function Login() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [creds, setCreds] = react_1.default.useState({ email: "", password: "" });
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (<>
      <card_1.Card className="md:w-2/5 w-3/5 mx-auto dark:bg-zinc-900 bg-gray-300 mt-8">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-2xl text-center">Admin Login</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <react_label_1.Label htmlFor="email">Email</react_label_1.Label>
              <input_1.Input id="email" placeholder="Email" type="email" value={creds.email} onChange={(e) => setCreds(Object.assign(Object.assign({}, creds), { email: e.target.value }))}/>
            </div>
            <div className="space-y-1">
              <react_label_1.Label htmlFor="password">Password</react_label_1.Label>
              <input_1.Input id="password" placeholder="Password" type="password" value={creds.password} onChange={(e) => setCreds(Object.assign(Object.assign({}, creds), { password: e.target.value }))}/>
            </div>
          </form>
        </card_1.CardContent>
        <card_1.CardFooter className="flex justify-evenly">
          <button_1.Button type="submit" size="lg">Login</button_1.Button>
          <button_1.Button variant="outline" type="reset" size="lg" onClick={() => navigate("/")}>Cancel</button_1.Button>
        </card_1.CardFooter>
      </card_1.Card>
    </>);
}
exports.default = Login;
