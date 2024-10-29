import { Coordinates } from "../types";
import { Cell } from "./Cell";

class Board {
  cells: Cell[][];

  constructor() {
    this.cells = Array.from({ length: 10 }, (_, x) =>
      Array.from({ length: 10 }, (_, y) => new Cell({ x, y }))
    );
  }
}

export { Board };
