/**
 * Represents a chicken in the game, which is a type of movable object.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /**
   * The y-coordinate of the chicken.
   * @type {number}
   */
  y = 370;

  /**
   * The height of the chicken.
   * @type {number}
   */
  height = 60;

  /**
   * The width of the chicken.
   * @type {number}
   */
  width = 60;

  /**
   * Indicates whether the chicken has been hit.
   * @type {boolean}
   */
  isHit = false;

  /**
   * Array of image paths for the chicken's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Array of image paths for the chicken's hit animation.
   * @type {string[]}
   */
  IMAGES_HIT = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * The current image being displayed in the chicken's animation.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Creates a new Chicken instance and initializes its animations and behavior.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 500 + Math.random() * 1500;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HIT);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Initiates the chicken's animations and movement.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    this.moveLeft();

    setInterval(() => {
      if (this.isHit) {
        this.playAnimation(this.IMAGES_HIT);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  /**
   * Marks the chicken as hit and stops its movement.
   */
  hit() {
    this.isHit = true;
    this.speed = 0;
  }
}
