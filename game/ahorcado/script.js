const words = ['javascript', 'hangman', 'programming', 'developer', 'interface', 'design', 'algorithms', 'challenge', 'solution', 'test'];
let usedWords = [];
let selectedWord = '';
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

const wordElement = document.getElementById('word');
const keyboardElement = document.getElementById('keyboard');
const resetButton = document.getElementById('reset-button');
const canvas = document.getElementById('hangman');
const ctx = canvas.getContext('2d');

canvas.width = 200;
canvas.height = 200;

function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mistakes > 0) {
        // Base
        ctx.fillRect(10, 180, 180, 10);
    }
    if (mistakes > 1) {
        // Pole
        ctx.fillRect(50, 20, 10, 160);
        ctx.fillRect(50, 20, 80, 10);
    }
    if (mistakes > 2) {
        // Rope
        ctx.fillRect(130, 30, 2, 20);
    }
    if (mistakes > 3) {
        // Head
        ctx.beginPath();
        ctx.arc(131, 60, 20, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (mistakes > 4) {
        // Body
        ctx.fillRect(130, 80, 2, 50);
    }
    if (mistakes > 5) {
        // Arms
        ctx.beginPath();
        ctx.moveTo(130, 90);
        ctx.lineTo(100, 120);
        ctx.moveTo(130, 90);
        ctx.lineTo(160, 120);
        ctx.stroke();
    }
    if (mistakes > 6) {
        // Legs
        ctx.beginPath();
        ctx.moveTo(130, 130);
        ctx.lineTo(100, 160);
        ctx.moveTo(130, 130);
        ctx.lineTo(160, 160);
        ctx.stroke();
    }
}

function getUniqueRandomWord() {
    if (words.length === 0) {
        alert('No more unique words available.');
        return '';
    }

    let word;
    do {
        word = words[Math.floor(Math.random() * words.length)];
    } while (usedWords.includes(word));

    usedWords.push(word);
    return word;
}

function resetGame() {
    mistakes = 0;
    guessedLetters = [];
    selectedWord = getUniqueRandomWord();
    if (!selectedWord) return;
    drawWord();
    generateKeyboard();
    drawHangman();
}

function drawWord() {
    const wordDisplay = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    wordElement.textContent = wordDisplay;
}

function generateKeyboard() {
    keyboardElement.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const button = document.createElement('button');
        button.textContent = letter;
        button.disabled = guessedLetters.includes(letter);
        button.addEventListener('click', () => handleGuess(letter));
        keyboardElement.appendChild(button);
    }
}

function handleGuess(letter) {
    guessedLetters.push(letter);
    if (selectedWord.includes(letter)) {
        drawWord();
        checkWin();
    } else {
        mistakes++;
        drawHangman();
        checkLose();
    }
    generateKeyboard();
}

function checkWin() {
    if (!wordElement.textContent.includes('_')) {
        setTimeout(() => {
            alert('¡Felicidades! ¡Ganaste!');
            resetGame();
        }, 100);
    }
}

function checkLose() {
    if (mistakes === maxMistakes) {
        setTimeout(() => {
            alert(`Juego terminado. La palabra era "${selectedWord}".`);
            resetGame();
        }, 100);
    }
}

resetButton.addEventListener('click', resetGame);

resetGame();
