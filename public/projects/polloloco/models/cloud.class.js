/**
 * Represents a cloud in the game, which is a type of movable object.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /**
   * The y-coordinate of the cloud.
   * @type {number}
   */
  y = 50;

  /**
   * The width of the cloud.
   * @type {number}
   */
  width = 500;

  /**
   * The height of the cloud.
   * @type {number}
   */
  height = 300;

  /**
   * The speed at which the cloud moves.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Creates a new Cloud instance and initializes its position and animations.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  /**
   * Initiates the cloud's movement to the left.
   */
  animate() {
    this.moveLeft();
  }
}
