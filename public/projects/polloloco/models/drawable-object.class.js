/**
 * Represents a drawable object in the game with image-rendering capabilities.
 * This class provides the ability to load, cache, and draw images onto a canvas context.
 * It also has an optional bounding box drawing function which works for certain derived classes.
 */
class DRAWABLE_OBJECT {
  img;
  /**
   * Cached images object to store and reuse loaded images.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};
  /**
   * The X-coordinate of the object's position.
   * @type {number}
   */
  x = 120;

  /**
   * The Y-coordinate of the object's position.
   * @type {number}
   */
  y = 280;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 100;

  /**
   * Loads a single image and sets it to this object.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and caches them for later use.
   * @param {string[]} arr - An array of image paths to be loaded and cached.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object's current image onto the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the image will be drawn.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a bounding box around the object if it's an instance of specific classes.
   * Useful for debugging and visualizing object dimensions and for Collision detection.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the bounding box will be drawn.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Bottles ||
      this instanceof Coins ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "rgba(" + [0, 0, 0, 0] + ")";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

    /**
   * Determines the appropriate image index based on the current percentage.
   * @returns {number} - The index of the image in the IMAGES array to be used.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  
  /**
   * Sets the percentage and image of the coin bar based on the provided percentage.
   * @param {number} percentage - The percentage to set for the coin bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    this.resolveImageIndex();
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
