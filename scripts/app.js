const width = 9
const squares = []
let playerIndex = 76

function movePlayer() {
  squares.forEach(square => square.classList.remove('player'))
  squares[playerIndex].classList.add('player')
}

function handleKeyDown(e) {
  let playerShouldMove = true
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
    case 40:
      if (playerIndex + width < width * width) {
        playerIndex += width
      }
      break
    default:
      playerShouldMove = false
  }
  if (playerShouldMove) movePlayer()
}


function init() {

  const grid = document.querySelector('.grid')

  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    square.innerHTML = i
    squares.push(square)
    grid.append(square)
  }

  squares[playerIndex].classList.add('player')
  window.addEventListener('keydown', handleKeyDown)

}
window.addEventListener('DOMContentLoaded', init)
