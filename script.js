let playerX = 'Player X';
let playerO = 'Player O';
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

document.addEventListener('DOMContentLoaded', () => {
  startGame();
});

function startGame() {
  gameActive = true;
  createBoard();
  updateStatus();
}

function createBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', () => handleCellClick(i));
    boardElement.appendChild(cell);
  }
}

function handleCellClick(index) {
  if (!gameActive || gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  updateBoard();
  if (checkWin()) {
    showWinnerPopup(currentPlayer);
    gameActive = false;
  } else if (checkTie()) {
    showWinnerPopup('Draw');
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.innerText = gameBoard[index];
  });
}

function updateStatus() {
  document.getElementById('status').innerText = `${playerX} (X) vs ${playerO} (O) - Turn: ${currentPlayer}`;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
  });
}

function checkTie() {
  return gameBoard.every(cell => cell !== '');
}

function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  updateBoard();
  updateStatus();
  document.getElementById('status').innerText = '';
}

function showWinnerPopup(result) {
  const winnerPopup = document.querySelector('.winner-popup');
  const overlay = document.querySelector('.overlay');

  if (result === 'Draw') {
    winnerPopup.innerHTML = `<p>It's a Draw! ${playerX} (X) vs ${playerO} (O)</p>`;
  } else {
    winnerPopup.innerHTML = `<p>${result === 'X' ? playerX : playerO} wins! ${playerX} (X) vs ${playerO} (O)</p>`;
  }

  winnerPopup.style.display = 'flex';
  overlay.style.display = 'flex';

  overlay.addEventListener('click', () => {
    winnerPopup.style.display = 'none';
    overlay.style.display = 'none';
  });
}
