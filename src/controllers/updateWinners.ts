import { WebSocket } from "ws";
import { Database } from "../models/Database";
import { WS_MESSAGE_TYPE } from "../types";

const db = Database.getDBInstance();

const updateWinners = (socket: WebSocket) => {
  const winners = db.getWinners();
  socket.send(
    JSON.stringify({
      type: WS_MESSAGE_TYPE.UPDATE_WINNERS,
      data: JSON.stringify(winners),
      id: 0,
    })
  );
};

export { updateWinners };
