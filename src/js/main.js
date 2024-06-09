// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = "#000000";

    const playerOnePrompt = prompt("The name of the first player : ");
    const playerTwoPrompt = prompt("The name of the second player : ");

    const playerOne = document.getElementById('player_one');
    const playerTwo = document.getElementById('player_two');

    playerOne.textContent = playerOnePrompt;
    playerTwo.textContent = playerTwoPrompt;

    const cells = document.querySelectorAll('[data-cell]');
    const newGameButton = document.getElementById('new-game');
    let isXTurn = true;

    // Initialize scores from local storage or set to 0 if not present
    let playerOneScore = parseInt(localStorage.getItem(playerOnePrompt)) || 0;
    let playerTwoScore = parseInt(localStorage.getItem(playerTwoPrompt)) || 0;

    const player_one_score = document.getElementById("player_one_score");
    const player_two_score = document.getElementById("player_two_score");

    // Display initial scores
    player_one_score.textContent = playerOneScore;
    player_two_score.textContent = playerTwoScore;

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });

    newGameButton.addEventListener('click', startNewGame);

    function handleClick(e) {
        const cell = e.target;
        const currentClass = isXTurn ? 'x' : 'o';
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
        cell.textContent = currentClass.toUpperCase();
    }

    function swapTurns() {
        isXTurn = !isXTurn;
    }

    function checkWin(currentClass) {
        const WINNING_COMBINATIONS = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains('x') || cell.classList.contains('o');
        });
    }

    function endGame(draw) {
        if (draw) {
            alert('Game is Draw');
        } else {
            if (isXTurn) {
                alert(`${playerOnePrompt} is Win`);
                playerOneScore += 1;
                localStorage.setItem(playerOnePrompt, playerOneScore);
                player_one_score.textContent = playerOneScore;
            } else {
                alert(`${playerTwoPrompt} is Win`);
                playerTwoScore += 1;
                localStorage.setItem(playerTwoPrompt, playerTwoScore);
                player_two_score.textContent = playerTwoScore;
            }
        }
        startNewGame();
    }

    function startNewGame() {
        cells.forEach(cell => {
            cell.classList.remove('x');
            cell.classList.remove('o');
            cell.textContent = '';
            cell.addEventListener('click', handleClick, { once: true });
        });
        isXTurn = true;
    }
});
