import * as PIXI from "pixi.js"
import GameOfLife from "./game-of-life"
import { CellWithState } from "./types"
import {
  randomInt,
  MAX_GRID_SIZE,
  MAX_CELL_SIZE,
  SIMULATION_FREQUENCY,
} from "./utils"

export default class Stars {
  container: PIXI.Container
  width: number
  height: number

  private game: GameOfLife
  private starPadding: Record<"x" | "y", number>
  private step: number

  constructor(container: PIXI.Container, width: number, height: number) {
    this.container = container
    this.width = width
    this.height = height
    this.step = 0

    this.starPadding = {
      x: 10,
      y: 10,
    }
    this.game = this.createGame()
  }

  tick(delta: number) {
    this.step++

    if (this.step % (60 / SIMULATION_FREQUENCY) === 0) {
      this.game.tick()
    }

    if (this.step % 60 === 0) {
      this.game.insertRandomPattern()
    }

    this.container.removeChildren()
    this.game.cells.forEach((cell) => {
      if (cell.size > 0) {
        this.drawStar(cell)
      }
    })
  }

  private createGame(): GameOfLife {
    let rows, columns

    if (this.width > this.height) {
      columns = Math.min(this.width / this.starPadding.y, MAX_GRID_SIZE)
      this.starPadding.x = this.width / columns
      rows = Math.min(this.height / this.starPadding.x, MAX_GRID_SIZE)
      this.starPadding.y = this.height / rows
    } else {
      rows = Math.min(this.height / this.starPadding.x, MAX_GRID_SIZE)
      this.starPadding.y = this.height / rows
      columns = Math.min(this.width / this.starPadding.y, MAX_GRID_SIZE)
      this.starPadding.x = this.width / columns
    }

    return new GameOfLife(Math.floor(rows), Math.floor(columns), true)
  }

  private drawStar(cell: CellWithState) {
    const cellSprite = new PIXI.Sprite(
      PIXI.Loader.shared.resources.star.texture,
    )

    const size =
      cell.size === MAX_CELL_SIZE && Math.random() < 0.2
        ? randomInt(MAX_CELL_SIZE * 0.5, MAX_CELL_SIZE * 1.5)
        : cell.size

    cellSprite.anchor.set(0.5)
    cellSprite.width = size
    cellSprite.height = size
    cellSprite.x = (cell.col + 0.5) * this.starPadding.x
    cellSprite.y = (cell.row + 0.5) * this.starPadding.y

    this.container.addChild(cellSprite)
  }
}
