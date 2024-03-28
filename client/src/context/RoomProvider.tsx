import React from "react";
import axios from "axios";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";
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
};

const RoomContext = React.createContext<Context>(initialState);

export function RoomProvider({ children }: React.PropsWithChildren<{}>) {
  const navigate = useNavigate();
  const { accessToken } = useUser();

  const [rooms, setRooms] = React.useState<RoomInterface[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchRooms(navigateTo?: string) {
    setLoading(true);
    axios
      .get("/api/v1/room")
      .then((res) => {
        if (res.data.success) {
          setRooms(res.data.data);
          navigateTo ? navigate(navigateTo) : "";
        }
      })
      .catch((err) => console.warn(err.message))
      .finally(() => setLoading(false));
  }

  async function addRooms(roomsAdded: RoomInterface[], navigateTo?: string) {
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
          navigateTo ? navigate(navigateTo) : "";
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

  async function deleteRoom(roomId: string, navigateTo?: string) {
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
          navigateTo ? navigate(navigateTo) : "";
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

  async function bookRoom(roomId: string, navigateTo?: string) {
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
          navigateTo ? navigate(navigateTo) : "";
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
