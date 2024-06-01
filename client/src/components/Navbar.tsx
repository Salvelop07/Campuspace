import { Button } from "./ui/button";
import logo from "../assets/logo.svg";
import { ModeToggle } from "./ModeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Equal, X } from "lucide-react";
import React from "react";
import { useUser } from "../context/UserProvider";

function Navbar() {
  const { tokenKey, setUser, user } = useUser();
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const title = import.meta.env.VITE_COLLEGE_NAME;
  const logoLink = import.meta.env.VITE_LOGO;
  logoLink ? logoLink : logo;

  return (
    <>
       <nav className="flex flex-row justify-between items-center px-4 h-16  sticky top-0 z-20 
          border-b-2 border-gray-300 dark:border-gray-600  backdrop-blur bg-transparent" 
          >
        <span className="flex gap-4 items-center">
          <Button
            size="icon"
            variant="secondary"
            className={`md:hidden dark:bg-zinc-900 ring-1 dark:ring-zinc-600 ring-zinc-100 ${
              location.pathname.includes("/bookroom") ? "hidden" : ""
            }`}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <X /> : <Equal />}
          </Button>
          <Link to="/" className="flex flex-row gap-2 items-center">
            <img src={logoLink ? logoLink : logo} alt="" className="w-10 object-contain" />
            <span>{title || "Campus Space"}</span>
          </Link>
          <span
            className={
              location.pathname.includes("/bookroom")
                ? "absolute right-4 flex gap-4 items-center"
                : "hidden"
            }
          >
            <Button
              variant="destructive"
              onClick={() => {
                navigate("/");
                localStorage.removeItem(tokenKey);
                setUser({ ...user, _id: "" });
              }}
            >
              Logout
            </Button>
            <ModeToggle />
          </span>
        </span>
        <ul
          className={`${
            location.pathname.includes("/admin") ||
            location.pathname.includes("/bookroom")
              ? "hidden"
              : ""
          } flex gap-2`}
        >
          <li>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Vacant Rooms
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => navigate("/timetable")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Timetable
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => navigate("/teachersabsent")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Teachers Absent
            </Button>
          </li>
          <li>
            <Button
              onClick={() => navigate("/login")}
              className="hidden md:flex "
            >
              Login
            </Button>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
        <ul
          className={`${
            location.pathname.includes("/admin") ? "" : "hidden"
          } flex gap-2`}
        >
          <li>
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/timetable")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Timetable
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/teachersabsent")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Teachers Absent
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/register")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Register Teacher
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/addroom")}
              className="hidden md:flex dark:hover:bg-zinc-700"
            >
              Rooms
            </Button>
          </li>
          <li>
            <Button
              variant="destructive"
              onClick={() => {
                navigate("/");
                localStorage.removeItem(tokenKey);
                setUser({ ...user, _id: "" });
              }}
              className="hidden md:flex"
            >
              Logout
            </Button>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
      <ul
        className={`flex flex-col absolute transition-transform duration-300 z-10 border-b-2 border-gray-300 dark:border-gray-700 w-full " 
      ${openNav ? "-translate-y-0" : "-translate-y-64"} ${
          location.pathname.includes("/admin") ? "hidden" : ""
        }`}
      >
        <li>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Vacant Rooms
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/timetable");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Timetable
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/teachersabsent");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Teachers Absent
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/login");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600 text-green-500"
          >
            Login
          </Button>
        </li>
      </ul>
      <ul
        className={`flex flex-col absolute transition-transform duration-300 z-10 border-b-2 border-gray-300 dark:border-gray-700 w-full " 
      ${openNav ? "-translate-y-0" : "-translate-y-64"} ${
          location.pathname.includes("/admin") ? "" : "hidden"
        }`}
      >
        <li>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/admin/timetable");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Timetable
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/admin/teachersabsent");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Teachers Absent
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/admin/register");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Register Teacher
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/admin/addroom");
              setOpenNav(!openNav);
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600"
          >
            Rooms
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/");
              setOpenNav(!openNav);
              localStorage.removeItem(tokenKey);
              setUser({ ...user, _id: "" });
            }}
            className="md:hidden w-full rounded-none py-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-600 text-red-500"
          >
            Logout
          </Button>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
