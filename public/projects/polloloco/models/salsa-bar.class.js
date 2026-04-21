/**
 * Represents the Salsa status bar in the game.
 * This is an extension of the DRAWABLE_OBJECT class, which provides the game 
 * with a visual representation of the salsa percentage, using different images.
 */
class SALSABAR extends DRAWABLE_OBJECT {

  /**
   * Array of images that depict different percentage levels for the salsa bar.
   * @type {Array<string>}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Percentage value of the salsa in the bar.
   * @type {number}
   */
  percentage = 0;

  /**
   * Constructs a new SALSABAR object, initializes the image and sets its properties.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

}
