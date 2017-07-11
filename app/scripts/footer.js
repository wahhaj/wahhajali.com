;(function() {
  const canvas = document.getElementById('footer')
  const ctx = canvas.getContext('2d')
  ctx.canvas.width = canvas.offsetWidth
  ctx.canvas.height = canvas.offsetHeight
  ctx.translate(0.5, 0.5) // Fix jagged lines

  const colors = {
    back: {
      light: '#2763a2',
      dark: '#235a93'
    },
    mid: {
      light: '#00376f',
      dark: '#003265'
    },
    front: {
      light: '#0b1a37',
      dark: '#0a1832'
    }
  }
  /**
    * Returns a random integer in the given range.
    * @param {number} min Minimum integer in range
    * @param {number} max Maximum integer in range
  */
  const randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
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
    const start = canvas.width / 2
    const step = canvas.width / 20

    // Left half of mountain range
    for (let i = start + maxHeight; i > 0; i -= step) {
      if (Math.random() < probability) {
        drawTriangleL(i, randomInt(minHeight, maxHeight), colors)
      }
    }

    // Right half
    for (let j = start - maxHeight; j < canvas.width; j += step) {
      if (Math.random() < probability) {
        drawTriangleR(j, randomInt(minHeight, maxHeight), colors)
      }
    }
  }

  const baseHeight = canvas.height

  // Three 'layers' of mountains to simulate depth
  drawMountainRange(baseHeight * 0.8, baseHeight * 1, colors.back)
  drawMountainRange(baseHeight * 0.6, baseHeight * 0.8, colors.mid)
  drawMountainRange(baseHeight * 0.2, baseHeight * 0.6, colors.front, 1.0)
})()
