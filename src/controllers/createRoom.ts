import WebSocket from "ws";
import { Database } from "../models/Database";
import { WS_MESSAGE_TYPE } from "../types";

const db = Database.getDBInstance();

const createRoom = (socket: WebSocket) => {
  db.createRoom(socket);
  const rooms = db.getRooms();

  db.connections.forEach((connection) => {
    connection.send(
      JSON.stringify({
        type: WS_MESSAGE_TYPE.UPDATE_ROOM,
        data: JSON.stringify(rooms),
        id: 0,
      })
    );
  });
};

export { createRoom };
