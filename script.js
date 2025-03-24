const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

// Snake Properties
let snake = [{ x: 10, y: 10 }];
let direction = "RIGHT";
let food = { x: 15, y: 15 };
let gameInterval;

// Keyboard Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Mobile Controls
document.getElementById("upBtn").addEventListener("click", () => direction = "UP");
document.getElementById("downBtn").addEventListener("click", () => direction = "DOWN");
document.getElementById("leftBtn").addEventListener("click", () => direction = "LEFT");
document.getElementById("rightBtn").addEventListener("click", () => direction = "RIGHT");

// Start the game
function startGame() {
    gameInterval = setInterval(gameLoop, 100);
}

// Draw Snake and Food
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    ctx.fillStyle = "#00FFFF";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    // Draw Food
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

// Move Snake
function moveSnake() {
    let head = { ...snake[0] };

    switch (direction) {
        case "UP":
            head.y--;
            break;
        case "DOWN":
            head.y++;
            break;
        case "LEFT":
            head.x--;
            break;
        case "RIGHT":
            head.x++;
            break;
    }

    snake.unshift(head);

    // Check Collision with Food
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / 20)),
            y: Math.floor(Math.random() * (canvas.height / 20)),
        };
    } else {
        snake.pop();
    }

    // Check Game Over
    if (
        head.x < 0 || head.x >= canvas.width / 20 ||
        head.y < 0 || head.y >= canvas.height / 20 ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver();
    }
}

// Game Loop
function gameLoop() {
    moveSnake();
    draw();
}

// Handle Game Over
function gameOver() {
    clearInterval(gameInterval);
    document.getElementById("playAgain").style.display = "block";
}

// Play Again Button
document.getElementById("playAgain").addEventListener("click", () => {
    snake = [{ x: 10, y: 10 }];
    direction = "RIGHT";
    food = { x: 15, y: 15 };
    document.getElementById("playAgain").style.display = "none";
    startGame();
});

// Start the Game
startGame();
