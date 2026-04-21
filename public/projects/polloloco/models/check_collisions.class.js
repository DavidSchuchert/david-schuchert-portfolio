/**
 * Manages collisions within a game world. The CollisionManager is responsible
 * for detecting and handling interactions between various game entities such as
 * the player character, enemies, end bosses, bottles, and coins.
 */
class CollisionManager {
  /**
   * Creates a new CollisionManager instance.
   * @param {Object} world - The game world in which collisions occur.
   */
  const;
  constructor(world) {
    this.world = world;
    this.tollerance_x = 10;
    this.tollerance_y = 25;
  }

  /**
   * Central method to check for all types of collisions.
   */
  checkCollisions() {
    this.checkCharacterEnemyCollisions();
    this.checkEndbossCharacterCollisions();
    this.checkBottleEndbossCollisions();
    this.checkCharacterBottleCollisions();
    this.checkCharacterCoinCollisions();
  }

  /**
   * Checks for and handles collisions between the character and enemies.
   */
  checkCharacterEnemyCollisions() {
    this.world.level.enemies.forEach((enemy, index) => {
      if (
        this.world.character.isColliding(enemy) &&
        this.world.character.y + this.world.character.height <=
          enemy.y + this.tollerance_y &&
        this.world.character.speedY <= -10 &&
        this.world.character.x + this.world.character.width >=
          enemy.x - this.tollerance_x &&
        this.world.character.x <= enemy.x + enemy.width + this.tollerance_x
      ) {
        enemy.hit();
        enemy.isHit = true;
        setTimeout(() => {
          let enemyIndex = this.world.level.enemies.indexOf(enemy);
          if (enemyIndex !== -1) {
            this.world.level.enemies.splice(enemyIndex, 1);
          }
          enemy.isHit = false;
        }, 500);
      } else if (this.world.character.isColliding(enemy) && !enemy.isHit) {
        this.world.character.hit();
        this.world.statusBar.setPercentage(this.world.character.energy);
      }

      if (this.world.character.energy == 0) {
        this.world.GameEnds();
      }
    });
  }

  /**
   * Checks for and handles collisions between the character and the end boss.
   */
  checkEndbossCharacterCollisions() {
    this.world.level.endboss.forEach((boss, index) => {
      if (this.world.character.isColliding(boss)) {
        this.world.character.hit();
        this.world.statusBar.setPercentage(this.world.character.energy);
        boss.hasHit = true;
      }
      if (this.world.character.energy == 0) {
        this.world.GameEnds();
      }
    });
  }

  /**
   * Checks for and handles collisions between throwable bottles and the end boss.
   */
  checkBottleEndbossCollisions() {
    this.world.throwableObjects.forEach((throwableBottle, index) => {
      this.world.level.endboss.forEach((boss) => {
        if (boss.isColliding(throwableBottle)) {
          throwableBottle.splash();
          boss.bossGotHit();
          this.world.bossHealthBar.setPercentage(boss.BossHealth);
          if (!this.world.StopSounds) {
            this.world.bottle_smash_sound.play();
          } else {
            this.world.bottle_smash_sound.pause();
          }
        }
        if (boss.bossIsDead) {
          this.world.GameEnds();
        }
      });
    });
  }

  /**
   * Checks for and handles collisions when the character collects a bottle.
   */
  checkCharacterBottleCollisions() {
    this.world.level.bottles.forEach((bottle, index) => {
      if (this.world.character.isColliding(bottle)) {
        this.world.bottlesInInventory++;
        this.world.level.bottles.splice(index, 1);
        this.world.salsaBar.setPercentage(this.world.bottlesInInventory * 20);
        if (!this.world.StopSounds) {
          this.world.collect_bottle_sound.play();
        } else {
          this.world.collect_bottle_sound.pause();
        }
      }
    });
  }

  /**
   * Checks for and handles collisions when the character collects a coin.
   */
  checkCharacterCoinCollisions() {
    this.world.level.coins.forEach((coin, index) => {
      if (this.world.character.isColliding(coin)) {
        this.world.CoinsInInventory++;
        this.world.level.coins.splice(index, 1);
        this.world.coinBar.setPercentage(this.world.CoinsInInventory * 20);
        if (!this.world.StopSounds) {
          this.world.collect_coin_sound.play();
        } else {
          this.world.collect_coin_sound.pause();
        }
      }
    });
  }

  /**
   * Checks for throwable objects (like bottles) that the character can use.
   * Handles the creation of new throwable objects when the player decides
   * to throw one and manages the amount of throwable objects the character has in inventory.
   */
  checkThrowObjects() {
    if (
      this.world.keyboard.D &&
      !this.world.D_Pressed &&
      this.world.bottlesInInventory >= 1
    ) {
      let bottle = new ThrowableObject(
        this.world.character.x + 100,
        this.world.character.y + 100,
        this.world
      );
      this.world.throwableObjects.push(bottle);
      this.world.bottlesInInventory--;
      this.world.salsaBar.setPercentage(this.world.bottlesInInventory * 20);
      this.world.D_Pressed = true;
    } else if (!this.world.keyboard.D) {
      this.world.D_Pressed = false;
    }
  }
}
