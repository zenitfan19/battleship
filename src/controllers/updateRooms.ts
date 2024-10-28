import { Database } from "../models/Database";
import { WS_MESSAGE_TYPE } from "../types";

const db = Database.getDBInstance();

const updateRooms = () => {
  const rooms = db.getRooms();
  const filteredRooms = rooms.filter(({ roomUsers }) => roomUsers.length < 2);

  db.connections.forEach((connection) => {
    connection.send(
      JSON.stringify({
        type: WS_MESSAGE_TYPE.UPDATE_ROOM,
        data: JSON.stringify(filteredRooms),
        id: 0,
      })
    );
  });
};

export { updateRooms };
