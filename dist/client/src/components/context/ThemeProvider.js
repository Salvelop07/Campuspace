"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = exports.ThemeProvider = void 0;
const react_1 = require("react");
const initialState = {
    theme: "system",
    setTheme: () => null,
};
const ThemeProviderContext = (0, react_1.createContext)(initialState);
function ThemeProvider(_a) {
    var { children, defaultTheme = "system", storageKey = "vite-ui-theme" } = _a, props = __rest(_a, ["children", "defaultTheme", "storageKey"]);
    const [theme, setTheme] = (0, react_1.useState)(() => localStorage.getItem(storageKey) || defaultTheme);
    (0, react_1.useEffect)(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [theme]);
    const value = {
        theme,
        setTheme: (theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };
    return (<ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>);
}
exports.ThemeProvider = ThemeProvider;
const useTheme = () => {
    const context = (0, react_1.useContext)(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
exports.useTheme = useTheme;
