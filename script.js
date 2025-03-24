// Select elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playAgainBtn = document.getElementById("playAgain");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const controls = document.getElementById("controls");

// Mobile Buttons
const upBtn = document.getElementById("moveUp");
const downBtn = document.getElementById("moveDown");
const leftBtn = document.getElementById("moveLeft");
const rightBtn = document.getElementById("moveRight");

// Detect Mobile Devices and Show/Hide Controls
function checkDevice() {
    if (window.innerWidth <= 768) {
        controls.style.display = "flex";  // Show mobile controls
    } else {
        controls.style.display = "none";  // Hide on larger screens
    }
}

// Run on Load & Resize
window.onload = checkDevice;
window.onresize = checkDevice;

// Game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1, dy = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;
let gameInterval;
let speed = 120; // Increased speed (Lower = Faster)

// Draw Snake
function drawSnake() {
    ctx.fillStyle = "#00FFFF"; // Neon Cyan
    snake.forEach((segment) => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });
}

// Draw Food
function drawFood() {
    ctx.fillStyle = "#FFD700"; // Gold Color
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

// Move Snake
function moveSnake() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        generateFood();
        updateScore();
    } else {
        snake.pop();
    }
}

// Check Collision
function checkCollision() {
    let head = snake[0];
    if (
        head.x < 0 || head.y < 0 || 
        head.x >= canvas.width / 20 || 
        head.y >= canvas.height / 20 || 
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver();
    }
}

// Generate New Food
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)),
        y: Math.floor(Math.random() * (canvas.height / 20))
    };
}

// Update Score
function updateScore() {
    score++;
    scoreDisplay.textContent = score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = highScore;
    }
}

// Game Loop (Optimized)
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
    checkCollision();
    setTimeout(gameLoop, speed);
}

// Game Over
function gameOver() {
    playAgainBtn.style.display = "block";
}

// Start Game
function startGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = score;
    playAgainBtn.style.display = "none";
    generateFood();
    gameLoop();
}

// Play Again Button
playAgainBtn.addEventListener("click", startGame);

// Keyboard Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
    if (event.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
    if (event.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
    if (event.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
});

// Mobile Touch Controls
upBtn.addEventListener("click", () => { dx = 0; dy = -1; });
downBtn.addEventListener("click", () => { dx = 0; dy = 1; });
leftBtn.addEventListener("click", () => { dx = -1; dy = 0; });
rightBtn.addEventListener("click", () => { dx = 1; dy = 0; });

// Start game initially
startGame();
