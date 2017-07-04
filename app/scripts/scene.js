;(function() {
  const canvas = document.getElementById('scene')
  const ctx = canvas.getContext('2d')
  ctx.canvas.width = canvas.offsetWidth
  ctx.canvas.height = canvas.offsetHeight
  ctx.translate(0.5, 0.5) // Fix jagged lines

  const moonRadius = Math.min(canvas.width / 6, canvas.height / 4)

  /**
    * Returns a random integer in the given range.
    * @param {number} min Minimum integer in range
    * @param {number} max Maximum integer in range
  */
  const randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const drawCircle = function(x0, y0, radius, color = '#fff9f3') {
    ctx.beginPath()
    ctx.arc(x0, y0, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
  }

  const drawTriangleR = function(x0, height) {
    const y0 = canvas.height
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x0 + height, y0 - height)
    ctx.lineTo(x0 + height * 2, y0)
    ctx.fill()
  }

  const drawTriangleL = function(x0, height) {
    const y0 = canvas.height
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x0 - height, y0 - height)
    ctx.lineTo(x0 - height * 2, y0)
    ctx.fill()
  }

  const drawMountainRange = function(minHeight, maxHeight, color) {
    // Draw mountain range in two halves, starting from the center + some offset
    // This prevents the moon from being fully obstructed by a large mountain

    const start = canvas.width / 2
    const step = canvas.width / 20

    ctx.fillStyle = color
    // Left half of mountain range
    for (let i = start - moonRadius / 4; i > 0; i -= step) {
      if (Math.random() < 0.8) {
        drawTriangleL(i, randomInt(minHeight, maxHeight))
      }
    }

    // Right half
    for (let j = start + moonRadius / 4; j < canvas.width; j += step) {
      if (Math.random() < 0.8) {
        drawTriangleR(j, randomInt(minHeight, maxHeight))
      }
    }
  }

  // Center of the moon
  const centerX = canvas.width / 2
  const centerY = canvas.height - moonRadius * 0.6

  // Draw moon
  drawCircle(centerX, centerY, moonRadius)
  // Draw moon craters
  drawCircle(centerX - moonRadius * 0.25, centerY - moonRadius * 0.5, moonRadius * 0.25, '#eee')
  drawCircle(centerX - moonRadius * 0.6, centerY, moonRadius * 0.2, '#eee')
  drawCircle(centerX - moonRadius * 0.2, centerY - moonRadius * 0.05, moonRadius * 0.12, '#eee')
  drawCircle(centerX + moonRadius * 0.5, centerY - moonRadius * 0.55, moonRadius * 0.15, '#eee')
  drawCircle(centerX + moonRadius * 0.8, centerY - moonRadius * 0.2, moonRadius * 0.08, '#eee')
  drawCircle(centerX + moonRadius * 0.65, centerY + moonRadius * 0.15, moonRadius * 0.2, '#eee')

  // Three 'layers' of mountains to simulate depth
  drawMountainRange(moonRadius * 0.8, moonRadius * 1.5, '#235a93')
  drawMountainRange(moonRadius * 0.6, moonRadius * 1, '#003265')
  drawMountainRange(moonRadius * 0.2, moonRadius * 0.8, '#0a1832')
})()
