import React from "react";
import axios from "axios";
import { toast } from "sonner";

export interface UserInterface {
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
  day: string;
  teachers: UserInterface[];
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
  teachers: [],
  accessToken: "",
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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

  async function fetchUser() {
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
          console.log(res.data.data);
        }
      })
      .catch((err) => console.warn(err.response.data.message))
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
          setAccessToken(res.data.data.accessToken);
          fetchUser();
          toast.success("Logged in successfully", { id: toastLoading });
        }
      })
      .catch((err) =>
        toast.warning(err.response.data.message, {
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
          Authorization: `Bearer ${accessToken}}`,
        },
      })
      .then((res) => {
        if (res.data.data.success) {
          setUser(res.data.data);
        }
      })
      .catch((err) =>
        toast.warning(err.response.data.message, {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function becomeAdmin(teacherId: string) {
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
          teachers.filter((teacher) => teacher._id === teacherId)
          toast.success("User is now an admin", { id: toastLoading });
        }
      })
      .catch((err) =>
        toast.warning(err.response.data.message, {
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
          setTeachers(res.data.data);
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
          setTeachers([...teachers, res.data.data]);
          toast.success("Teacher registered successfully", { id: toastLoading });
        }
      })
      .catch((err) =>
        toast.warning(err.response.data.message, {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function getTeachersAbsent() {
    setLoading(true);
    axios
      .get("/api/v1/teachersabsent", {
        params: {
          day,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTeachers(res.data.data);
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function addTeachersAbsent(...teachers: string[]) {
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
          toast.success("Absent teacher added successfully", { id: toastLoading });
        }
      })
      .catch((err) =>
        toast.warning(err.response.data.message, {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  React.useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      return console.log("Token not found -", token);
    }
    if(!token) console.log("undefined token")
    setAccessToken(token);
    console.log(accessToken)
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        day,
        days,
        user,
        accessToken,
        teachers,
        loading,
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
