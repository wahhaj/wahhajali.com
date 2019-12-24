export interface Cell {
  row: number
  col: number
}

export interface CellWithState extends Cell {
  alive: boolean
}

export interface Patterns {
  acorn: Cell[]
  blinker: Cell[]
  chaotic: Cell[]
  glider: Cell[]
  spaceship: Cell[]
}
