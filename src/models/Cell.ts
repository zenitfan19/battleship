import { Coordinates } from "../types";

class Cell {
  coordinates: Coordinates;
  isChecked: boolean;

  constructor(coordinates: Coordinates) {
    this.coordinates = coordinates;
    this.isChecked = false;
  }

  setChecked() {
    this.isChecked = true;
  }
}

export { Cell };
