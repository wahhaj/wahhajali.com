import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"
import { GlitchFilter } from "@pixi/filter-glitch"

import Stars from "./stars"
import Scenery from "./scenery"
import { THEMES, GLITCH_PROBABILITY, randomInt } from "./utils"
import { Theme } from "./types"

export default class PixiApp {
  private app: PIXI.Application
  private width: number
  private height: number
  private theme: Theme

  private containers: {
    background: PIXI.Container
    stars: PIXI.Container
    scenery: PIXI.Container
  }

  private backgroundGradient: PIXI.Texture
  private stars!: Stars

  private filters: {
    enabled: boolean
    crt: CRTFilter
    glitch: GlitchFilter
  }

  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    const domEl = <HTMLCanvasElement>document.querySelector("#pixi")
    this.app = new PIXI.Application({
      transparent: false,
      antialias: true,
      width: this.width,
      height: this.height,
      view: domEl,
      resizeTo: domEl,
      resolution: devicePixelRatio,
    })

    this.containers = {
      background: new PIXI.Container(),
      stars: new PIXI.Container(),
      scenery: new PIXI.Container(),
    }
    this.app.stage.addChild(this.containers.background)
    this.app.stage.addChild(this.containers.stars)
    this.app.stage.addChild(this.containers.scenery)

    // this.theme = THEMES[2]
    this.theme = THEMES[randomInt(0, THEMES.length - 1)]
    this.backgroundGradient = this.getBackgroundGradientTexture()
    PIXI.Loader.shared.add("star", "images/star.png")

    this.drawBackground()
    this.drawScenery()
    this.drawStars()

    PIXI.Loader.shared.load(() => {
      domEl.classList.add("loaded")
      this.app.ticker.add((delta: number) => this.tick(delta))
    })

    window.addEventListener("resize", () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.app.resize()

      this.drawBackground()
      this.drawScenery()
      this.drawStars()
    })

    this.filters = {
      enabled: Math.random() < GLITCH_PROBABILITY,
      crt: new CRTFilter(),
      glitch: new GlitchFilter(),
    }

    if (this.filters.enabled) {
      this.filters.glitch.fillMode = 4
      this.filters.glitch.red = new PIXI.Point(0, 0)
      this.filters.glitch.green = new PIXI.Point(0, 0)
      this.filters.glitch.blue = new PIXI.Point(0, 0)

      this.app.stage.filters = [this.filters.glitch, this.filters.crt]
    }
  }

  private tick(delta: number) {
    this.stars.tick(delta)

    if (this.filters.enabled) {
      this.filters.crt.seed = Math.random()
      this.filters.crt.time = this.filters.crt.time + 0.5 * delta

      if (Math.random() < 0.05) {
        this.filters.glitch.direction = randomInt(0, 180)
        this.filters.glitch.slices = randomInt(0, 10)

        this.filters.glitch.red = new PIXI.Point(
          randomInt(-10, 10),
          randomInt(-10, 10),
        )
        this.filters.glitch.green = new PIXI.Point(
          randomInt(-10, 10),
          randomInt(-10, 10),
        )
        this.filters.glitch.blue = new PIXI.Point(
          randomInt(-10, 10),
          randomInt(-10, 10),
        )
      }
    }
  }

  private drawBackground() {
    const bg = new PIXI.Sprite(this.backgroundGradient)
    bg.position.set(0, 0)
    bg.width = this.width
    bg.height = this.height

    this.containers.background.removeChildren()
    this.containers.background.addChild(bg)
  }

  private drawScenery() {
    this.containers.scenery.removeChildren()
    new Scenery(this.containers.scenery, this.width, this.height, this.theme)
  }

  private drawStars() {
    this.containers.stars.removeChildren()
    this.stars = new Stars(this.containers.stars, this.width, this.height)
  }

  private getBackgroundGradientTexture(): PIXI.Texture {
    const quality = 512
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = quality

    const ctx = canvas.getContext("2d")!

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 0, quality)
    grd.addColorStop(0, this.theme.background.top)
    grd.addColorStop(0.5, this.theme.background.mid)
    grd.addColorStop(1, this.theme.background.bottom)

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, 1, quality)

    return PIXI.Texture.from(canvas)
  }
}
