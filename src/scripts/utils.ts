import { Theme } from "./types"

/**
 * Returns a random integer in the given range.
 * @param {number} min Minimum integer in range
 * @param {number} max Maximum integer in range
 */
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

/**
 * The maximum number of rows/columns in the Game of Life simulation
 */
const MAX_GRID_SIZE = 120

/**
 * Themes for the Moon, Mountains, and Background colors
 */
const THEMES: Theme[] = [
  // Fire
  {
    moon: {
      shine: "#f8ed40",
      crater: "#f8ed40",
    },
    mountains: {
      back: {
        light: "#eb857d",
        dark: "#a76c8b",
      },
      mid: {
        light: "#824055",
        dark: "#662646",
      },
      front: {
        light: "#6f1f4a",
        dark: "#520833",
      },
    },
    background: {
      top: "#53083b",
      mid: "#de4139",
      bottom: "#faa61b",
    },
  },

  // Green
  {
    moon: {
      shine: "#f9ed36",
      crater: "#f9ed36",
    },
    mountains: {
      back: {
        light: "#c7dae3",
        dark: "#9bb7c5",
      },
      mid: {
        light: "#5f8616",
        dark: "#507b0b",
      },
      front: {
        light: "#3e630e",
        dark: "#325007",
      },
    },
    background: {
      top: "#819bd9",
      mid: "#74cee0",
      bottom: "#dfedbb",
    },
  },

  // Pastel orange
  {
    moon: {
      shine: "#fffffe",
      crater: "#faf6f8",
    },
    mountains: {
      back: {
        light: "#d8b7d8",
        dark: "#a097c4",
      },
      mid: {
        light: "#8a8fbb",
        dark: "#7a83b8",
      },
      front: {
        light: "#656ea5",
        dark: "#545986",
      },
    },
    background: {
      top: "#e88f77",
      mid: "#f0b3a1",
      bottom: "#ffddd8",
    },
  },

  // Dark
  {
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
      top: "#3023ae",
      mid: "#6b41bf",
      bottom: "#c86dd7",
    },
  },

  // Vaporwave
  {
    moon: {
      shine: "#fff9f3",
      crater: "#eeeeee",
    },
    mountains: {
      back: {
        light: "#9e53fc",
        dark: "#773ff8",
      },
      mid: {
        light: "#799bfb",
        dark: "#7777ff",
      },
      front: {
        light: "#89eafa",
        dark: "#7eccfd",
      },
    },
    background: {
      top: "#8941ff",
      mid: "#f070f9",
      bottom: "#ff71ce",
    },
  },
]

export { randomInt, THEMES, MAX_GRID_SIZE }
