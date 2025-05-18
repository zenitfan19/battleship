import { Ship, ShipType } from "../models/Ship";

function placeBotShips(): Ship[] {
  const shipConfigs = [
    { type: ShipType.HUGE, length: 4, count: 1 },
    { type: ShipType.LARGE, length: 3, count: 2 },
    { type: ShipType.MEDIUM, length: 2, count: 3 },
    { type: ShipType.SMALL, length: 1, count: 4 },
  ];
  const boardSize = 10;
  const occupied = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(false)
  );
  const ships: Ship[] = [];

  function canPlace(
    x: number,
    y: number,
    length: number,
    vertical: boolean
  ): boolean {
    for (let i = 0; i < length; i++) {
      const nx = vertical ? x : x + i;
      const ny = vertical ? y + i : y;
      if (nx < 0 || nx >= boardSize || ny < 0 || ny >= boardSize) return false;
      if (occupied[nx][ny]) return false;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const sx = nx + dx,
            sy = ny + dy;
          if (
            sx >= 0 &&
            sx < boardSize &&
            sy >= 0 &&
            sy < boardSize &&
            occupied[sx][sy]
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function placeShip(length: number, type: ShipType) {
    while (true) {
      const vertical = Math.random() < 0.5;
      const x = Math.floor(
        Math.random() * (vertical ? boardSize : boardSize - length + 1)
      );
      const y = Math.floor(
        Math.random() * (vertical ? boardSize - length + 1 : boardSize)
      );
      if (canPlace(x, y, length, vertical)) {
        const ship = new Ship({ x, y }, vertical, type, length);
        ships.push(ship);
        for (let i = 0; i < length; i++) {
          const nx = vertical ? x : x + i;
          const ny = vertical ? y + i : y;
          occupied[nx][ny] = true;
        }
        return;
      }
    }
  }

  for (const { type, length, count } of shipConfigs) {
    for (let i = 0; i < count; i++) {
      placeShip(length, type);
    }
  }
  return ships;
}

export { placeBotShips };
