/**
 * Represents the game world.
 */
class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = new STATUSBAR();
  salsaBar = new SALSABAR();
  coinBar = new COINBAR();
  bossHealthBar = new BOSSHEALTHBAR();
  throwableObjects = [];
  bottlesInInventory = 0;
  CoinsInInventory = 0;
  collect_bottle_sound = new Audio("audio/collectBottle.mp3");
  collect_coin_sound = new Audio("audio/collect_coin.mp3");
  bg_music = new Audio("audio/bg_music.mp3");
  bottle_smash_sound = new Audio("audio/bottlesmash.mp3");
  StopSounds = false;
  D_Pressed = false;

  /**
   * Initializes a new instance of the World.
   * @param {HTMLCanvasElement} canvas - The canvas on which the game will be drawn.
   * @param {Object} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.collisionManager = new CollisionManager(this);
  }

  /**
   * Sets the world instance for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Begins the game loop to check for collisions and thrown objects.
   * Check if Mute or Unmute
   */
  run() {
    setInterval(() => {
      this.collisionManager.checkCollisions();
      this.collisionManager.checkThrowObjects();
    }, 100);
  }

  /**
   * Clears the canvas and redraws the game world.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    ///----SPACE FOR FIXED OBJECTS!----
    this.addToMap(this.statusBar);
    this.addToMap(this.salsaBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bossHealthBar);


    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.bottles);

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the game map.
   * @param {Array} objects - An array of game objects.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the game map.
   * @param {Object} mo - The game object.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipimageBack(mo);
    }
  }

  /**
   * Flips the image of the game object for drawing.
   * @param {Object} mo - The game object.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the flipped image of the game object to its original state.
   * @param {Object} mo - The game object.
   */
  flipimageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Ends the game and displays the end screen.
   * Ends the BG Music
   */
  GameEnds() {
    setTimeout(() => {
      document.getElementById("canvas").style.display = "none";
      document.getElementById("Hud_Game").style.display = "none";
      document.getElementById("endscreen").style.display = "block";

    }, 1000);
    this.bg_music.pause();
  }
}
