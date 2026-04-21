/**
 * Represents a background object in the game, which is a type of movable object.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

  /** 
   * The width of the background object.
   * @type {number} 
   */
  width = 720;

  /** 
   * The height of the background object.
   * @type {number} 
   */
  height = 480;

  /**
   * Creates a new BackgroundObject instance.
   * @param {string} imagePath - The path to the image resource for the background object.
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object. (This parameter seems unused in the provided constructor, but is included in the documentation for clarity.)
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.y = 480 - this.height; 
    this.x = x;
  }
}

