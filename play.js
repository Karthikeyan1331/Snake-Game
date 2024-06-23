let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let scoreDisplay = document.getElementById("score");
$(".popup").hide()
const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = 0;
let direction;
let game;



function setDirection(event) {
    if ((event.keyCode == 37 || event.keyCode == 65) && direction != "RIGHT") {
        // Left arrow key or 'A' key
        direction = "LEFT";
    } else if ((event.keyCode == 38 || event.keyCode == 87) && direction != "DOWN") {
        // Up arrow key or 'W' key
        direction = "UP";
    } else if ((event.keyCode == 39 || event.keyCode == 68) && direction != "LEFT") {
        // Right arrow key or 'D' key
        direction = "RIGHT";
    } else if ((event.keyCode == 40 || event.keyCode == 83) && direction != "UP") {
        // Down arrow key or 'S' key
        direction = "DOWN";
    }
}


function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "#00FF00" : "#00AA00";
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = "#000";
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = "#FF0000";
    context.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // Wrap snake position on edge collision
    if (snakeX < 0) snakeX = canvas.width - box;
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY < 0) snakeY = canvas.height - box;
    if (snakeY >= canvas.height) snakeY = 0;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (collision(newHead, snake)) {
        clearInterval(game);
        $(".popup").show()
        $("#ScorePop").html(score)
        leaderboardUpdate(score)
    }

    snake.unshift(newHead);

    scoreDisplay.innerText = `Score: ${score}`;
}

function startGame() {
    direction = null; // Reset direction to null when starting a new game
    score = 0;
    snake = [{ x: 9 * box, y: 10 * box }]; // Reset snake position
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    }; // Reset food position
    scoreDisplay.innerText = `Score: ${score}`;
    if (game) clearInterval(game); // Clear previous game interval if it exists
    game = setInterval(draw, 150);
}
startGame()
document.addEventListener("keydown", setDirection);
canvas.addEventListener("click", startGame);