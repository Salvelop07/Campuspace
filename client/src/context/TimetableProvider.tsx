import React from "react";
import axios from "axios";

export interface ClassInterface {
  allotedRoom: string;
  allotedTime: string;
  teacher: string;
  paperId: string;
  subject: string;
  day: string;
}

export interface TimetableInterface {
  _id: string;
  stream: string;
  course: string;
  semester: string;
  classes: ClassInterface[];
}

interface Context {
  timetable: TimetableInterface;
  timetables: TimetableInterface[];
  courses: string[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCourses: React.Dispatch<React.SetStateAction<string[]>>;
  setTimetable: React.Dispatch<React.SetStateAction<TimetableInterface>>;
  setTimetables: React.Dispatch<React.SetStateAction<TimetableInterface[]>>;
  addTimetable: Function;
  getCourses: Function;
  getTimetable: Function;
  deleteTimetable: Function;
  fetchTimetable: Function;
  getAllTimetables: Function;
}

const accessToken = localStorage.getItem("arsd-college-accessToken");

const initialState = {
  timetable: {
    _id: "",
    stream: "",
    course: "",
    semester: "",
    classes: [],
  },
  courses: [],
  timetables: [],
  loading: false,
  setLoading: () => {},
  setCourses: () => {},
  setTimetable: () => {},
  setTimetables: () => {},
  fetchTimetable: () => {},
  getAllTimetables: () => {},
  getTimetable: () => {},
  getCourses: () => {},
  addTimetable: () => {},
  deleteTimetable: () => {},
};

const TimetableContext = React.createContext<Context>(initialState);

function TimetableProvider({ children }: React.PropsWithChildren<{}>) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [courses, setCourses] = React.useState<string[]>([]);

  const [timetable, setTimetable] = React.useState<TimetableInterface>({
    _id: "",
    stream: "",
    course: "",
    semester: "",
    classes: [],
  });

  const [timetables, setTimetables] = React.useState<TimetableInterface[]>([]);

  async function fetchTimetable() {
    setLoading(true);
    axios
      .get("/api/v1/timetable", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTimetables(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function getAllTimetables() {
    setLoading(true);
    axios
      .get("/api/v1/timetable/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTimetables(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function addTimetable(timetable: TimetableInterface) {
    setLoading(true);
    axios
      .post("/api/v1/timetable/new", timetable, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTimetables([...timetables, res.data.data]);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function deleteTimetable(timetableId: string) {
    setLoading(true);
    axios
      .delete(`/api/v1/timetable/delete/${timetableId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTimetables(
            timetables.filter((timetable) => timetable._id !== timetableId)
          );
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function getCourses(stream: string) {
    setLoading(true);
    axios
      .get(`/api/v1/course?stream=${stream}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setCourses(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  async function getTimetable(
    stream: string,
    course: string,
    semester: string
  ) {
    setLoading(true);
    axios
      .get(
        `/api/v1/timetable?stream=${stream}&course=${course}&semester=${semester}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
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

  return (
    <TimetableContext.Provider
      value={{
        courses,
        loading,
        setLoading,
        setCourses,
        timetable,
        timetables,
        setTimetable,
        addTimetable,
        deleteTimetable,
        setTimetables,
        getTimetable,
        getCourses,
        fetchTimetable,
        getAllTimetables,
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
}

const useTimetable = () => React.useContext(TimetableContext);

export { useTimetable, TimetableProvider };
