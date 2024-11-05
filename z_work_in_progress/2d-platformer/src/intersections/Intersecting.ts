import AbstractEntity from "../entities/AbstractEntity.js";

export default class Intersecting {
  public static boxes(
    box1X: number,
    box1Y: number,
    box1Height: number,
    box1Width: number,
    box2X: number,
    box2Y: number,
    box2Height: number,
    box2Width: number
  ) {
    // calculate the right, left, top, and bottom coordinates of each box
    const box1Right = box1X + box1Width - 1;
    const box1Bottom = box1Y + box1Height - 1;
    const box2Right = box2X + box2Width - 1;
    const box2Bottom = box2Y + box2Height - 1;

    // check if box1 is to the left of box2
    if (box1Right < box2X || box2Right < box1X) {
      return false;
    }

    // check if box1 is above box2
    if (box1Bottom < box2Y || box2Bottom < box1Y) {
      return false;
    }

    // if none of the above conditions are met, the boxes intersect
    return true;
  }

  public static entities(entity1: AbstractEntity, entity2: AbstractEntity) {
    return Intersecting.boxes(
      entity1.getLocation().getX(),
      entity1.getLocation().getY(),
      entity1.getHeight(),
      entity1.getWidth(),
      entity2.getLocation().getX(),
      entity2.getLocation().getY(),
      entity2.getHeight(),
      entity2.getWidth()
    );
  }
}
