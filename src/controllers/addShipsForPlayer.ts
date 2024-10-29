import { Database } from "../models/Database";
import { Ship, ShipType } from "../models/Ship";
import { startGame } from "./startGame";

type ShipInput = {
  gameId: string;
  ships: {
    position: {
      x: number;
      y: number;
    };
    direction: boolean;
    length: number;
    type: ShipType;
  }[];
  indexPlayer: string;
};

const db = Database.getDBInstance();

const addShipsForPlayer = (data: ShipInput) => {
  const { gameId, ships, indexPlayer } = data;

  const shipModels = ships.map(
    ({ type, length, direction, position }) =>
      new Ship(position, direction, type, length)
  );
  db.addShipsForPlayer(gameId, shipModels, indexPlayer);

  startGame(gameId);
};

export { addShipsForPlayer };
