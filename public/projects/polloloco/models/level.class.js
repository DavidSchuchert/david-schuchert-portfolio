/**
 * Represents a game level.
 * This class holds all the elements that construct a particular level, 
 * such as enemies, endboss, coins, clouds, and other background objects.
 */
class Level {

    /**
     * List of enemies present in the level.
     * @type {Array}
     */
    enemies;
  
    /**
     * The endboss character of the level.
     */
    endboss;
  
    /**
     * List of clouds in the level's background.
     * @type {Array}
     */
    clouds;
  
    /**
     * List of bottles present in the level.
     * @type {Array}
     */
    bottles;
  
    /**
     * List of coins that can be collected in the level.
     * @type {Array}
     */
    coins;
  
    /**
     * Miscellaneous background objects present in the level.
     * @type {Array}
     */
    backgroundObjects;
  
    /**
     * X-axis position indicating the end of the level.
     * @type {number}
     */
    level_end_x = 2200;
  
    /**
     * Creates a new game level.
     * @param {Array} enemies - List of enemies in the level.
     * @param {Object} endboss - The endboss character of the level.
     * @param {Array} bottles - List of bottles in the level.
     * @param {Array} coins - List of collectible coins in the level.
     * @param {Array} clouds - List of clouds in the level's background.
     * @param {Array} backgroundObjects - List of other background objects.
     */
    constructor(enemies, endboss, bottles, coins, clouds, backgroundObjects) {
      this.enemies = enemies;
      this.endboss = endboss;
      this.coins = coins;
      this.bottles = bottles;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
    }
  }
  