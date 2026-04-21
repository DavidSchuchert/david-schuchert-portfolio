/**
 * Represents a movable object in the game.
 * This is an extension of the DRAWABLE_OBJECT, which allows objects to have
 * properties and methods related to movement and interaction in the game environment.
 */
class MovableObject extends DRAWABLE_OBJECT {

  /**
   * Horizontal speed of the object.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Vertical speed of the object.
   * @type {number}
   */
  speedY = 0;

  /**
   * Acceleration due to gravity.
   * @type {number}
   */
  accerleration = 1;

  /**
   * Indicates if the object is moving in a direction opposite to its primary one.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * Energy or health of the object. 0 means the object is dead.
   * @type {number}
   */
  energy = 100;

  /**
   * Timestamp of the last time the object got hit.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Applies gravity to the object, making it fall down until it hits the ground.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accerleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} - True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true; // Throwable object should always fall
    } else {
      return this.y < 140;
    }
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {Object} obj - The other object to check collision with.
   * @returns {boolean} - True if the objects are colliding, otherwise false.
   */
  isColliding(obj) {
    return (
      this.x + this.width > obj.x &&
      this.y + this.height > obj.y &&
      this.x < obj.x &&
      this.y < obj.y + obj.height
    );
  }

  /**
   * Reduces the object's energy when it gets hit.
   */
  hit() {
    this.energy -= 5;

    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object got hurt recently (within the last second).
   * @returns {boolean} - True if the object got hurt recently, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (energy is 0).
   * @returns {boolean} - True if the object is dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays an animation using a list of images.
   * @param {Array<string>} images - List of image paths to animate.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump.
   */
  jump() {
    this.speedY = 15;
  }
}
