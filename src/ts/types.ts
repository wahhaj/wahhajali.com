export interface Cell {
  row: number
  col: number
}

export interface CellWithState extends Cell {
  alive: boolean
  size: number
}

export type Pattern = Cell[]

export interface Theme {
  moon: {
    shine: string
    crater: string
  }
  mountains: {
    back: {
      light: string
      dark: string
    }
    mid: {
      light: string
      dark: string
    }
    front: {
      light: string
      dark: string
    }
  }
  background: {
    top: string
    mid: string
    bottom: string
  }
}
