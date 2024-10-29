import { Database } from "../models/Database";
import { Coordinates } from "../types";
import { attack, AttackInput } from "./attack";

type RandomAttackInput = Pick<AttackInput, "gameId" | "indexPlayer">;

const db = Database.getDBInstance();

const randomAttack = ({ gameId, indexPlayer }: RandomAttackInput) => {
  const game = db.getGameById(gameId);

  const notCheckedCoordinated: Coordinates[] = [];
  game?.boards.get(indexPlayer)?.cells.forEach((row, x) =>
    row.forEach((cell, y) => {
      if (!cell.isChecked) {
        notCheckedCoordinated.push(cell.coordinates);
      }
    })
  );

  const { x, y } =
    notCheckedCoordinated[
      Math.floor(Math.random() * notCheckedCoordinated.length)
    ];

  attack({ gameId, indexPlayer, x, y });
};

export { randomAttack };
