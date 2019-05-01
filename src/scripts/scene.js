import { randomInt } from './utils'

const canvas = document.getElementById('scene')
const ctx = canvas.getContext('2d')
ctx.canvas.width = canvas.offsetWidth
ctx.canvas.height = canvas.offsetHeight
ctx.translate(0.5, 0.5) // Fix jagged lines

let moonRadius = Math.min(canvas.width / 6, canvas.height / 4)

const colors = {
  moon: '#fff9f3',
  crater: '#eee',
  mountains: {
    back: {
      light: '#2763a2',
      dark: '#235a93',
    },
    mid: {
      light: '#00376f',
      dark: '#003265',
    },
    front: {
      light: '#0b1a37',
      dark: '#0a1832',
    },
  },
}

const drawCircle = function(x0, y0, radius, color = colors.crater) {
  ctx.beginPath()
  ctx.arc(x0, y0, radius, 0, 2 * Math.PI, false)
  ctx.fillStyle = color
  ctx.fill()
}

const drawTriangleR = function(x0, height, colors) {
  const y0 = canvas.height
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x0 + height + 1, y0 - height)
  ctx.lineTo(x0 + height + 1, y0)
  ctx.fillStyle = colors.light
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x0 + height, y0)
  ctx.lineTo(x0 + height, y0 - height)
  ctx.lineTo(x0 + height * 2, y0)
  ctx.fillStyle = colors.dark
  ctx.fill()
}

const drawTriangleL = function(x0, height, colors) {
  const y0 = canvas.height
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x0 - height - 1, y0 - height)
  ctx.lineTo(x0 - height - 1, y0)
  ctx.fillStyle = colors.light
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x0 - height, y0)
  ctx.lineTo(x0 - height, y0 - height)
  ctx.lineTo(x0 - height * 2, y0)
  ctx.fillStyle = colors.dark
  ctx.fill()
}

const drawMountainRange = function(minHeight, maxHeight, colors, probability = 0.8) {
  // Draw mountain range in two halves, starting from the center + some offset
  // This prevents the moon from being fully obstructed by a large mountain

  const start = canvas.width / 2
  const step = canvas.width / 20

  // Left half of mountain range
  for (let i = start - moonRadius / 4; i > 0; i -= step) {
    if (Math.random() < probability) {
      drawTriangleL(i, randomInt(minHeight, maxHeight), colors)
    }
  }

  // Right half
  for (let j = start + moonRadius / 4; j < canvas.width; j += step) {
    if (Math.random() < probability) {
      drawTriangleR(j, randomInt(minHeight, maxHeight), colors)
    }
  }
}

const draw = function() {
  moonRadius = Math.min(canvas.width / 6, canvas.height / 4)

  // Center of the moon
  const centerX = canvas.width / 2
  const centerY = canvas.height - moonRadius * 0.6

  // Draw moon
  drawCircle(centerX, centerY, moonRadius, colors.moon)
  // Draw moon craters
  drawCircle(centerX - moonRadius * 0.25, centerY - moonRadius * 0.5, moonRadius * 0.25)
  drawCircle(centerX - moonRadius * 0.6, centerY, moonRadius * 0.2)
  drawCircle(centerX - moonRadius * 0.2, centerY - moonRadius * 0.05, moonRadius * 0.12)
  drawCircle(centerX + moonRadius * 0.5, centerY - moonRadius * 0.55, moonRadius * 0.15)
  drawCircle(centerX + moonRadius * 0.8, centerY - moonRadius * 0.2, moonRadius * 0.08)
  drawCircle(centerX + moonRadius * 0.65, centerY + moonRadius * 0.15, moonRadius * 0.2)

  // Three 'layers' of mountains to simulate depth
  drawMountainRange(moonRadius * 0.8, moonRadius * 1.5, colors.mountains.back)
  drawMountainRange(moonRadius * 0.6, moonRadius * 1, colors.mountains.mid)
  drawMountainRange(moonRadius * 0.2, moonRadius * 0.8, colors.mountains.front, 1.0)
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.canvas.width = canvas.offsetWidth
  ctx.canvas.height = canvas.offsetHeight
  draw()
})

export { draw as drawScene }
