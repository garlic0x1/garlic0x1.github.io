let onBoard = (i, size) => (i >= 0 && i < size)
let boardHeight = () => Board.length
let boardWidth = () => Board[0].length

let countLive = (row, col) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i == 0 && j == 0) &&
        onBoard(row + i, boardWidth()) &&
        onBoard(col + j, boardHeight()) &&
        Board[row + i][col + j])
        count++;
    }
  }
  return count;
}

let gameStep = () => {
  let next = [];
  for (let i = 0; i < boardHeight(); i++) {
    next.push([]);
    for (let j = 0; j < boardWidth(); j++) {
      let c = countLive(i, j)
      if (Board[i][j]) {
        next[i].push((c == 2 || c == 3))
      } else {
        next[i].push((c == 3))
      }
    }
  }
  return next;
}

let buildTile = (live, i, j) => {
  let tile = document.createElement("div")
  tile.classList.add("tile")
  tile.addEventListener("click", (event) => {
    Board[i][j] = !Board[i][j]
    displayBoard()
  })
  if (live) {
    tile.classList.add("live")
  } else {
    tile.classList.add("dead")
  }
  return tile
}

let buildRow = (row, i) => {
  let rowBox = document.createElement("div")
  rowBox.classList.add("game-row")
  row.forEach((col, j) => rowBox.appendChild(buildTile(col, i, j)))
  return rowBox
}

let buildBoard = () => {
  let boardBox = document.createElement("div")
  boardBox.classList.add("game-board")
  Board.forEach((row, i) => boardBox.appendChild(buildRow(row, i)))
  return boardBox
}

let displayBoard = () => {
  let mount = document.getElementById("life")
  mount.innerHTML = ""
  mount.appendChild(buildBoard(Board))
}

let weight = () => {
  return document.getElementById("rng-weight").value
}

let randomBoard = (w, h) => {
  console.log(weight())
  let isLive = () => (weight() > (Math.random() * 100))
  let randomRow = () => {
    let row = []
    for (let i = 0; i < w; i++) {
      row.push(isLive())
    }
    return row
  }
  let board = []
  for (let i = 0; i < w; i++) {
    board.push(randomRow())
  }
  return board
}


var Board = randomBoard(12, 12)
var Paused = false

let resetBoard = () => {
  Board = randomBoard(12, 12)
  displayBoard()
}
let togglePaused = () => Paused = !Paused


let playGame = async () => {
  while (true) {
    displayBoard(Board)
    await new Promise(r => setTimeout(r, 1000));
    if (!Paused) Board = gameStep();
  }
}

playGame()
