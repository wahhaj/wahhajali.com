var canvas = document.getElementById('gol');
var ctx = canvas.getContext('2d');
// ctx.canvas.width  = window.innerWidth;
// ctx.canvas.height = window.innerHeight;
const colors = ['#1b2947', '#282f51', '#36365a', '#443c63', '#52426b', '#614973', '#704f7b', '#815482', '#935988', '#a55d8d', '#b86291', '#cb6692', '#dd6b93', '#ec7691', '#f18c90', '#f3a195', '#f3b6a0', '#f3c9b2', '#f3dcc7', '#ffeddb'];
const CELL_SIZE = 4;
const CELL_MARGIN = 8;

const numRows = Math.round(canvas.height / (CELL_SIZE + CELL_MARGIN));
const numColumns = Math.round(canvas.width / (CELL_SIZE + CELL_MARGIN));
const numCells = numRows * numColumns;
console.log(numRows, numColumns);


const referenceGrid = [];
const displayGrid = [];

function setupGrids() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      referenceGrid.push({
        row,
        col,
        alive: false
      });

      displayGrid.push({
        row,
        col,
        alive: false,
        size: CELL_SIZE,
        alpha: Math.random() / 2 + 0.5,
        bornAt: -1,
        diedAt: -1
      });
    }
  }
}

setupGrids();

let tickRate = 1; // milliseconds
let cycle = 6; // 5 seconds in tickRate
let step = 0;
let smoothing = 1;

console.log(tickRate, cycle, step);
function drawGrid() {
  //draw the contents of the grid onto a canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height); // this should clear the canvas ahead of each redraw

  for (let i = 0; i < numCells; i++) {
    const cell = displayGrid[i];
    if (i == 4) {
      // console.log(cell.alive, cell.bornAt, cell.diedAt);
    }
    // console.log(cell);

    // if (cell.start >= step) {
    let size
    if (cell.bornAt >= 0) {
      if (step >= cell.bornAt) {
        size = cell.size * ((cell.bornAt - step) / (cell.bornAt + smoothing));
      }
      if (step > cell.bornAt + smoothing) {
        cell.bornAt = -1;
      }
    } else if (cell.diedAt >= 0) {
      if (step >= cell.diedAt) {
        size = cell.size * ((cell.diedAt + smoothing - step) / (cell.diedAt + smoothing));
      }
      if (step > cell.diedAt + smoothing) {
        cell.diedAt = -1;
      }
    } else {
      size = cell.alive ? cell.size : 0;
    }
      // if (cell.bornAt >= 0 && cell.bornAt + 10 >= step) {
      //   //being born
      //   // size = cell.size * ((cell.bornAt - step) / (cell.bornAt + 10));
      // } else if (cell.diedAt >= 0 && cell.diedAt + 10 >= step) {
      //   //dying
      //   // size = cell.size * ((cell.diedAt + 10 - step) / (cell.diedAt + 10));
      // } else {
      //   size = cell.alive ? cell.size : 0;
      // }
      // if (cell.alive) {
        const x = cell.col * (CELL_SIZE + CELL_MARGIN);
        const y = cell.row * (CELL_SIZE + CELL_MARGIN);
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = cell.alpha;
        ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        // // rotate the rect
        ctx.rotate(45 * Math.PI / 180);

        // // draw the rect on the transformed context
        // // Note: after transforming [0,0] is visually [x,y]
        // //       so the rect needs to be offset accordingly when drawn
        ctx.fillRect(-size / 2, -size / 2, size, size);
        // ctx.fill();

        // ctx.fillRect(x, y, cell.size, cell.size);
        ctx.restore();
      // }
    // }
    referenceGrid[i].alive = cell.alive;
  }
  // displayGrid.filter((cell) => cell.alive).forEach((cell, i) => {
  //   // referenceGrid[i].alive = cell.alive;
  //   const x = cell.col * (CELL_SIZE + CELL_MARGIN);
  //   const y = cell.row * (CELL_SIZE + CELL_MARGIN);

  //   let mid = Math.ceil((cell.start + cell.life / 2) / 10) * 10;
  //   let end = cell.start + cell.life;

  //   const isGrowing = step <= mid;
  //   // console.log('step', step, 'start', cell.start, 'life', cell.life, 'mid', mid, 'growing', isGrowing)

  //   let size = cell.size;
  //   if (cell.alive) {
  //     size = Math.min(cell.size, cell.size * ((step - cell.start) / mid))
  //   } else if (cell.dying) {
  //     size = cell.size * ((end - step) / mid);
  //   }
  //   // if (step <= mid) {
  //   //   size = cell.size * ((step - cell.start) / mid)
  //   // } else if (step <= end) {
  //   //   size = cell.size * ((end - step) / mid);
  //   // } else {
  //   //   size = 0;
  //   // }

  //   // size = cell.size;
  //   // let size = cell.size
  //   // if (step > cell.life / 2) {
  //   //   size =
  //   // } else {
  //   //   size = cell.size
  //   // }
  //   // console.log(step, cell.start, cell.life,(step - cell.start) / (cell.life) )
  //   // const size = cell.size * ((step - cell.start) / (cell.life)) //* (  1 / (step - cell.speed));
  //   ctx.save();
  //   ctx.fillStyle = cell.color;
  //   ctx.translate(x + CELL_SIZE / 2, y + CELL_SIZE / 2);
  //   // // rotate the rect
  //   // ctx.rotate(45 * Math.PI / 180);

  //   // // draw the rect on the transformed context
  //   // // Note: after transforming [0,0] is visually [x,y]
  //   // //       so the rect needs to be offset accordingly when drawn
  //   ctx.fillRect(-size / 2, -size / 2, size, size);
  //   // ctx.fill();

  //   // ctx.fillRect(x, y, cell.size, cell.size);
  //   ctx.restore();
  // });
}


