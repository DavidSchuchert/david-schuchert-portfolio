/**
 * Represents a throwable object within the game, which is a type of movable object.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /**
   * Array of image paths for the bottle Spin animation.
   * @type {string[]}
   */
  IMAGES_BOTTLE_SPIN = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Array of image paths for the bottle Splash animation.
   * @type {string[]}
   */
  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Flag to determine if the bottle is currently displaying the splash animation.
   * @type {boolean}
   */
  isSplashing = false;

  /**
   * Creates a new ThrowableObject instance.
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object.
   * @param {World} world - The game world in which the throwable object exists.
   */
  constructor(x, y, world) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.world = world;
    this.currentImage = 0;
    this.loadImages(this.IMAGES_BOTTLE_SPIN);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw(100, 200);
    this.animate();
  }

  /**
   * Initiates the bottle's animations and movement.
   */
  animate() {
    setInterval(() => {
      if (!this.isSplashing) {
        this.playAnimation(this.IMAGES_BOTTLE_SPIN);
      }
    }, 50);
  }

  /**
   * Play the splash animation when the bottle lands. After the animation completes,
   * the bottle is removed from the game world's list of throwable objects.
   */
  splash() {
    this.isSplashing = true;
    let splashAnimationInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        if (this.currentImage >= this.IMAGES_BOTTLE_SPLASH.length - 1) {
            clearInterval(splashAnimationInterval);        
            setTimeout(() => {
                this.world.throwableObjects.splice(this.world.throwableObjects.indexOf(this), 1);
            }, 100);
        }
    }, 50);
}

  /**
   * Causes the object to be thrown, moving it forward while applying gravity.
   */
  throw() {
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
