'use strict';
var WALL = '🌳';
var FOOD = '.';
var EMPTY = ' ';
var SUPER_FOOD = '🍓';
var CHERRY = '🍒';

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};
var gCherryInterval;


function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gCherryInterval = setInterval(getCherryInEmptyCells, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 ||
        i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE - 2) {
        board[i][j] = SUPER_FOOD;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  
  document.querySelector('header h3 span').innerText = gGame.score;
  if (gGame.score >= 60) gameOver();
}


function gameOver() {
  var gElGameOverModal = document.querySelector('.game-over-modal');
  var elModalTitle = document.querySelector('.modal-title');
  gElGameOverModal.hidden = false;
  if (gGame.score >= 60) {
    elModalTitle.innerText = 'YOU WIN!';
    gElGameOverModal.style.background = 'rgb(16, 153, 3)';
   } else {
     elModalTitle.innerText = 'GAME OVER';
    gElGameOverModal.style.background = 'rgb(248, 48, 48)';
   }
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gCherryInterval);
  gIntervalGhosts;
}

function playAgain() {
  var gElGameOverModal = document.querySelector('.game-over-modal');
  gElGameOverModal.hidden = true;
  gGame.score = 0;
  init();
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

function getCherryInEmptyCells() {
  if (gEmptyCells.length === 0) return;
  var rndEmptyIdx = getRandomIntInclusive(0, gEmptyCells.length - 1);
  var emptyI = gEmptyCells[rndEmptyIdx].i;
  var emptyJ = gEmptyCells[rndEmptyIdx].j;
  gBoard[emptyI][emptyJ] = CHERRY;
  renderCell(gEmptyCells[rndEmptyIdx], CHERRY);
}
