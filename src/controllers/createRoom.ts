import WebSocket from "ws";
import { Database } from "../models/Database";
import { updateRooms } from "./updateRooms";

const db = Database.getDBInstance();

const createRoom = (socket: WebSocket) => {
  db.createRoom(socket);

  updateRooms();
};

export { createRoom };
