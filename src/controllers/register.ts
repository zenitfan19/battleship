import { WebSocket } from "ws";
import { PlayerInput } from "../models/Player";
import { Database } from "../models/Database";
import { WS_MESSAGE_TYPE } from "../types";
import { updateWinners } from "./updateWinners";
import { updateRooms } from "./updateRooms";

const db = Database.getDBInstance();

const register = (data: PlayerInput, socket: WebSocket) => {
  try {
    const { name, id } = db.authenticatePlayer(data);
    db.registerPlayerConnection(id, socket);

    socket.send(
      JSON.stringify({
        type: WS_MESSAGE_TYPE.REGISTER,
        data: JSON.stringify({
          name,
          index: id,
          error: false,
          errorText: "",
        }),
        id: 0,
      })
    );

    updateWinners();
    updateRooms();
  } catch (error) {
    socket.send(
      JSON.stringify({
        type: WS_MESSAGE_TYPE.REGISTER,
        data: JSON.stringify({
          error: true,
          errorText: (error as Error).message,
        }),
        id: 0,
      })
    );
  }
};

export { register };
