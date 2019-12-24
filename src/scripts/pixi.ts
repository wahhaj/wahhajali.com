import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"
import { Cell } from "./types"
import GameOfLife from "./game-of-life"

const width = window.innerWidth
const height = window.innerHeight
const game = new GameOfLife(80, 80, true)
const app = new PIXI.Application({
  transparent: false,
  antialias: true,
  width,
  height,
  view: <HTMLCanvasElement>document.querySelector("#game"),
  resolution: devicePixelRatio,
})
const stars = new PIXI.Container()
const loader = PIXI.Loader.shared

const crt = new CRTFilter({
  time: 5,
  vignetting: 0,
})

// app.stage.filters = [crt]

const drawBackground = () => {
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
  app.stage.addChild(bg)
}

const drawCell: (cell: Cell) => void = ({ row, col }) => {
  const size = Math.floor(Math.random() * (5 - 1 + 1)) + 1

  const cellSprite = new PIXI.Sprite(loader.resources.star.texture)
  cellSprite.anchor.set(0.5)
  cellSprite.width = size
  cellSprite.height = size
  cellSprite.x = col * 10
  cellSprite.y = row * 10

  stars.addChild(cellSprite)
}

const tick: (delta: number) => void = (delta) => {
  stars.removeChildren()
  game.tick()
  game.cells.forEach((cell) => {
    if (cell.alive) {
      drawCell(cell)
    }
  })

  // crt.seed = Math.random()
  // crt.time = crt.time + 0.5
}

const initialize = () => {
  game.tick()

  drawBackground()
  loader.add("star", "images/star.png")
  loader.load(() => {
    app.stage.addChild(stars)
    app.ticker.add((delta: number) => tick(delta))
  })
}

export default initialize
