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
}

export { Ship, ShipType };
