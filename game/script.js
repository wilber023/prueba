let score = 0;
let timeLeft = 30;
let gameInterval, mouseMoveInterval;

const mouse = document.getElementById('mouse');
const scoreBoard = document.getElementById('score');
const timeBoard = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreBoard.textContent = score;
    timeBoard.textContent = timeLeft;

    startBtn.style.display = 'none';
    mouse.style.display = 'block';
    
    gameInterval = setInterval(updateTime, 1000);
    moveMouse();
}

function updateTime() {
    timeLeft--;
    timeBoard.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(mouseMoveInterval);
    mouse.style.display = 'none';
    startBtn.textContent = 'Reiniciar Juego';
    startBtn.style.display = 'block';
}

function moveMouse() {
    mouseMoveInterval = setInterval(() => {
        const x = Math.random() * (gameContainer.clientWidth - mouse.clientWidth);
        const y = Math.random() * (gameContainer.clientHeight - mouse.clientHeight);
        mouse.style.left = `${x}px`;
        mouse.style.top = `${y}px`;
    }, 800);
}

mouse.addEventListener('click', () => {
    score++;
    scoreBoard.textContent = score;
});

startBtn.addEventListener('click', startGame);
