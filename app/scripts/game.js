;(function() { // eslint-disable-line
  const canvas = document.getElementById('game')
  const ctx = canvas.getContext('2d')
  ctx.canvas.width = canvas.offsetWidth
  ctx.canvas.height = canvas.offsetHeight
  ctx.translate(0.5, 0.5) // Fix jagged lines
  ctx.fillStyle = '#fff'
  ctx.globalAlpha = 0.9

  const CELL_SIZE = 2
  const CELL_MARGIN = 8

  const numRows = Math.floor(canvas.height / (CELL_SIZE + CELL_MARGIN))
  const numColumns = Math.floor(canvas.width / (CELL_SIZE + CELL_MARGIN))

  const CYCLE = 6
  const SMOOTHING_FACTOR = 2

  let step = 0
  let generation = 0
  const grid = []
  const isAlive = []

  const randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const setupGrids = function() {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        isAlive.push(false)

        grid.push({
          alive: false,
          row,
          col,
          x: col * (CELL_SIZE + CELL_MARGIN),
          y: row * (CELL_SIZE + CELL_MARGIN),
          size: randomInt(CELL_SIZE * 0.5, CELL_SIZE * 1.2),
          bornAt: -1,
          diedAt: -1
        })
      }
    }
  }

  /**
    * Returns the index of cell at (r0, c0) in the grid array.
    * Wraps rows and columns around from one end to another when
    * trying to access a cell outside the grid bounds.
  */
  const getWrappedIndex = function(r0, c0) {
    let row = r0
    let col = c0

    if (r0 < 0) {
      // If row is negative, wrap around to last row.
      row = numRows + r0
    } else if (r0 >= numRows) {
      // If row is higher than numRows, wrap around from first row.
      row = r0 - numRows
    }

    if (c0 < 0) {
      // If col is negative, wrap around to last column.
      col = numColumns + c0
    } else if (c0 >= numColumns) {
      // If col is higher than numColumns, wrap around from first column.
      col = c0 - numColumns
    }

    // convert (row, col) coord to index in grid array
    return row * numColumns + col
  }

  const updateGrid = function() {
    generation++

    grid.forEach((cell, i) => {
      // Check neighbour in each direction to get number of living neighbours
      let liveNeighbours = 0
      liveNeighbours += isAlive[getWrappedIndex(cell.row - 1, cell.col - 1)] //top left
      liveNeighbours += isAlive[getWrappedIndex(cell.row - 1, cell.col)] //top center
      liveNeighbours += isAlive[getWrappedIndex(cell.row - 1, cell.col + 1)] //top right

      liveNeighbours += isAlive[getWrappedIndex(cell.row, cell.col - 1)] //middle left
      liveNeighbours += isAlive[getWrappedIndex(cell.row, cell.col + 1)] //middle left

      liveNeighbours += isAlive[getWrappedIndex(cell.row + 1, cell.col - 1)] //bottom left
      liveNeighbours += isAlive[getWrappedIndex(cell.row + 1, cell.col)] //bottom center
      liveNeighbours += isAlive[getWrappedIndex(cell.row + 1, cell.col + 1)] //bottom right

      if (liveNeighbours === 2) {
        // With 2 living neighbours, cell keeps its state
        cell.alive = cell.alive
      } else if (liveNeighbours === 3) {
        // With 3 living neighbours, cell becomes alive if it wasn't already
        cell.alive = true
        if (!isAlive[i]) {
          cell.bornAt = randomInt(0, SMOOTHING_FACTOR)
          cell.diedAt = -1
        }
      } else {
        // Otherwise cell dies
        cell.alive = false
        if (isAlive[i]) {
          cell.bornAt = -1
          cell.diedAt = randomInt(0, SMOOTHING_FACTOR)
        }
      }
    })
  }

  const drawGrid = function() {
    // Clear the canvas to start
    ctx.clearRect(-1, -1, canvas.width, canvas.height)

    for (let i = 0; i < numRows * numColumns; i++) {
      const cell = grid[i]
      isAlive[i] = cell.alive

      let size = cell.alive ? cell.size : 0
      if (cell.bornAt >= 0) {
        if (step >= cell.bornAt) {
          size = cell.size * ((cell.bornAt - step) / (cell.bornAt + SMOOTHING_FACTOR))
        }
        if (step > cell.bornAt + SMOOTHING_FACTOR) {
          cell.bornAt = -1
        }
      } else if (cell.diedAt >= 0) {
        if (step >= cell.diedAt) {
          size = cell.size * ((cell.diedAt + SMOOTHING_FACTOR - step) / (cell.diedAt + SMOOTHING_FACTOR))
        }
        if (step > cell.diedAt + SMOOTHING_FACTOR) {
          cell.diedAt = -1
        }
      }

      ctx.save()
      ctx.translate(cell.x + CELL_SIZE / 2, cell.y + CELL_SIZE / 2)
      ctx.rotate(45 * Math.PI / 180)
      ctx.fillRect(-size / 2, -size / 2, size, size)
      ctx.restore()
    }
  }

  const tick = function() {
    drawGrid()
    step++

    if (step >= CYCLE) {
      updateGrid()
      step = 0
    }

    // Spawn a random pattern at regular intervals so that game is always evolving
    if (generation % 40 === 0 && step === 0) {
      fillPattern(randomInt(0, numRows), randomInt(0, numColumns), ...patterns[randomInt(0, patterns.length - 1)])
    }

    requestAnimationFrame(tick)
  }

  const patterns = [
    // Glider
    [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]],

    // Spaceship
    [[0, 1], [0, 2], [0, 3], [1, 0], [1, 3], [2, 3], [3, 3], [4, 3], [5, 0], [5, 2]],

    // Gosper glider gun
    [[5, 1], [5, 2], [6, 1], [6, 2], [5, 11], [6, 11], [7, 11], [4, 12], [3, 13], [3, 14],
      [8, 12], [9, 13], [9, 14], [6, 15], [4, 16], [5, 17], [6, 17], [7, 17], [6, 18], [8, 16],
      [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25],
      [6, 25], [7, 25], [3, 35], [4, 35], [3, 36], [4, 36]],

    // Chaotic
    [[0, 12], [1, 12], [2, 12], [1, 6], [2, 7], [0, 8], [1, 8], [2, 8]],
  ]

  const fillPattern = function(r0, c0, ...pattern) {
    pattern.forEach(([r, c]) => {
      const i = getWrappedIndex(r0 + r, c0 + c)
      grid[i].alive = true
      isAlive[i] = true
    })
  }

  const fillRandom = function() {
    for (let i = 0; i < numRows * numColumns; i++) {
      if (Math.random() < 0.1) { // 10% chance of each cell being alive
        grid[i].alive = true
        isAlive[i] = true
      }
    }
  }

  const init = function() {
    setupGrids()
    fillRandom()
    updateGrid()
    tick()
  }

  init()
})()
