const cells = document.querySelectorAll(".cell");

let player = 1;  

const xImageURL = "x.png";  
const oImageURL = "o.png"; 

let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
];

function checkStatus() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== 0) {
            return board[a];  
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

function handleMove(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== 0) {
        return;
    }

    // Mark the board with the current player's symbol
    board[cellIndex] = player;

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


    cell.disabled = true;

    const winner = checkStatus();
    if (winner !== 0) {
        alert(winner === 1 ? "Player X wins!" : "Player O wins!");
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

    player = 1;
}
