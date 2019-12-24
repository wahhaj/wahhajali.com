import { Patterns } from "./types"

const patterns: Patterns = {
  acorn: [
    { row: 0, col: 1 },
    { row: 1, col: 3 },
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 4 },
    { row: 2, col: 5 },
    { row: 2, col: 6 },
  ],

  blinker: [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],

  chaotic: [
    { row: 0, col: 12 },
    { row: 1, col: 12 },
    { row: 2, col: 12 },
    { row: 1, col: 6 },
    { row: 2, col: 7 },
    { row: 0, col: 8 },
    { row: 1, col: 8 },
    { row: 2, col: 8 },
  ],

  glider: [
    { row: 1, col: 0 },
    { row: 2, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],

  spaceship: [
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    { row: 1, col: 0 },
    { row: 1, col: 3 },
    { row: 2, col: 3 },
    { row: 3, col: 3 },
    { row: 4, col: 3 },
    { row: 5, col: 0 },
    { row: 5, col: 2 },
  ],
}

export default patterns
