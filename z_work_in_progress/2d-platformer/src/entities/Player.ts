import Location from "../world/Location.js";
import AbstractEntity from "./AbstractEntity.js";

export default class Player extends AbstractEntity {
  public constructor() {
    super(new Location(0, 0), 20, 20, 1);
  }
}
