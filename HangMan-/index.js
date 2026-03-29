let theWord = "";
let guesses = [];
let wrongGuesses = [];
const MAX_WRONG = 6;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const alphabet = document.querySelector(".alphabet-container");
const divWord = document.querySelector(".word-display");
const wrongCount = document.querySelector(".wrong-count");
const hangmanParts = document.querySelectorAll(".hangman-part");
const gameContainer = document.querySelector(".game-container");
const gameStatus = document.querySelector(".game-status");
const winMessage = document.querySelector(".win-message");
const loseMessage = document.querySelector(".lose-message");
const correctWordSpan = document.querySelector(".correct-word");
const newGameBtn = document.querySelector(".new-game-btn");

function pickWord() {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

function renderWord() {
    divWord.innerHTML = Array.from(theWord).map(l => {
        let revealed = guesses.includes(l);
        let classes = "word-letter";
        if (revealed) classes += " revealed";
        if (isGameLost() && !revealed) classes += " incorrect-final";
        if (isGameWon() && revealed) classes += " correct-final";
        return `<span class="${classes}">${revealed || isGameLost() ? l : ""}</span>`;
    }).join("");
}

function renderAlphabet() {
    alphabet.innerHTML = Array.from(letters).map(l => {
        let btnClass = "letter-btn";
        if (guesses.includes(l)) {
            if (theWord.includes(l)) btnClass += " correct disabled";
            else btnClass += " incorrect disabled";
        }
        return `<button class="${btnClass}" data-letter="${l}" ${guesses.includes(l) ? "disabled" : ""}>${l}</button>`;
    }).join("");
}

function renderHangman() {
    hangmanParts.forEach((part, idx) => {
        if (idx < wrongGuesses.length) {
            part.classList.add("revealed");
        } else {
            part.classList.remove("revealed");
        }
    });
}

function renderWrongCount() {
    wrongCount.textContent = wrongGuesses.length;
}

function isGameWon() {
    return Array.from(theWord).every(l => guesses.includes(l));
}
function isGameLost() {
    return wrongGuesses.length >= MAX_WRONG;
}

function showGameStatus() {
    if (isGameWon()) {
        gameContainer.classList.add("game-won");
        gameContainer.classList.remove("game-lost");
        gameStatus.style.opacity = "1";
        winMessage.style.display = "block";
        loseMessage.style.display = "none";
    } else if (isGameLost()) {
        gameContainer.classList.add("game-lost");
        gameContainer.classList.remove("game-won");
        gameStatus.style.opacity = "1";
        winMessage.style.display = "none";
        loseMessage.style.display = "block";
        correctWordSpan.textContent = theWord;
    } else {
        gameContainer.classList.remove("game-won", "game-lost");
        gameStatus.style.opacity = "0";
        winMessage.style.display = "none";
        loseMessage.style.display = "none";
    }
}

alphabet.addEventListener("click", function(e){
    if(e.target.matches("button") && !isGameWon() && !isGameLost()){
        let letter = e.target.dataset.letter;
        if (!guesses.includes(letter)) {
            guesses.push(letter);
            if (!theWord.includes(letter)) {
                wrongGuesses.push(letter);
            }
            updateGame();
        }
    }
});

newGameBtn.addEventListener("click", startNewGame);

function updateGame() {
    renderWord();
    renderAlphabet();
    renderHangman();
    renderWrongCount();
    showGameStatus();
}
function startNewGame() {

    theWord = pickWord();
    guesses = [];
    wrongGuesses = [];
    updateGame();
}

startNewGame();