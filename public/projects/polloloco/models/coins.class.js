/**
 * Represents a coin in the game, which can likely be collected by the player's character.
 * @extends MovableObject
 */
class Coins extends MovableObject {

  /**
   * The y-coordinate of the coin.
   * @type {number}
   */
  y = 240;

  /**
   * The height of the coin.
   * @type {number}
   */
  height = 100;

  /**
   * The width of the coin.
   * @type {number}
   */
  width = 100;

  /**
   * Creates a new Coins instance, sets its position, and loads its image.
   */
  constructor() {
    super().loadImage("img/8_coin/coin_2.png");
    this.x = 500 + Math.random() * 1500;
  }
}
