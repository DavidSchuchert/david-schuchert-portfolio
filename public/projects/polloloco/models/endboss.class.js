/**
 * Represents the main antagonist of the game - the Endboss.
 * The Endboss has different animation states: walking, hit, and dead.
 * The player can reduce the Endboss's health by hitting him.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /**
   * The height of the Endboss.
   * @type {number}
   */
  height = 400;

  /**
   * The width of the Endboss.
   * @type {number}
   */
  width = 250;

  /**
   * The y-coordinate of the Endboss.
   * @type {number}
   */
  y = 50;

  /**
   * The health points of the Endboss.
   * When it reaches 0, the Endboss is considered dead.
   * @type {number}
   */
  BossHealth = 100;

  /**
   * Indicates if the Endboss has been hit.
   * @type {boolean}
   */
  hit = false;

  /**
   * indicates when Endboss hits Character.
   * @type {boolean}
   */
  hasHit = false;

  /**
   * Indicates if the Endboss is dead.
   * @type {boolean}
   */
  bossIsDead = false;

  /**
   * Images representing the walking state of the Endboss.
   * @type {Array<string>}
   */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * Images representing the hit state of the Endboss.
   * @type {Array<string>}
   */
  IMAGES_HIT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * Images representing the dead state of the Endboss.
   * @type {Array<string>}
   */
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

    /**
   * Images representing the walking state of the Endboss.
   * @type {Array<string>}
   */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ]

      /**
   * Images representing the has hit state of the Endboss.
   * @type {Array<string>}
   */
  IMAGES_HASHIT = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ]

  /**
   * Creates a new Endboss instance, sets its position, loads its images, and initializes animations.
   */
  constructor(bossHealthBar) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.currentImage = 0;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HIT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HASHIT);
    this.x = 2300;
    this.animate();
    this.bossHealthBar = bossHealthBar;
  }

  /**
   * Initiates the animation sequence for the Endboss based on its state: hit, dead, or walking.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    this.moveLeft();

    setInterval(() => {
      if (this.hit && !this.bossIsDead) {
        this.playAnimation(this.IMAGES_HIT);
        this.hit = false;
      } else if (this.bossIsDead) {
        this.playAnimation(this.IMAGES_DEAD);
      }
        else if (this.hasHit){
          this.playAnimation(this.IMAGES_HASHIT);
        }
       else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  /**
   * Handles the logic when the Endboss is hit by the player.
   * Reduces the BossHealth and updates the state of the Endboss.
   */
  bossGotHit() {
    if (this.BossHealth > 0) {
      this.BossHealth -= 33;
      this.hit = true;
    } else {
      this.bossIsDead = true;
    }
  }
}
