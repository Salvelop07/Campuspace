import React from "react";
import axios from "axios";
import { useUser } from "./UserProvider";
import { toast } from "sonner";

interface ClassInterface {
  allotedRoom: { roomNumber: string };
  allotedTime: string;
  teacher: { fullName: string };
  paperId: string;
  subject: string;
  day: string;
}

interface TimetableInterface {
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
  getAllTimetables: Function;
}

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
  setLoading: () => { },
  setCourses: () => { },
  setTimetable: () => { },
  setTimetables: () => { },
  getAllTimetables: () => { },
  getTimetable: () => { },
  getCourses: () => { },
  addTimetable: () => { },
  deleteTimetable: () => { },
};

const TimetableContext = React.createContext<Context>(initialState);

function TimetableProvider({ children }: React.PropsWithChildren<{}>) {
  const { accessToken } = useUser();

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

  async function getAllTimetables() {
    setLoading(true);
    axios
      .get("/api/v1/timetable/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTimetables(res.data.data);
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function addTimetable(
    timetable: TimetableInterface,

  ) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .post("/api/v1/timetable/new", timetable, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTimetables([...timetables, res.data.data]);
          toast.success("Timetable added successfully", { id: toastLoading });
        }
      })
      .catch((err) =>
        toast.warning(err.response.data.message, {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function deleteTimetable(timetableId: string,) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .delete(`/api/v1/timetable/delete/${timetableId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTimetables(
            timetables.filter((timetable) => timetable._id !== timetableId)
          );
          toast.success("Timetable deleted successfully", { id: toastLoading });
        }
      })
      .catch((err) =>
        toast.warning(err.response.data.message, {
          id: toastLoading,
        })
      )
      .finally(() => setLoading(false));
  }

  async function getCourses(stream: string,) {
    setLoading(true);
    axios
      .get(`/api/v1/timetable/courses?stream=${stream}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setCourses(res.data.data);
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function getTimetable(
    stream: string,
    course: string,
    semester: string,

  ) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .get(`/api/v1/timetable`, {
        params: {
          stream,
          course,
          semester,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setTimetable(res.data.data);
          toast.success("Timetable found", {
            id: toastLoading,
          });
        }
      })
      .catch((err) => {
        toast.error("Something broke!", {
          id: toastLoading,
        });
        console.log(err);
      })
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
        getAllTimetables,
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
}

const useTimetable = () => React.useContext(TimetableContext);

export { useTimetable, TimetableProvider };
