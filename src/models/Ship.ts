enum ShipType {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  HUGE = "huge",
}

type Coordinates = {
  x: number;
  y: number;
};

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
}

export { Ship, ShipType };
