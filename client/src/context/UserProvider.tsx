import React from "react";
import axios from "axios";

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
  React.useEffect(() => {
    const token = localStorage.getItem("arsd-college-accessToken");
    if (!token) {
      return console.log("Token not found -", token);
    }
    setAccessToken(token);
    fetchUser();
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "arsd-college-accessToken"
          )}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function loginUser(email: string, password: string) {
    setLoading(true);
    axios
      .post("/api/v1/users/login", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
          setAccessToken(res.data.accessToken);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function deleteUser(teacherId: string) {
    setLoading(true);
    axios
      .delete("/api/v1/users/delete", {
        params: {
          teacherId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "arsd-college-accessToken"
          )}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function becomeAdmin(teacherId: string) {
    setLoading(true);
    axios
      .patch("/api/v1/becomeAdmin", {
        params: {
          teacherId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function getAllTeachers() {
    setLoading(true);
    axios
      .get("/api/v1/users", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTeachers(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function registerTeacher(
    fullName: string,
    email: string,
    password: string
  ) {
    setLoading(true);
    axios
      .post("/api/v1/users/register", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function getTeachersAbsent() {
    setLoading(true);
    axios
      .get(`/api/v1/teachersabsent?day=${day}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTeachers(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function addTeachersAbsent(...teachers: string[]) {
    setLoading(true);
    axios
      .post("/api/v1/teachersabsent/new", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ teachers, day }),
      })
      .then((res) => {
        if (res.data.success) {
          setTeachers(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

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
