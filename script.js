const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('#status');
const restartButton = document.querySelector('#restartButton');
const symbolSelection = document.querySelector('#symbolSelection');
const chooseXButton = document.querySelector('#chooseX');
const chooseOButton = document.querySelector('#chooseO');
const popup = document.querySelector('#popup');
const popupMessage = document.querySelector('#popupMessage');
const closePopupButton = document.querySelector('#closePopup');

let currentPlayer;
let playerSymbol;
let computerSymbol;
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkWinner();
    switchPlayer();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showPopup(`Player ${currentPlayer} Wins!`, 'popup-winner');
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        showPopup('It\'s a Draw!', 'popup-draw');
        gameActive = false;
        return;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === playerSymbol ? computerSymbol : playerSymbol;
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function restartGame() {
    currentPlayer = playerSymbol;
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    popup.style.display = 'none'; // Hide popup on restart
}

function startGame(symbol) {
    playerSymbol = symbol;
    computerSymbol = symbol === 'X' ? 'O' : 'X';
    currentPlayer = playerSymbol;
    gameActive = true;
    symbolSelection.style.display = 'none';
    board.style.display = 'grid';
    restartButton.style.display = 'block';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function showPopup(message, popupClass) {
    popupMessage.textContent = message;
    popup.style.display = 'flex'; // Show popup
}

// Close the pop-up when "OK" is clicked
closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

chooseXButton.addEventListener('click', () => startGame('X'));
chooseOButton.addEventListener('click', () => startGame('O'));

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
