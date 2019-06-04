window.addEventListener('DOMContentLoaded', init)

const width = 13
const height = 9
const squares = []
let playerIndex = 110
let enemyIndex = 0
let cashIndex = null

function movePlayer() {
  squares.forEach(square => square.classList.remove('player'))
  squares[playerIndex].classList.add('player')
}

function handleKeyDown(e) {
  let playerShouldMove = true
  let cashShouldFire = false
  switch(e.keyCode) {
    case 39:
      if (playerIndex % width < width - 1) {
        playerIndex++
      }
      break
    case 37:
      if (playerIndex % width > 0) {
        playerIndex--
      }
      break
    case 32:
      cashShouldFire = true
      cashIndex = playerIndex - width
      break
    default:
      playerShouldMove = false
      cashShouldFire = false
  }
  if (playerShouldMove) movePlayer()
  if (cashShouldFire) shootCash()
}

function moveEnemy() {
  squares.forEach(square => square.classList.remove('enemy'))
  squares.forEach(square => square.dataset.id = null)
  squares.forEach(square => square.dataset.row = null)
  for (let i = 0; i < 7; i++) {
    if (enemyRowOne[i]) {
      squares[enemyIndex+i].classList.add('enemy')
      squares[enemyIndex+i].dataset.id  = i
      squares[enemyIndex+i].dataset.row = 1
    }
  }

  for(let i = 0; i < 7; i++) {
    if (enemyRowTwo[i]) {
      squares[enemyIndex+i + width].classList.add('enemy')
      squares[enemyIndex+i + width].dataset.id  = i
      squares[enemyIndex+i + width].dataset.row = 2
    }
  }

  for(let i = 0; i < 7; i++) {
    if (enemyRowThree[i]) {
      squares[enemyIndex+i + (width * 2)].classList.add('enemy')
      squares[enemyIndex+i + (width * 2)].dataset.id  = i
      squares[enemyIndex+i + (width * 2)].dataset.row = 3
    }
  }
}

let count = 0
let movingRight = true

function move() {
  if(count < 6) {
    // console.log(count)
    count++
    if (movingRight) {
      enemyIndex++
    } else {
      enemyIndex--
    }
  } else {
    enemyIndex += width
    count = 0
    movingRight = !movingRight
  }


  moveEnemy()
}
setInterval(move, 500)

let cashTimer = null


function moveCash() {
  checkHits()
  squares.forEach(square => square.classList.remove('cash'))
  cashIndex -= width
  if (squares[cashIndex]) {
    squares[cashIndex].classList.add('cash')
  // } else {
  //   clearInterval(cashTimer)
  }
}

function shootCash() {
  squares[cashIndex].classList.add('cash')
  cashTimer = setInterval(moveCash, 250)
  setTimeout(() => {
    clearInterval(cashTimer)
  }, 4000)
}


function checkHits() {
  squares.forEach(square => {
    if(square.classList.contains('cash') && square.classList.contains('enemy')) {
      console.log(square.dataset.row)

      if (square.dataset.row === '3') {
        enemyRowThree[parseInt(square.dataset.id)] = false
        square.classList.remove('enemy')
        square.classList.remove('cash')
        cashIndex = null
        clearInterval(cashTimer)
        return

      } else if (square.dataset.row === '2') {
        enemyRowTwo[parseInt(square.dataset.id)] = false
        square.classList.remove('enemy')
        square.classList.remove('cash')
        cashIndex = null
        clearInterval(cashTimer)
        return

      } else if (square.dataset.row === '1') {
        enemyRowOne[parseInt(square.dataset.id)] = false
        square.classList.remove('enemy')
        square.classList.remove('cash')
        cashIndex = null
        clearInterval(cashTimer)
        return
      }
    }
  })
}

let enemyRowOne = []

let enemyRowTwo = []

let enemyRowThree = []


function init() {

  const grid = document.querySelector('.grid')

  for (let i = 0; i < width * height; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    square.innerHTML = i
    squares.push(square)
    grid.append(square)
  }

  for (let i = 0; i < 7; i++) {
    squares[enemyIndex+i].classList.add('enemy')
    squares[enemyIndex+i].dataset.id  = i
    squares[enemyIndex+i].dataset.row = 1
    enemyRowOne.push(true)
  }
  for (let i = 0; i < 7; i++) {
    squares[enemyIndex+i + width].classList.add('enemy')
    squares[enemyIndex+i + width].dataset.id  = i
    squares[enemyIndex+i + width].dataset.row = 2
    enemyRowTwo.push(true)
  }
  for (let i = 0; i < 7; i++) {
    squares[enemyIndex+i + (width * 2)].classList.add('enemy')
    squares[enemyIndex+i + (width * 2)].dataset.id  = i
    squares[enemyIndex+i + (width * 2)].dataset.row = 3
    enemyRowThree.push(true)
  }
  console.log(enemyRowOne, enemyRowTwo, enemyRowThree)
  squares[playerIndex].classList.add('player')
  // squares[cashIndex].classList.add('cash')
  window.addEventListener('keydown', handleKeyDown)
}
