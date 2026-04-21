/**
 * Represents a coin bar status in the game, which shows the amount of coins collected or progress made.
 * @extends DRAWABLE_OBJECT
 */
class COINBAR extends DRAWABLE_OBJECT {
  /**
   * The images representing various stages of the coin bar.
   * @type {Array<string>}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  /**
   * The percentage representation of the coin bar.
   * @type {number}
   */
  percentage = 0;

  /**
   * Creates a new COINBAR instance, sets its position and initializes its image based on percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }
}
