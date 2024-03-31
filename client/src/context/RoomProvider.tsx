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

interface Context {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  rooms: RoomInterface[];
  setRooms: React.Dispatch<React.SetStateAction<RoomInterface[]>>;
  addRooms: Function;
  deleteRoom: Function;
  fetchRooms: Function;
  bookRoom: Function;
  fetchVacantRooms: Function;
}

const initialState = {
  loading: false,
  setLoading: () => null,
  rooms: [],
  setRooms: () => null,
  fetchRooms: () => null,
  addRooms: () => null,
  deleteRoom: () => null,
  bookRoom: () => null,
  fetchVacantRooms: () => null
};

const RoomContext = React.createContext<Context>(initialState);

export function RoomProvider({ children }: React.PropsWithChildren<{}>) {
  const { accessToken } = useUser();

  const [rooms, setRooms] = React.useState<RoomInterface[]>([]);
  const [loading, setLoading] = React.useState(false);

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
    const date = new Date;
    const hours = date.getHours() > 12 ? date.getHours() - 12: date.getHours()
    const time = `${hours - 1}.30-${hours}.30`
    setLoading(true);
    axios
      .get(`/api/v1/room/vacant?time=${time}`)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data)
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
          toast.success("Rooms added successfully", {
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
      .delete(`/api/v1/room/delete/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setRooms(rooms.filter((room) => room._id !== roomId));
          toast.success("Room deleted successfully", {
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

  async function bookRoom(roomId: string) {
    const toastLoading = toast.loading("Please wait...");
    setLoading(true);
    axios
      .post(`/api/v1/room/book/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Room booked successully", {
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

  return (
    <RoomContext.Provider
      value={{
        rooms,
        loading,
        setLoading,
        setRooms,
        fetchRooms,
        fetchVacantRooms,
        addRooms,
        deleteRoom,
        bookRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export const useRoom = () => React.useContext(RoomContext);
