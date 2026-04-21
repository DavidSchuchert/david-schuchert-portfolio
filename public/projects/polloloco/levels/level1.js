/**
 * Represents the first level of the game.
 * This instantiation sets up various objects within the level such as enemies, end boss,
 * bottles, coins, clouds, and background objects. Each object type is passed as an array
 * to create multiple instances of the same type.
 * 
 * @constant
 * @type {Level}
 * 
 * @property {Chicken[]} chickens - Array of Chicken enemies for the level.
 * @property {Endboss[]} endboss - Array containing the end boss for the level.
 * @property {Bottles[]} bottles - Array of Bottles collectibles for the level.
 * @property {Coins[]} coins - Array of Coins collectibles for the level.
 * @property {Cloud[]} clouds - Array containing a Cloud object for the level.
 * @property {BackgroundObject[]} backgrounds - Array of background objects to set the visual theme of the level.
 */
const level1 = new Level(
  createLevelObjects.createLevelChickens(),
  createLevelObjects.createLevelEndboss(),
  createLevelObjects.createLevelBottles(),
  createLevelObjects.createLevelCoins(),
  createLevelObjects.createLevelClouds(),
  createLevelObjects.createLevelBackgrounds()
);
