/**
 * Returns a random integer in the given range.
 * @param {number} min Minimum integer in range
 * @param {number} max Maximum integer in range
 */
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const colors = {
  moon: {
    shine: "#fff9f3",
    crater: "#eeeeee",
  },
  mountains: {
    back: {
      light: "#2763a2",
      dark: "#235a93",
    },
    mid: {
      light: "#00376f",
      dark: "#003265",
    },
    front: {
      light: "#0b1a37",
      dark: "#0a1832",
    },
  },
  background: {
    top: "#8941ff",
    mid: "#f070f9",
    bottom: "#ff71ce",
  },
}

export { randomInt, colors }
