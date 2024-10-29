import { Coordinates } from "../types";

enum ShipType {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  HUGE = "huge",
}

class Ship {
  id: string;
  coordinates: Coordinates;
  direction: boolean;
  length: number;
  type: ShipType;
  hits: number;

  constructor(
    coordinates: Coordinates,
    direction: boolean,
    type: ShipType,
    length: number
  ) {
    this.id = crypto.randomUUID();
    this.coordinates = coordinates;
    this.direction = direction;
    this.type = type;
    this.length = length;
    this.hits = 0;
  }

  attackShip(x: number, y: number) {
    const isHitted = this.isHitted(x, y);

    if (isHitted) {
      this.hits += 1;

      return true;
    }

    return false;
  }

  isHitted(x: number, y: number) {
    if (this.direction) {
      return (
        this.coordinates.x === x &&
        this.coordinates.y <= y &&
        y < this.coordinates.y + this.length
      );
    } else {
      return (
        this.coordinates.y === y &&
        this.coordinates.x <= x &&
        x < this.coordinates.x + this.length
      );
    }
  }

  get isKilled() {
    return this.hits === this.length;
  }

  getShipCells() {
    const shipCells: Coordinates[] = [];

    for (let i = 0; i < this.length; i++) {
      const x = this.direction ? this.coordinates.x : this.coordinates.x + i;
      const y = this.direction ? this.coordinates.y + i : this.coordinates.y;
      shipCells.push({ x, y });
    }

    return shipCells;
  }

  getSurroundingCells() {
    const shipCells = this.getShipCells();
    const surroundingCells = new Set();

    const directions = [
      { dx: -1, dy: -1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 0 },
      /* ship cell */ { dx: 1, dy: 0 },
      { dx: -1, dy: 1 },
      { dx: 0, dy: 1 },
      { dx: 1, dy: 1 },
    ];

    shipCells.forEach((cell) => {
      directions.forEach((dir) => {
        const x = cell.x + dir.dx;
        const y = cell.y + dir.dy;
        if (x >= 0 && y >= 0) {
          // Ensure coordinates are non-negative
          const key = `${x},${y}`;
          surroundingCells.add(key);
        }
      });
    });

    // Remove the ship cells from the surrounding cells
    shipCells.forEach((cell) => {
      const key = `${cell.x},${cell.y}`;
      surroundingCells.delete(key);
    });

    // Convert the set back to an array of coordinate objects
    return Array.from(surroundingCells).map((key) => {
      const [x, y] = (key as string).split(",").map(Number);
      return { x, y };
    });
  }
}

export { Ship, ShipType };
