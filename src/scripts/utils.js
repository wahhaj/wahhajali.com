/**
  * Returns a random integer in the given range.
  * @param {number} min Minimum integer in range
  * @param {number} max Maximum integer in range
*/
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
