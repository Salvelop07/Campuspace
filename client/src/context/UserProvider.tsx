import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

interface UserInterface {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  isAbsent: boolean;
}

interface Context {
  user: UserInterface;
  days: string[];
  tokenKey: string;
  day: string;
  timeslots: string[];
  accessToken: string;
  teachers: UserInterface[];
  teachersAbsent: UserInterface[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTeachers: React.Dispatch<React.SetStateAction<UserInterface[]>>;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  addTeachersAbsent: Function;
  getTeachersAbsent: Function;
  fetchUser: Function;
  loginUser: Function;
  deleteUser: Function;
  changeAdmin: Function;
  getAllTeachers: Function;
  registerTeacher: Function;
}

const initialState = {
  user: {
    fullName: "",
    email: "",
    isAdmin: false,
    _id: "",
    isAbsent: false,
  },
  day: "",
  accessToken: "",
  days: [],
  timeslots: [],
  teachers: [],
  teachersAbsent: [],
  tokenKey: "",
  loading: false,
  setLoading: () => {},
  setTeachers: () => {},
  getTeachersAbsent: () => {},
  addTeachersAbsent: () => {},
  setUser: () => {},
  loginUser: () => {},
  fetchUser: () => {},
  deleteUser: () => {},
  changeAdmin: () => {},
  getAllTeachers: () => {},
  registerTeacher: () => {},
};

const UserContext = React.createContext<Context>(initialState);

export function UserProvider({ children }: React.PropsWithChildren<{}>) {
  const location = useLocation();
  const navigate = useNavigate();
  const logoLink: string | undefined = import.meta.env.VITE_LOGO;
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const timeslots = [
    "8.30-9.30",
    "9.30-10.30",
    "10.30-11.30",
    "11.30-12.30",
    "12.30-1.30",
    "1.30-2.30",
    "2.30-3.30",
    "3.30-4.30",
    "4.30-5.30",
  ];
  const tokenKey = "Campuspace-accessToken";
  let accessToken = localStorage.getItem(tokenKey) || "";
  const title = import.meta.env.VITE_COLLEGE_NAME;

  React.useEffect(() => {
    document.title = title || "Campuspace";
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']");
    if (link && logoLink) {
      link.href = logoLink;
    } else if (link) {
      link.href = "/logo.svg";
    }
  }, [title, logoLink]);

  const date = new Date();
  const day = days[date.getDay()];

  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<UserInterface>({
    fullName: "",
    email: "",
    isAdmin: false,
    _id: "",
    isAbsent: false,
  });

  const [teachers, setTeachers] = React.useState<UserInterface[]>([]);
  const [teachersAbsent, setTeachersAbsent] = React.useState<UserInterface[]>(
    []
  );

  async function fetchUser() {
    if (!accessToken) return console.log("No token");
    setLoading(true);
    axios
      .get("/api/v1/users/get", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        }
      })
      .catch((err) =>
        console.error(err.response.data.message || "Something broke!")
      )
      .finally(() => setLoading(false));
  }

  async function loginUser(email: string, password: string) {
    setLoading(true);
    const toastLoading = toast.loading("Please wait...");
    axios
      .post("/api/v1/users/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem(tokenKey, res.data.data.accessToken);
          setUser(res.data.data.user);
          accessToken = res.data.data.accessToken;
          if (res.data.data.user.isAdmin) {
            navigate("/admin/teachersabsent");
          } else {
            navigate("/bookroom");
          }
          fetchUser();
          toast.success("Logged in successfully", { id: toastLoading });
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function deleteUser(teacherId: string) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .delete(`/api/v1/users/delete/${teacherId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTeachers(teachers.filter((usr) => usr._id !== teacherId));
          toast.success(res.data.message, {
            id: toastLoading,
          });
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function changeAdmin(teacherId: string) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .patch(
        `/api/v1/users/admin/${teacherId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          teachers.map((teacher) => {
            if (teacher._id === teacherId) {
              return (teacher.isAdmin = res.data.data.admin);
            }
          });
          toast.success(res.data.message, { id: toastLoading });
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function getAllTeachers() {
    setLoading(true);
    axios
      .get("/api/v1/users")
      .then((res) => {
        if (res.data.success) {
          setTeachers(
            res.data.data
              .filter((teacher: UserInterface) => teacher._id !== user._id)
              .sort(function (
                teacher1: UserInterface,
                teacher2: UserInterface
              ) {
                return teacher1.fullName.localeCompare(teacher2.fullName);
              })
          );
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function registerTeacher(
    fullName: string,
    email: string,
    password: string
  ) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .post(
        "/api/v1/users/register",
        {
          fullName,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setTeachers([...teachers, res.data.data.user]);
          toast.success("Teacher registered successfully", {
            id: toastLoading,
          });
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function getTeachersAbsent() {
    interface TeacherInterface {
      fullName: string;
      email: string;
      _id: string;
    }
    setLoading(true);
    axios
      .get("/api/v1/teachersabsent", {
        params: {
          day,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTeachersAbsent(
            res.data.data
              .map((teacher: { teacher: TeacherInterface }) => {
                return teacher.teacher;
              })
              .sort((teacher1: TeacherInterface, teacher2: TeacherInterface) =>
                teacher1.fullName.localeCompare(teacher2.fullName)
              )
          );
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function addTeachersAbsent(teacherIds: string[]) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .post(
        "/api/v1/teachersabsent/new",
        { teachers: teacherIds, day },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setTeachersAbsent([
            ...teachersAbsent,
            ...res.data.data.map(
              (teacher: {
                teacher: { fullName: string; email: string; _id: string };
              }) => {
                return teacher.teacher;
              }
            ),
          ]);
          setTeachers(
            teachers.filter((teacher) => !teacherIds.includes(teacher._id))
          );
          toast.success("Absent teacher added successfully", {
            id: toastLoading,
          });
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  React.useEffect(() => {
    if (location.pathname.includes("/admin")) {
      if (!accessToken) navigate("/login");
      fetchUser();
    }
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        day,
        days,
        timeslots,
        user,
        teachers,
        accessToken,
        teachersAbsent,
        loading,
        tokenKey,
        setLoading,
        setTeachers,
        getTeachersAbsent,
        addTeachersAbsent,
        setUser,
        fetchUser,
        loginUser,
        deleteUser,
        changeAdmin,
        getAllTeachers,
        registerTeacher,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => React.useContext(UserContext);
