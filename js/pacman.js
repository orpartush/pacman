'use strict';
var gPacman;
var gEmptyCells = [];
const PACMAN = '🤪';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) updateScore(1);

  if (nextCell === CHERRY) updateScore(10);

  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      for (var ghost of gGhosts) {
        if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
          renderCell(gPacman.location, EMPTY);
          gEmptyCells.push(gPacman.location);
          gPacman.location = nextLocation;
          renderCell(gPacman.location, PACMAN);
          gGhosts.splice(gGhosts.indexOf(ghost), 1);
        }
      }
    } else {
      gameOver()
    }
    return;
  }

  if (nextCell === SUPER_FOOD && gPacman.isSuper) return;
  if (nextCell === SUPER_FOOD) {
    superPower();
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);
  gEmptyCells.push(gPacman.location);


  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}

function superPower() {
  gPacman.isSuper = true;
  setTimeout(() => {
    gPacman.isSuper = false;
    if (gGhosts.length < 3) createGhost(gBoard);
  }, 5000)
  for (var ghost of gGhosts) {
    ghost.color = getRandomColor();
  }
}