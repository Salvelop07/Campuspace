import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeProvider.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { UserProvider } from "./context/UserProvider.tsx";
import { TimetableProvider } from "./context/TimetableProvider.tsx";
import { RoomProvider } from "./context/RoomProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="college-ui-theme">
      <UserProvider>
        <RoomProvider>
          <TimetableProvider>
            <App />
            <ScrollToTop />
          </TimetableProvider>
        </RoomProvider>
      </UserProvider>
    </ThemeProvider>
  </BrowserRouter>
);
