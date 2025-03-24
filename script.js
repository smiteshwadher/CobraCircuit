const canvas = document.getElementById("gameCanvas"); // Selects the canvas element where the game will be drawn
const ctx = canvas.getContext("2d"); // Gets the 2D rendering of the canvas, allowing us to draw shapes.

let box = 20; // This variable defines the size of each grid cell.
let snake = [{ x: 10 * box, y: 10 * box }]; // Array that holds the position of the snake, always at the centre
let direction = "RIGHT"; // Tracks the direction of the snake, initially set to right.
let food = generateFood(); // Stores the co-ordinates of the food items created by the function generateFood()

resizeCanvas(); // Calls this function to resize the canvas based on the device being used.

window.addEventListener("resize", resizeCanvas); // Listening for the resize events.
document.addEventListener("keydown", changeDirection);

// Listens to mobile inputs.
document.getElementById("moveUp").addEventListener("click", () => { if (direction !== "DOWN") direction = "UP"; });
document.getElementById("moveDown").addEventListener("click", () => { if (direction !== "UP") direction = "DOWN"; });
document.getElementById("moveLeft").addEventListener("click", () => { if (direction !== "RIGHT") direction = "LEFT"; });
document.getElementById("moveRight").addEventListener("click", () => { if (direction !== "LEFT") direction = "RIGHT"; });

function resizeCanvas() {
    let size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    size = Math.max(size, 300);
    canvas.width = canvas.height = Math.floor(size / box) * box;
}

// Below function listens to keyboard events.
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

// Generating the food in random positions.
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// Drawing the game on the canvas
function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffcc00";
    ctx.fillRect(food.x, food.y, box, box);

    // Drawing the snake.
    ctx.fillStyle = "#00ffcc";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    // Updating the snake movements.
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === "LEFT") head.x -= box;
    if (direction === "UP") head.y -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "DOWN") head.y += box;

    // Checking for Food Collision
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    // Handling the game over.
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        snake = [{ x: 10 * box, y: 10 * box }];
        direction = "RIGHT";
    }

    // Updating the game at regular intervals.
    snake.unshift(head);
}

setInterval(draw, 150);
