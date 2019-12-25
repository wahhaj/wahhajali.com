/**
 * Returns a random integer in the given range.
 * @param {number} min Minimum integer in range
 * @param {number} max Maximum integer in range
 */
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export { randomInt }
