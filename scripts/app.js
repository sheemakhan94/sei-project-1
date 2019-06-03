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
  for (let i = 0; i < 7; i++) {
    if (enemyRowOne[i]) {
      squares[enemyIndex+i].classList.add('enemy')
      squares[enemyIndex+i].dataset.id  = i
    }

    // squares[enemyIndex+i + width].classList.add('enemy')
    // squares[enemyIndex+i + width].dataset.id  = i + 7
    // squares[enemyIndex+i + (width * 2)].classList.add('enemy')
    // squares[enemyIndex+i + width].dataset.id  = i + 14
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
  } else {
    clearInterval(cashTimer)
  }
}

function shootCash() {
  squares[cashIndex].classList.add('cash')
  cashTimer = setInterval(moveCash, 500)
  // don't forget to put a timeout in here as well or the missile will run eternally!
  setTimeout(() => {
    // console.log('clear the cash interval')
    clearInterval(cashTimer)
  }, 4000)

}

function checkHits() {
  squares.forEach(square => {
    if(square.classList.contains('cash') && square.classList.contains('enemy')) { // turn the class off and clear moveCash interval
      enemyRowOne[parseInt(square.dataset.id)] = false
      square.classList.remove('enemy')
    }
  })
  console.log(enemyRowOne)
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
    enemyRowOne.push(true)
    console.log(enemyRowOne)

    for (let i = 0; i < 7; i++)
      squares[enemyIndex+i + width].classList.add('enemy')
    squares[enemyIndex+i + width].dataset.id  = i + 7
    enemyRowTwo.push(true)
    console.log(enemyRowTwo)

    for (let i = 0; i < 7; i++)
      squares[enemyIndex+i + (width * 2)].classList.add('enemy')
    squares[enemyIndex+i + width].dataset.id  = i + 14
    enemyRowThree.push(true)
    console.log(enemyRowThree)
  }
  squares[playerIndex].classList.add('player')
  // squares[cashIndex].classList.add('cash')
  window.addEventListener('keydown', handleKeyDown)
}
