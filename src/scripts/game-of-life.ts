import { List } from "immutable"
import { Cell, CellWithState, Patterns } from "./types"
import patterns from "./patterns"

class GameOfLife {
  cells: List<CellWithState>
  rows: number
  columns: number

  constructor(rows: number, columns: number, randomizeInitialState = false) {
    this.rows = rows
    this.columns = columns

    this.cells = List<CellWithState>().withMutations((cells) => {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          cells.push({
            row,
            col,
            alive: randomizeInitialState ? Math.random() < 0.1 : false,
          })
        }
      }
    })
  }

  tick() {
    this.cells = this.cells.withMutations((cells) => {
      cells.forEach((cell, i) => {
        const liveNeighbours = this.countLivingNeighbours(cell)
        if (liveNeighbours === 3) {
          cells.setIn([i, "alive"], true)
        } else if (liveNeighbours !== 2) {
          cells.setIn([i, "alive"], false)
        }
      })
    })
  }

  insertPatternAtCell(patternName: keyof Patterns, cell: Cell) {
    const pattern = patterns[patternName]

    this.cells = this.cells.withMutations((cells) => {
      pattern.forEach(({ row, col }) => {
        const i = this.cellIndex({
          row: cell.row + row,
          col: cell.col + col,
        })

        cells.setIn([i, "alive"], true)
      })
    })
  }

  setCellAlive(cell: Cell, alive: boolean) {
    const i = this.cellIndex(cell)
    this.cells.setIn([i, "alive"], alive)
  }

  toString(): string {
    return this.cells
      .map(
        (cell) =>
          (cell.alive ? "x" : ".") +
          (cell.col === this.columns - 1 ? "\n" : ""),
      )
      .join(" ")
  }

  private countLivingNeighbours(cell: Cell): number {
    let count = 0

    const neighbours = [
      [-1, -1],
      [-1, 0],
      [-1, +1],

      [0, -1],
      [0, +1],

      [+1, -1],
      [+1, 0],
      [+1, 1],
    ]

    neighbours.forEach(([neighbourRow, neighbourCol]) => {
      const i = this.cellIndex({
        row: cell.row + neighbourRow,
        col: cell.col + neighbourCol,
      })

      count += this.cells.getIn([i, "alive"])
    })

    return count
  }

  private cellIndex(cell: Cell) {
    let row = cell.row
    let col = cell.col

    if (cell.row < 0) {
      // If cell row is negative, wrap around from last row
      row = this.rows + cell.row
    } else if (row >= this.rows) {
      // If cell row is heigher than rows in grid, wrap around from first row
      row = cell.row - this.rows
    }

    if (cell.col < 0) {
      // If cell col is negative, wrap around from last column
      col = this.columns + col
    } else if (cell.col >= this.columns) {
      // If cell col is higher than columns in grid, wrap around from first column
      col = cell.col - this.columns
    }

    return row * this.columns + col
  }
}

export default GameOfLife
