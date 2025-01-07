// Get all the buttons (cells) from the grid
const cells = document.querySelectorAll(".cell");

// Initialize player variable. Player 1 is "X", Player 2 is "O"
let player = 1;

// URLs for "X" and "O" images (ensure you have these images in your project folder)
const xImageURL = "x.png";  // Path to "X" image
const oImageURL = "o.png";  // Path to "O" image

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

    // Determine the player (X or O)
    const img = document.createElement("img");
    if (player === 1) {
        img.src = xImageURL;  // Assign X's image to the cell
    } else {
        img.src = oImageURL;  // Assign O's image to the cell
    }

    // Place the image inside the button
    cell.appendChild(img);

    // Disable the button after it's pressed
    cell.disabled = true;

    // Switch to the other player
    changePlayer();
}

// Add event listeners to all cells
cells.forEach(cell => {
    cell.addEventListener("click", handleMove);
});
