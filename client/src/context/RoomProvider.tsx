import React from "react";
import axios from "axios";
import { useUser } from "./UserProvider";

export interface RoomInterface {
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
  addRoom: Function;
  deleteRoom: Function;
  fetchRooms: Function;
  bookRoom: Function;
}

const initialState = {
  loading: false,
  setLoading: () => null,
  rooms: [],
  setRooms: () => null,
  fetchRooms: () => null,
  addRoom: () => null,
  deleteRoom: () => null,
  bookRoom: () => null,
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

  async function addRoom(...rooms: RoomInterface[]) {
    setLoading(true);
    axios
      .post("/api/v1/room", rooms, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setRooms([...rooms, res.data.data]);
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function deleteRoom(roomId: string) {
    setLoading(true);
    axios
      .delete(`/api/v1/room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setRooms(rooms.filter((room) => room.roomNumber !== roomId));
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function bookRoom(roomId: string) {
    setLoading(true);
    axios
      .post(`/api/v1/room/book/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
        }
      })
      .catch((err) => console.warn(err.message))
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
        addRoom,
        deleteRoom,
        bookRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export const useRoom = () => React.useContext(RoomContext);
