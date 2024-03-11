"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("react-dom/client"));
const App_tsx_1 = __importDefault(require("./App.tsx"));
require("./index.css");
const react_router_dom_1 = require("react-router-dom");
const ThemeProvider_tsx_1 = require("@/components/context/ThemeProvider.tsx");
client_1.default.createRoot(document.getElementById('root')).render(<react_router_dom_1.BrowserRouter>
    <ThemeProvider_tsx_1.ThemeProvider defaultTheme="dark" storageKey="college-ui-theme">
      <App_tsx_1.default />
    </ThemeProvider_tsx_1.ThemeProvider>
  </react_router_dom_1.BrowserRouter>);
