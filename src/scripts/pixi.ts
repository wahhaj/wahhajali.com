import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"
import Stars from "./stars"
import Scene from "./scene"
import { colors } from "./utils"

const width = window.innerWidth
const height = window.innerHeight

export default class PixiApp {
  private app: PIXI.Application
  private crt: CRTFilter

  private stars: Stars
  private scene: Scene

  constructor() {
    this.app = new PIXI.Application({
      transparent: false,
      antialias: true,
      width,
      height,
      view: <HTMLCanvasElement>document.querySelector("#pixi"),
      resolution: devicePixelRatio,
    })
    this.drawBackground()

    this.crt = new CRTFilter({
      noise: 0.1,
      // vignetting: 0,
      vignettingAlpha: 0.4,
    })

    // this.app.stage.filters = [this.crt]

    const starsContainer = new PIXI.Container()
    this.app.stage.addChild(starsContainer)
    this.stars = new Stars(starsContainer, width, height)

    const sceneContainer = new PIXI.Container()
    this.app.stage.addChild(sceneContainer)
    this.scene = new Scene(sceneContainer, width, height)

    PIXI.Loader.shared.load(() => {
      this.app.ticker.add((delta: number) => this.tick(delta))
    })
  }

  private tick(delta: number) {
    this.stars.tick(delta)

    // this.crt.seed = Math.random()
    // this.crt.time = this.crt.time + 0.5
  }

  private drawBackground() {
    const quality = 512
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = quality

    const ctx = canvas.getContext("2d")!

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 0, quality)
    grd.addColorStop(0, colors.background.top)
    grd.addColorStop(0.5, colors.background.mid)
    grd.addColorStop(1, colors.background.bottom)

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, 1, quality)

    const bg = new PIXI.Sprite(PIXI.Texture.from(canvas))
    bg.position.set(0, 0)
    bg.width = width
    bg.height = height

    this.app.stage.addChild(bg)
  }
}
