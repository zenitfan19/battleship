import { RawData, WebSocket } from "ws";
import { WS_MESSAGE_TYPE, WsMessage } from "./types";
import { register } from "./controllers/register";
import { createRoom } from "./controllers/createRoom";
import { addPlayerToRoom } from "./controllers/addPlayerToRoom";
import { addShipsForPlayer } from "./controllers/addShipsForPlayer";
import { attack } from "./controllers/attack";
import { randomAttack } from "./controllers/randomAttack";

const messageHandler = async (
  message: RawData,
  socket: WebSocket
): Promise<void> => {
  try {
    const { type, data, id }: WsMessage = JSON.parse(message.toString());
    const parsedData = JSON.parse(data || "null");

    console.log(
      `\x1b[38;2;255;223;0m Message type: ${type} with data: ${data} \x1b[0m`
    );

    switch (type) {
      case WS_MESSAGE_TYPE.REGISTER:
        register(parsedData, socket);
        break;
      case WS_MESSAGE_TYPE.CREATE_ROOM:
        createRoom(socket);
        break;
      case WS_MESSAGE_TYPE.ADD_USER_TO_ROOM:
        addPlayerToRoom(parsedData, socket);
        break;
      case WS_MESSAGE_TYPE.ADD_SHIPS:
        addShipsForPlayer(parsedData);
        break;
      case WS_MESSAGE_TYPE.ATTACK:
        attack(parsedData);
        break;
      case WS_MESSAGE_TYPE.RANDOM_ATTACK:
        randomAttack(parsedData);
        break;
      default:
        console.error("Invalid message type");
    }
  } catch (error) {
    console.error(error);
  }
};

export { messageHandler };
