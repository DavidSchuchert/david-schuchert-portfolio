/**
 * Represents the health status bar in the game.
 * This is an extension of the DRAWABLE_OBJECT class, which provides the game 
 * with a visual representation of the player's health percentage, using different images.
 */
class STATUSBAR extends DRAWABLE_OBJECT {

  /**
   * Array of images that depict different percentage levels for the health status bar.
   * @type {Array<string>}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Percentage value of the health in the status bar.
   * @type {number}
   */
  percentage = 100;

  /**
   * Constructs a new STATUSBAR object, initializes the image and sets its properties.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }
}
