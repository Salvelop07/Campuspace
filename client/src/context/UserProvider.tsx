import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface UserInterface {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  isAbsent: boolean;
}

interface Context {
  user: UserInterface;
  accessToken: string;
  days: string[];
  tokenKey: string;
  day: string;
  timeslots: string[];
  teachers: UserInterface[];
  teachersAbsent: UserInterface[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTeachers: React.Dispatch<React.SetStateAction<UserInterface[]>>;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  addTeachersAbsent: Function;
  getTeachersAbsent: Function;
  fetchUser: Function;
  loginUser: Function;
  deleteUser: Function;
  becomeAdmin: Function;
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
  days: [],
  timeslots: [],
  teachers: [],
  teachersAbsent: [],
  accessToken: "",
  tokenKey: "",
  loading: false,
  setLoading: () => {},
  setTeachers: () => {},
  setAccessToken: () => {},
  getTeachersAbsent: () => {},
  addTeachersAbsent: () => {},
  setUser: () => {},
  loginUser: () => {},
  fetchUser: () => {},
  deleteUser: () => {},
  becomeAdmin: () => {},
  getAllTeachers: () => {},
  registerTeacher: () => {},
};

const UserContext = React.createContext<Context>(initialState);

export function UserProvider({ children }: React.PropsWithChildren<{}>) {
  const navigate = useNavigate();
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
  const tokenKey = "arsd-college-accessToken";

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

  const [accessToken, setAccessToken] = React.useState("");

  const [teachers, setTeachers] = React.useState<UserInterface[]>([]);
  const [teachersAbsent, setTeachersAbsent] = React.useState<UserInterface[]>([]);

  async function fetchUser(navigateTo?: string) {
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
          navigateTo ? navigate(navigateTo): ""
        }
      })
      .catch((err) =>
        console.error(err.response.data.message || "Something broke!")
      )
      .finally(() => setLoading(false));
  }

  async function loginUser(email: string, password: string, navigateTo?: string) {
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
          setAccessToken(res.data.data.accessToken);
          fetchUser();
          toast.success("Logged in successfully", { id: toastLoading });
          navigateTo ? navigate(navigateTo) : "";
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function deleteUser(teacherId: string, navigateTo?: string) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .delete(`/api/v1/users/delete/${teacherId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}}`,
        },
      })
      .then((res) => {
        if (res.data.data.success) {
          setUser(res.data.data);
          navigateTo ? navigate(navigateTo) : "";
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function becomeAdmin(teacherId: string, navigateTo?: string) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .patch(`/api/v1/becomeAdmin/${teacherId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          teachers.filter((teacher) => teacher._id === teacherId);
          toast.success("User is now an admin", { id: toastLoading });
          navigateTo ? navigate(navigateTo) : "";
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function getAllTeachers(navigateTo?: string) {
    setLoading(true);
    axios
      .get("/api/v1/users")
      .then((res) => {
        if (res.data.success) {
          setTeachers(res.data.data);
          navigateTo ? navigate(navigateTo) : "";
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function registerTeacher(
    fullName: string,
    email: string,
    password: string,
    navigateTo?: string
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
          setTeachers([...teachers, res.data.data]);
          toast.success("Teacher registered successfully", {
            id: toastLoading,
          });
          navigateTo ? navigate(navigateTo) : "";
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function getTeachersAbsent(navigateTo?: string) {
    setLoading(true);
    axios
      .get("/api/v1/teachersabsent", {
        params: {
          day,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTeachersAbsent(res.data.data);
          navigateTo ? navigate(navigateTo): ""
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function addTeachersAbsent(teachers: string[], navigateTo?: string) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .post(
        "/api/v1/teachersabsent/new",
        { teachers, day },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setTeachers([...teachers, res.data.data]);
          toast.success("Absent teacher added successfully", {
            id: toastLoading,
          });
          navigateTo ? navigate(navigateTo) : "";
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
    const token = localStorage.getItem(tokenKey);
    console.log(token);
    if (!token) {
      return console.log("Token not found -");
    }
    setAccessToken(() => token);
  }, []);

  React.useEffect(() => {
    fetchUser();
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        day,
        days,
        timeslots,
        user,
        accessToken,
        teachers,
        teachersAbsent,
        loading,
        tokenKey,
        setLoading,
        setTeachers,
        setAccessToken,
        getTeachersAbsent,
        addTeachersAbsent,
        setUser,
        fetchUser,
        loginUser,
        deleteUser,
        becomeAdmin,
        getAllTeachers,
        registerTeacher,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => React.useContext(UserContext);
