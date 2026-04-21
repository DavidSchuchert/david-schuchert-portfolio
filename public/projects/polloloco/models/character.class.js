/**
 * Represents the main character in the game, which is a type of movable object.
 * @extends MovableObject
 */
class Character extends MovableObject {
  /**
   * The height of the character.
   * @type {number}
   */
  height = 280;

  /**
   * The y-coordinate of the character.
   * @type {number}
   */
  y = 135;

  /**
   * The speed at which the character moves.
   * @type {number}
   */
  speed = 10;

  /**
   * Array of image paths for the character's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Array of image paths for the character's jumping animation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Array of image paths for the character's death animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Array of image paths for the character's hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Array of image paths for the character's idle animation.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * The current image being displayed in the character's animation.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Reference to the game world.
   */
  world;

  /**
   * Audio for the character's walking sound.
   * @type {Audio}
   */
  walking_sound = new Audio("audio/walk.mp3");

  /**
   * Audio for the character's jump sound.
   * @type {Audio}
   */
  jump_sound = new Audio("audio/jump.mp3");

  /**
   * The interval at which the character's animation is updated.
   * @type {number}
   */
  animationInterval = null;

  /**
   * Creates a new Character instance and initializes its animations and behavior.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Initiates the character's animations and movement.
   */
  animate() {
    setInterval(() => {
      this.moveCharacter();
    }, 1000 / 60);

    this.setAnimationInterval(50);
  }

  /**
   * Sets the rate at which the character's animation updates.
   * @param {number} rate - The time interval in milliseconds.
   */
  setAnimationInterval(rate) {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    this.animationInterval = setInterval(() => {
      this.playCharacterStatusAnimations();
    }, rate);
  }

  /**
   * Updates the character's position based on user input.
   */
  moveCharacter() {
    if (!this.world) return;
    this.handleWalkingSound();

    if (this.world.keyboard.RIGHT) {
      this.moveRightHandler();
    }

    if (this.world.keyboard.LEFT) {
      this.moveLeftHandler();
    }

    if (this.world.keyboard.SPACE) {
      this.jumpHandler();
    }

    this.world.camera_x = -this.x + 100;
  }

  /**
   * Handle character movement to the right.
   */
  moveRightHandler() {
    if (this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.playWalkingSound();
    }
  }

  /**
   * Handle character movement to the left.
   */
  moveLeftHandler() {
    if (this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Handle character jump.
   */
  jumpHandler() {
    if (!this.isAboveGround()) {
      this.jump();
      this.playJumpSound();
    }
  }

  /**
   * Play walking sound based on sound settings.
   */
  handleWalkingSound() {
    if (!this.world) return;
    this.walking_sound.pause();

    if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.world.StopSounds) {
      this.walking_sound.play();
    }
  }

  /**
   * Play jump sound based on sound settings.
   */
  playJumpSound() {
    if (this.world && !this.world.StopSounds) {
      this.jump_sound.play();
    } else {
      this.jump_sound.pause();
    }
  }

  /**
   * Play walking sound.
   */
  playWalkingSound() {
    if (this.world && !this.world.StopSounds) {
      this.walking_sound.play();
    }
  }

  /**
   * Updates the character's animation based on its current status.
   */
  playCharacterStatusAnimations() {
    if (!this.world) return;
    if (this.isDead()) {
      this.setAnimationInterval(50);
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.setAnimationInterval(50);
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.setAnimationInterval(100);
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.setAnimationInterval(50);
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.setAnimationInterval(50);
      this.playAnimation(this.IMAGES_IDLE);
    }
}
}
