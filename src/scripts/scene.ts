import * as PIXI from "pixi.js"
import { THEMES, randomInt } from "./utils"
import { Theme } from "./types"

export default class Scene {
  container: PIXI.Container
  width: number
  height: number
  theme: Theme
  moonRadius: number

  constructor(
    container: PIXI.Container,
    width: number,
    height: number,
    theme: Theme,
  ) {
    this.container = container
    this.width = width
    this.height = height
    this.theme = theme

    this.moonRadius = Math.min(width / 6, height / 4)
    this.drawMoon()

    this.drawMountainRange(
      this.moonRadius * 2.5,
      this.moonRadius * 4,
      this.theme.mountains.back.light,
      this.theme.mountains.back.dark,
    )
    this.drawMountainRange(
      this.moonRadius * 1.5,
      this.moonRadius * 2.5,
      this.theme.mountains.mid.light,
      this.theme.mountains.mid.dark,
    )
    this.drawMountainRange(
      this.moonRadius * 1,
      this.moonRadius * 2,
      this.theme.mountains.front.light,
      this.theme.mountains.front.dark,
      1.0,
    )
  }

  private drawMoon() {
    // Center of the moon
    const centerX = this.width / 2
    const centerY = this.height - this.moonRadius * 0.6

    // Draw the moon
    this.drawCircle(centerX, centerY, this.moonRadius, this.theme.moon.shine)

    // Draw moon craters
    this.drawCircle(
      centerX - this.moonRadius * 0.25,
      centerY - this.moonRadius * 0.5,
      this.moonRadius * 0.25,
    )
    this.drawCircle(
      centerX - this.moonRadius * 0.6,
      centerY,
      this.moonRadius * 0.2,
    )
    this.drawCircle(
      centerX - this.moonRadius * 0.2,
      centerY - this.moonRadius * 0.05,
      this.moonRadius * 0.12,
    )
    this.drawCircle(
      centerX + this.moonRadius * 0.5,
      centerY - this.moonRadius * 0.55,
      this.moonRadius * 0.15,
    )
    this.drawCircle(
      centerX + this.moonRadius * 0.8,
      centerY - this.moonRadius * 0.2,
      this.moonRadius * 0.08,
    )
    this.drawCircle(
      centerX + this.moonRadius * 0.65,
      centerY + this.moonRadius * 0.15,
      this.moonRadius * 0.2,
    )
  }

  /**
   * Draw mountain range in two halves, starting from the center + offset based on moon radius
   * Prevents the moon from being fully obstructed by a large mountain
   *
   * @param minWidth Minimum width of each mountain in the range
   * @param maxWidth Maximum width of each mountain in the range
   * @param lightColor Color of the mountain side facing the moon
   * @param darkColor Color of the mountain side away from the moon
   * @param probability Probability of a mountain spawning at each step
   */
  private drawMountainRange(
    minWidth: number,
    maxWidth: number,
    lightColor: string,
    darkColor: string,
    probability: number = 0.8,
  ) {
    const center = this.width / 2
    const step = this.width / 20

    // Mountain range half to the left of the moon
    for (let i = center - this.moonRadius / 4; i > 0; i -= step) {
      if (Math.random() < probability) {
        this.drawMountain(
          i - randomInt(minWidth, maxWidth),
          i,
          darkColor,
          lightColor,
        )
      }
    }

    // Mountain range half to the right of the moon
    for (let i = center + this.moonRadius / 4; i < this.width; i += step) {
      if (Math.random() < probability) {
        this.drawMountain(
          i,
          i + randomInt(minWidth, maxWidth),
          lightColor,
          darkColor,
        )
      }
    }
  }

  /**
   * @param x The X coordinate of the center of the circle
   * @param y The Y coordinate of the center of the circle
   * @param radius The radius of the circle
   * @param color The color of the circle
   */
  private drawCircle(
    x: number,
    y: number,
    radius: number,
    color: string = this.theme.moon.crater,
  ) {
    this.container.addChild(
      new PIXI.Graphics()
        .beginFill(PIXI.utils.string2hex(color))
        .drawCircle(x, y, radius)
        .endFill(),
    )
  }

  /**
   * @param xLeft The X coordinate of the left corner of the mountain
   * @param xRight The X coordinate of the right corner of the mountain
   * @param cLeft The color of the left side of the mountain
   * @param cRight The color of the right side of the mountain
   */
  private drawMountain(
    xLeft: number,
    xRight: number,
    cLeft: string,
    cRight: string,
  ) {
    const width = xRight - xLeft
    const center = xLeft + width / 2

    const yBottom = this.height
    const yTop = this.height - width / 2

    this.container.addChild(
      new PIXI.Graphics()
        .beginFill(PIXI.utils.string2hex(cLeft))
        .drawPolygon([xLeft, yBottom, center, yBottom, center, yTop])
        .endFill()
        .beginFill(PIXI.utils.string2hex(cRight))
        .drawPolygon([xRight, yBottom, center, yBottom, center, yTop])
        .endFill(),
    )
  }
}
