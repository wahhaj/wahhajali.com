export interface Cell {
  row: number
  col: number
}

export interface CellWithState extends Cell {
  alive: boolean
}

export type Pattern = Cell[]
