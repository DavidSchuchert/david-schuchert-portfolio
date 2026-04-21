/**
 * Represents a bottle object in the game, which is a type of movable object.
 * @extends MovableObject
 */
class Bottles extends MovableObject {

  /**
   * The y-coordinate of the bottle object.
   * @type {number}
   */
  y = 370;

  /**
   * The height of the bottle object.
   * @type {number}
   */
  height = 60;

  /**
   * The width of the bottle object.
   * @type {number}
   */
  width = 60;

  /**
   * Creates a new Bottles instance.
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 500 + Math.random() * 1500;
  }
}
