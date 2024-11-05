import Location from "../world/Location.js";

export default abstract class AbstractEntity {
  private location: Location;
  private width: number;
  private height: number;
  private speed: number;

  constructor(
    location: Location,
    width: number,
    height: number,
    speed: number
  ) {
    this.location = location;
    this.width = width;
    this.height = height;
    this.speed = speed;
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

  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }
}
