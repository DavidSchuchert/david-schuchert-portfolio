/**
 * Represents the health bar for the boss in the game, which is a type of drawable object.
 * @extends DRAWABLE_OBJECT
 */
class BOSSHEALTHBAR extends DRAWABLE_OBJECT{
  /**
   * An array of image paths representing different health states of the boss.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange.png",
    "img/7_statusbars/2_statusbar_endboss/blue.png",
    "img/7_statusbars/2_statusbar_endboss/blue.png",
    "img/7_statusbars/2_statusbar_endboss/blue.png",
    "img/7_statusbars/2_statusbar_endboss/green.png",
    "img/7_statusbars/2_statusbar_endboss/green.png",
  ];

/** 
 * Represents the current percentage of the boss's health.
 * @type {number}
 */
  percentage = 100;

  /**
   * Creates a new BOSSHEALTHBAR instance.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

}
