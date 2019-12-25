/**
 * Returns a random integer in the given range.
 * @param {number} min Minimum integer in range
 * @param {number} max Maximum integer in range
 */
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const colors = {
  background: {
    top: "#8941ff",
    mid: "#f070f9",
    bottom: "#ff71ce",
  },
}

export { randomInt, colors }
