/**
 * Reference to the game's canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Reference to the game's world object.
 * @type {Object}
 */
let world;

/**
 * Keyboard instance for tracking key states.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Reference to the game's start button element.
 * @type {HTMLElement}
 */
let startButton = document.getElementById("startbutton");


let isSoundMuted = localStorage.getItem("soundMuted") === "true";




/**
 * Initializes the game by hiding the start screen and displaying the game canvas.
 */
function init() {
  document.getElementById("endscreen").style.display = 'none';
  document.getElementById("startscreen").style.display = 'none';
  document.getElementById("Hud_Game").style.display = 'block';
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  addTouch();
  let isSoundMuted = localStorage.getItem("soundMuted") === "true";

  if (isSoundMuted) {
    muteAllSounds();
  } else {
    unmuteAllSounds();
    world.bg_music.play();
  }
}

/**
 * Mutes all game sounds and displays the unmute button.
 */
function muteAllSounds(){
  if (world) {
    world.StopSounds = true;
    world.bg_music.pause();
    document.getElementById("unmutebutton").style.display = "block";
    document.getElementById("mutebutton").style.display = "none";

    localStorage.setItem("soundMuted", true);
  }
}
/**
 * Unmutes all game sounds and displays the mute button.
 */
function unmuteAllSounds() {
  if (world) {
    if (world.StopSounds) {
      world.StopSounds = false;
      document.getElementById("unmutebutton").style.display = "none";
      document.getElementById("mutebutton").style.display = "block";
      world.bg_music.play();
      // Speichere den Unmute-Zustand im Local Storage
      localStorage.setItem("soundMuted", false);
    }
  }
}

/** Thats the implementation of our Touch Controls for Smartphones */
function addTouch() {
  document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.LEFT = true;
  });
  document.getElementById('btnLeft').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.LEFT = false;
  });
  document.getElementById('btnJump').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.SPACE = true;
  });
  document.getElementById('btnJump').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.SPACE = false;
  });
  document.getElementById('btnRight').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.RIGHT = true;
  });
  document.getElementById('btnRight').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.RIGHT = false;
  });
  document.getElementById('btnThrow').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.D = true;
  });
  document.getElementById('btnThrow').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.D = false;
  });
}

/**
 * Event listener for keyboard keydown events.
 * Sets the appropriate keyboard state based on the pressed key.
 *
 * @param {KeyboardEvent} e - The keydown event.
 */

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 68) {
      keyboard.D = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

});

/**
 * Event listener for keyboard keyup events.
 * Resets the appropriate keyboard state based on the released key.
 *
 * @param {KeyboardEvent} e - The keyup event.
 */

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
});




