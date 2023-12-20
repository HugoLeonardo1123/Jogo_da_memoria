const cards = [//imagens do jogo
    "images/cachorro.jfif",
    "images/gato.jfif",
    "images/coelho.jfif",
    "images/raposa.jfif",
    "images/leao.jfif",
    "images/capivara.jfif",
    "images/girafa.jfif",
    "images/macaco.jfif",
    "images/onca.jfif",
];

let playerName;
let score = 0;
let remainingPairs;

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {
    playerName = prompt("Digite seu nome:");

    if (playerName !== null && playerName.trim() !== "") {
        const gameGrid = shuffle(cards.concat(cards));
        const game = document.querySelector(".memory-game");
        game.innerHTML = '';

        remainingPairs = gameGrid.length / 2;

        gameGrid.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("memory-card");
        
            const frontFace = document.createElement("img");
            frontFace.classList.add("front-face"); // Adiciona a classe front-face
            frontFace.src = item;
        
            const backFace = document.createElement("div");
            backFace.classList.add("back-face");
            backFace.textContent = item;
        
            card.appendChild(frontFace);
            card.appendChild(backFace);
        
            game.appendChild(card);
        
            card.addEventListener("click", flipCard);
        });
        

        score = 0;
        updateScoreDisplay();

        alert(`Bem-vindo(a), ${playerName}! Boa sorte no jogo!`);
    } else {
        alert("Por favor, insira um nome válido.");
    }
}

let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;

    if (this === firstCard) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('.front-face').src === secondCard.querySelector('.front-face').src;

    if (isMatch) {
        disableCards();
        remainingPairs--;

        if (remainingPairs === 0) {
            endGame();
        } else {
            score += 10;
            updateScoreDisplay();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function updateScoreDisplay() {
    document.getElementById("scoreDisplay").innerText = `Pontuação: ${score}`;
}

function endGame() {
    const playAgain = confirm(`Parabéns, ${playerName}! Você completou o jogo com uma pontuação de ${score} pontos!\n\nDeseja jogar novamente?`);

    if (playAgain) {
        startGame();
    } else {
        alert(`Obrigado por jogar, ${playerName}!`);
    }
}
