// Get all the buttons (cells) from the grid
const cells = document.querySelectorAll(".cell");

// Initialize player variable. Player 1 is "X", Player 2 is "O"
let player = 1;  // 1 for X, 2 for O

// URLs for "X" and "O" images (ensure you have these images in your project folder)
const xImageURL = "x.png";  // Path to "X" image
const oImageURL = "o.png";  // Path to "O" image

// Array to represent the board (0 = empty, 1 = X, 2 = O)
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];  // 9 cells initialized as empty (0)

// Winning combinations (indexes of the board array)
const winningCombinations = [
    [0, 1, 2], // row 1
    [3, 4, 5], // row 2
    [6, 7, 8], // row 3
    [0, 3, 6], // column 1
    [1, 4, 7], // column 2
    [2, 5, 8], // column 3
    [0, 4, 8], // diagonal 1
    [2, 4, 6], // diagonal 2
];

// Function to check if the current player has won
function checkStatus() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        // Check if all three cells in this combination are the same (not 0, meaning not empty)
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== 0) {
            return board[a];  // Return the winner (1 for X, 2 for O)
        }
    }
    return 0;  // No winner
}

// Function to change the player after each move
function changePlayer() {
    if (player === 1) {
        player = 2;
    } else {
        player = 1;
    }
}

// Function to handle a move
function handleMove(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    // If the cell is already filled, do nothing
    if (board[cellIndex] !== 0) {
        return;
    }

    // Mark the board with the current player's symbol
    board[cellIndex] = player;

    // Create an image element and assign it to the cell
    const img = document.createElement("img");
    if (player === 1) {
        img.src = xImageURL;
        img.style.width = "150px";  
        img.style.height = "150px"; 
        cell.appendChild(img);
    } else {
        img.src = oImageURL;
        img.style.width = "150px";  
        img.style.height = "150px"; 
        cell.appendChild(img);
    }


    // Disable the button after it's clicked
    cell.disabled = true;

    // Check for a winner
    const winner = checkStatus();
    if (winner !== 0) {
        alert(winner === 1 ? "Player X wins!" : "Player O wins!");
        // Disable all cells after the game ends
        cells.forEach(cell => cell.disabled = true);
        return;
    }

    if (board.every(cell => cell !== 0)) {
        alert("It's a draw!");
        return;
    }

    changePlayer();
}

cells.forEach(cell => {
    cell.addEventListener("click", handleMove);
});

const resetButton = document.createElement("button");
resetButton.textContent = "Reset Game";
resetButton.addEventListener("click", resetGame);
document.body.appendChild(resetButton);

function resetGame() {
  
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    cells.forEach(cell => {
        cell.innerHTML = '';  
        cell.disabled = false; 
    });

    // Reset the player to 1 (Player X)
    player = 1;
}
