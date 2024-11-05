import Location from "../world/Location.js";

export default abstract class Entity {
  private location: Location;
  private width: number;
  private height: number;

  constructor(location: Location, width: number, height: number) {
    this.location = location;
    this.width = width;
    this.height = height;
  }

  public getLocation(): Location {
    return this.location;
  }

  public setLocation(location: Location): void {
    this.location = location;
  }

  public getWidth(): number {
    return this.width;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setHeight(height: number): void {
    this.height = height;
  }
}
