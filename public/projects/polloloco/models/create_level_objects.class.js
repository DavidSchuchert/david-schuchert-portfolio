class createLevelObjects {
  /**
   * Array of Chicken enemies for the level.
   * @type {Chicken[]}
   */
  static createLevelChickens() {
    return [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
    ];
  }

  /**
   * Array containing the end boss for the level.
   * @type {Endboss[]}
   */
  static createLevelEndboss() {
    return [new Endboss()];
  }

  /**
   * Array of Bottles collectibles for the level.
   * @type {Bottles[]}
   */
  static createLevelBottles() {
    return [
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
    ];
  }

  /**
   * Array of Coins collectibles for the level.
   * @type {Coins[]}
   */
  static createLevelCoins() {
    return [new Coins(), new Coins(), new Coins(), new Coins(), new Coins()];
  }

  /**
   * Array containing a Cloud object for the level.
   * @type {Cloud[]}
   */
  static createLevelClouds() {
    return [new Cloud()];
  }

  /**
   * Array of background objects to set the visual theme of the level.
   * The BackgroundObject instantiation requires two parameters: the image path and the x-position.
   * Multiple background objects create the parallax scrolling effect in the game.
   * @type {BackgroundObject[]}
   */
  static createLevelBackgrounds() {
    return [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        -719
      ),
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        0
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
    ];
  }
}
