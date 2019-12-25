import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"
import { Cell } from "./types"
import GameOfLife from "./game-of-life"
import { randomInt } from "./utils"

const width = window.innerWidth
const height = window.innerHeight

export default class PixiApp {
  private app: PIXI.Application
  private loader: PIXI.Loader
  private crt: CRTFilter

  private game!: GameOfLife
  private starPadding!: Record<"x" | "y", number>
  private stars: PIXI.Container
  private step: number

  constructor() {
    this.app = new PIXI.Application({
      transparent: false,
      antialias: true,
      width,
      height,
      view: <HTMLCanvasElement>document.querySelector("#game"),
      resolution: devicePixelRatio,
    })
    this.drawBackground()

    this.loader = PIXI.Loader.shared
    this.loader.add("star", "images/star.png")

    this.stars = new PIXI.Container()
    this.app.stage.addChild(this.stars)

    this.initializeGame()
    this.step = 0
    this.loader.load(() => {
      this.app.ticker.add((delta: number) => this.tick(delta))
    })

    this.crt = new CRTFilter({
      // time: 5,
      // vignetting: 0,
      noise: 0.1,
      vignettingAlpha: 0.3,
    })

    this.app.stage.filters = [this.crt]
  }

  private tick(delta: number) {
    this.step++
    this.game.tick()

    this.stars.removeChildren()
    this.game.cells.forEach((cell) => {
      if (cell.alive) {
        this.drawStar(cell)
      }
    })

    if (this.step % 60 === 0) {
      this.game.insertRandomPattern()
      this.step = 0
    }

    // this.crt.seed = Math.random()
    this.crt.time = this.crt.time + 0.5
  }

  private initializeGame() {
    this.starPadding = {
      x: 10,
      y: 10,
    }

    let rows, columns

    if (width > height) {
      columns = Math.min(width / this.starPadding.y, 60)
      this.starPadding.x = width / columns
      rows = Math.min(height / this.starPadding.x, 60)
      this.starPadding.y = height / rows
    } else {
      rows = Math.min(height / this.starPadding.x, 60)
      this.starPadding.y = height / rows
      columns = Math.min(width / this.starPadding.y, 60)
      this.starPadding.x = width / columns
    }

    this.game = new GameOfLife(Math.floor(rows), Math.floor(columns), true)
    console.log(this.game.toString())
  }

  private drawBackground() {
    const quality = 512
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = quality

    const ctx = canvas.getContext("2d")!

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 0, quality)
    grd.addColorStop(0, "#8941ff")
    grd.addColorStop(0.5, "#f070f9")
    grd.addColorStop(1, "#ff71ce")

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, 1, quality)

    const bg = new PIXI.Sprite(PIXI.Texture.from(canvas))
    bg.position.set(0, 0)
    bg.width = width
    bg.height = height

    this.app.stage.addChild(bg)
  }

  private drawStar({ row, col }: Cell) {
    const size = randomInt(3, 6)

    const cellSprite = new PIXI.Sprite(this.loader.resources.star.texture)
    cellSprite.anchor.set(0.5)
    cellSprite.width = size
    cellSprite.height = size
    cellSprite.x = (col + 0.5) * this.starPadding.x
    cellSprite.y = (row + 0.5) * this.starPadding.y

    this.stars.addChild(cellSprite)
  }
}
