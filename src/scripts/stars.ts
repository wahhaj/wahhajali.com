import * as PIXI from "pixi.js"
import GameOfLife from "./game-of-life"
import { Cell } from "./types"
import { randomInt, MAX_GRID_SIZE } from "./utils"

export default class Stars {
  container: PIXI.Container
  width: number
  height: number

  private game!: GameOfLife
  private starPadding!: Record<"x" | "y", number>
  private step: number

  constructor(container: PIXI.Container, width: number, height: number) {
    this.container = container
    this.width = width
    this.height = height
    this.step = 0
    this.initializeGame()
  }

  tick(delta: number) {
    this.game.tick()

    this.step++
    if (this.step % 60 === 0) {
      this.game.insertRandomPattern()
      this.step = 0
    }

    this.container.removeChildren()
    this.game.cells.forEach((cell) => {
      if (cell.alive) {
        this.drawStar(cell)
      }
    })
  }

  private initializeGame() {
    this.starPadding = {
      x: 10,
      y: 10,
    }

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

    this.game = new GameOfLife(Math.floor(rows), Math.floor(columns), true)
  }

  private drawStar({ row, col }: Cell) {
    const size = randomInt(3, 6)

    const cellSprite = new PIXI.Sprite(
      PIXI.Loader.shared.resources.star.texture,
    )
    cellSprite.anchor.set(0.5)
    cellSprite.width = size
    cellSprite.height = size
    cellSprite.x = (col + 0.5) * this.starPadding.x
    cellSprite.y = (row + 0.5) * this.starPadding.y

    this.container.addChild(cellSprite)
  }
}
