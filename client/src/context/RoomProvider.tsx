import React from "react";
import axios from "axios";
import { useUser } from "./UserProvider";
import { toast } from "sonner";

interface RoomInterface {
  _id: string;
  roomNumber: string;
  capacity: number;
  location: string;
}

interface BookedRoomInterface {
  _id: string;
  room: RoomInterface;
  time: string;
  occupiedBy: string;
}

interface Context {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  rooms: RoomInterface[];
  bookedRoom: BookedRoomInterface;
  setBookedRoom: React.Dispatch<React.SetStateAction<BookedRoomInterface>>;
  setRooms: React.Dispatch<React.SetStateAction<RoomInterface[]>>;
  addRooms: Function;
  deleteRoom: Function;
  fetchRooms: Function;
  bookRoom: Function;
  unbookRoom: Function;
  fetchVacantRooms: Function;
  getBookedRooms: Function;
}

const initialState = {
  loading: false,
  setLoading: () => null,
  rooms: [],
  bookedRoom: { room: { roomNumber: "", capacity: 0, location: "", _id: "" }, time: "", occupiedBy: "", _id: "" },
  setRooms: () => null,
  fetchRooms: () => null,
  addRooms: () => null,
  deleteRoom: () => null,
  setBookedRoom: () => null,
  bookRoom: () => null,
  unbookRoom: () => null,
  fetchVacantRooms: () => null,
  getBookedRooms: () => null
};

const RoomContext = React.createContext<Context>(initialState);

export function RoomProvider({ children }: React.PropsWithChildren<{}>) {
  const { accessToken } = useUser();

  const [rooms, setRooms] = React.useState<RoomInterface[]>([]);
  const [bookedRoom, setBookedRoom] = React.useState<BookedRoomInterface>({
    time: "",
    occupiedBy: "",
    _id: "",
    room: {
      roomNumber: "",
      capacity: 0,
      location: "",
      _id: ""
    }
  })
  const [loading, setLoading] = React.useState(false);
  const date = new Date;
  const hours = date.getHours() > 12 ? date.getHours() - 11 : date.getHours()
  const time = `${hours - 1}.30-${hours}.30`

  async function fetchRooms() {
    setLoading(true);
    axios
      .get("/api/v1/room")
      .then((res) => {
        if (res.data.success) {
          setRooms(res.data.data);
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function fetchVacantRooms() {
    setLoading(true);
    axios
      .get(`/api/v1/room/vacant?time=${time}`)
      .then((res) => {
        if (res.data.success) {
          setRooms(res.data.data);
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function addRooms(roomsAdded: RoomInterface[]) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .post(
        "/api/v1/room/new",
        { rooms: roomsAdded },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setRooms([...rooms, ...res.data.data]);
          console.log(res.data.data)
          toast.success(res.data.message, {
            id: toastLoading,
          });
        }
      })
      .catch((err) => {
        console.warn(err.response.data);
        toast.error(err.response.data.message || "Something broke!", {
          id: toastLoading,
        });
      })
      .finally(() => setLoading(false));
  }

  async function deleteRoom(roomId: string) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .delete(`/api/v1/room/delete/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      .then((res) => {
        if (res.data.success) {
          setRooms(rooms.filter((room) => room._id !== roomId));
          toast.success(res.data.message, {
            id: toastLoading,
          });
        }
      })
      .catch((err) => {
        console.warn(err);
        toast.error("Something broke!", {
          id: toastLoading,
        });
      })
      .finally(() => setLoading(false));
  }

  async function bookRoom(room: RoomInterface) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .post(`/api/v1/room/book`,
        { roomId: room._id, time },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      .then((res) => {
        if (res.data.success) {
          setBookedRoom({ _id: res.data.data._id, room, time: res.data.data.time, occupiedBy: res.data.data.occupiedBy })
          setRooms((rooms) => rooms.filter((roomEle) => roomEle._id !== room._id))
          toast.success(res.data.message, {
            id: toastLoading,
          });
        }
      })
      .catch((err) => {
        console.warn(err.message);
        toast.error("Something broke!", {
          id: toastLoading,
        });
      })
      .finally(() => setLoading(false));
  }

  async function unbookRoom(bookedRoom: BookedRoomInterface) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .delete(`/api/v1/room/unbook/${bookedRoom._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      .then((res) => {
        if (res.data.success) {
          setBookedRoom({
            room: {
              roomNumber: "",
              capacity: 0,
              location: "",
              _id: ""
            },
            time: "",
            occupiedBy: "",
            _id: ""
          })
          setRooms((rooms) => [...rooms, bookedRoom.room])
          toast.success(res.data.message, {
            id: toastLoading,
          });
        }
      })
      .catch((err) => {
        console.warn(err.message);
        toast.error("Something broke!", {
          id: toastLoading,
        });
      })
      .finally(() => setLoading(false));
  }

  async function getBookedRooms(teacherId?: string) {
    setLoading(true);
    axios
      .get(`/api/v1/room/getbooked`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            teacherId,
            time
          },
        })
      .then((res) => {
        if (res.data.success) {
          setBookedRoom(res.data.data[0])
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <RoomContext.Provider
      value={{
        rooms,
        bookedRoom,
        loading,
        setLoading,
        setBookedRoom,
        setRooms,
        fetchRooms,
        fetchVacantRooms,
        addRooms,
        deleteRoom,
        bookRoom,
        unbookRoom,
        getBookedRooms
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export const useRoom = () => React.useContext(RoomContext);