function tick() {
  //main loop
  // // console.time('loop');
  // if (step === 0) {
  //   updateGrid();
  //   isGrowing = true;
  // } else if (step === 9) {
  //   isGrowing = false;
  // }
  if (step >= cycle) {
    // console.time('update')
    updateGrid();
    // console.timeEnd('update')
    step = 0;
  }
  // if (isGrowing) {
  step++;
  // } else {
  //   step--;
  // }
  // console.time('drawing');
  drawGrid();
  // console.timeEnd('drawing');
  // if (step === 19) {
    // updateGrid();
  //   step = 0;
  // }
  // console.timeEnd('loop');
  requestAnimationFrame(tick);
  // setTimeout(() => requestAnimationFrame(tick), tickRate);
}

fillPattern(10, 0, [[5, 1], [5, 2], [6, 1], [6, 2], [5, 11], [6, 11], [7, 11], [4, 12], [3, 13], [3, 14], [8, 12], [9, 13], [9, 14], [6, 15], [4, 16], [5, 17], [6, 17], [7, 17], [6, 18], [8, 16], [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25], [3, 35], [4, 35], [3, 36], [4, 36]]);
// fillRandom();
// fillPattern(1, 1, [[0,0], [0,1],[1,0],[1,1]]);

function fillPattern(r0, c0, pattern) {
  pattern.forEach(([r, c]) => {
    referenceGrid[r * numColumns + c].alive = true;
    displayGrid[r * numColumns + c].alive = true;
    // grid[r0 + r][c0 + c].isAlive = true;
  });
}

function fillRandom() {
  grid.forEach(cell => {
    cell.alive = Math.random() < 0.5
  });
  // for (let row = 1; row < numRows - 1; row++) {
  //   for (let col = 1; col < numColumns - 1; col++) {
  //     grid[row][col] = Math.round(Math.random());
  //   }
  // }
}

updateGrid();
tick();

function getNeighbour(cell, dr, dc) {
  let row, col;
  let r0 = cell.row;
  let c0 = cell.col;
  if (r0 < 1 && dr < 0) {
    row = numRows + dr;
  } else if (r0 >= numRows - 1 && dr > 0) {
    row = 0
  } else {
    row = r0 + dr
  }

  if (c0 < 1 && dc < 0) {
    col = numColumns + dc
  } else if (c0 >= numColumns - 1 && dc > 0) {
    col = 0
  } else {
    col = c0 + dc
  }

  return Number(referenceGrid[row * numColumns + col].alive);
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateGrid() {
  //perform one iteration of grid update
  displayGrid.forEach((cell, i) => {
    let totalCells = 0;
    totalCells += getNeighbour(cell, -1, -1);
    totalCells += getNeighbour(cell, -1, 0); //top center
    totalCells += getNeighbour(cell, -1, 1); //top right

    totalCells += getNeighbour(cell, 0, -1); //top left
    totalCells += getNeighbour(cell, 0, 1); //top right

    totalCells += getNeighbour(cell, 1, -1); //bottom left
    totalCells += getNeighbour(cell, 1, 0); //bottom center
    totalCells += getNeighbour(cell, 1, 1); //bottom right

    //apply the rules to each cell
    switch (totalCells) {
      case 2:
        cell.alive = cell.alive;
        // cell.bornAt = -1;
        // cell.diedAt = -1;
        // mirrorGrid[i] = cell;
        // console.error(i)
        break;
      case 3:
        cell.alive = true;
        if (!referenceGrid[i].alive)
          cell.bornAt = randRange(0, 2);
        // let life = randRange(0, (cycle) / tickRate) * tickRate;
        // let start = randRange(0, (cycle - life) / tickRate) * tickRate;
        // // console.log(start, life)
        // mirrorGrid[i].alive = true;
        // mirrorGrid[i].dying = false;
        // mirrorGrid[i].life = life; // between 1 second and cycle
        // mirrorGrid[i].start = start;
        // mirrorGrid[i].color = colors[Math.floor(Math.random()*colors.length)];
        // mirrorGrid[i].speed = (Math.floor(Math.random() * (10)) + 1) * 10;
        // mirrorGrid[row][col].isAlive = true; //live
        // mirrorGrid[row][col].size = randomSize(); //live
        // mirrorGrid[row][col].speed = randomSpeed(); //live

        break;
      default:
        cell.alive = false;
        if (referenceGrid[i].alive) {
          cell.diedAt = randRange(0, 2);
        }
    }
  });

  // [grid, mirrorGrid] = [JSON.parse(JSON.stringify(mirrorGrid)), JSON.parse(JSON.stringify(grid))];
}
