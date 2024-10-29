import WebSocket from "ws";
import { Database } from "../models/Database";
import { createGame } from "./createGame";
import { updateRooms } from "./updateRooms";

type RoomInput = {
  indexRoom: string;
};

const db = Database.getDBInstance();

const addPlayerToRoom = (data: RoomInput, socket: WebSocket) => {
  const { indexRoom } = data;
  db.addPlayerToRoom(indexRoom, socket);

  createGame(indexRoom);
  updateRooms();
};

export { addPlayerToRoom };
