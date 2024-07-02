export default class Util {
    static doBoxesIntersect(box1X, box1Y, box1Height, box1Width, box2X, box2Y, box2Height, box2Width) {
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

    static doEntitiesIntersect(entity1, entity2) { // input: entity1, entity2
        return this.doBoxesIntersect(entity1.getLocation().getX(), entity1.getLocation().getY(), entity1.getHeight(), entity1.getWidth(), entity2.getLocation().getX(), entity2.getLocation().getY(), entity2.getHeight(), entity2.getWidth());
    }
}