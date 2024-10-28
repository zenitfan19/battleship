import { RawData, WebSocket } from "ws";
import { WS_MESSAGE_TYPE, WsMessage } from "./types";
import { register } from "./controllers/register";

const messageHandler = async (
  message: RawData,
  socket: WebSocket
): Promise<void> => {
  try {
    const { type, data, id }: WsMessage = JSON.parse(message.toString());
    const parsedData = JSON.parse(data);

    switch (type) {
      case WS_MESSAGE_TYPE.REGISTER:
        register(parsedData, socket);
        break;
      case WS_MESSAGE_TYPE.UPDATE_WINNERS:
        break;
      case WS_MESSAGE_TYPE.CREATE_ROOM:
        break;
      case WS_MESSAGE_TYPE.ADD_USER_TO_ROOM:
        break;
      case WS_MESSAGE_TYPE.CREATE_GAME:
        break;
      case WS_MESSAGE_TYPE.UPDATE_ROOM:
        break;
      case WS_MESSAGE_TYPE.ADD_SHIPS:
        break;
      case WS_MESSAGE_TYPE.START_GAME:
        break;
      case WS_MESSAGE_TYPE.ATTACK:
        break;
      case WS_MESSAGE_TYPE.RANDOM_ATTACK:
        break;
      case WS_MESSAGE_TYPE.TURN:
        break;
      case WS_MESSAGE_TYPE.FINISH:
        break;
      default:
        console.error("Invalid message type");
    }
  } catch (error) {
    console.error(error);
  }
};

export { messageHandler };
