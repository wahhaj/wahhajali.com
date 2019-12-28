import { List } from "immutable"
import { Cell, CellWithState } from "./types"
import patterns from "./patterns"
import { randomInt, MAX_CELL_SIZE } from "./utils"

export default class GameOfLife {
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
            size: 0,
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

        if (cell.alive && cell.size < MAX_CELL_SIZE) {
          cells.setIn([i, "size"], cell.size + randomInt(1, 3))
        } else if (!cell.alive && cell.size > 0) {
          cells.setIn([i, "size"], cell.size - randomInt(1, 3))
        }
      })
    })
  }

  insertRandomPattern() {
    const pattern = patterns[randomInt(0, patterns.length - 1)]
    const cell: Cell = {
      row: randomInt(0, this.rows - 1),
      col: randomInt(0, this.columns - 1),
    }

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
