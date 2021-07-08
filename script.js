const timer = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const startButton = document.getElementById('start-game');
const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');

const GAME_TIME = 10;
const MOLE_SPEED = 1000;
let gameTimer, moleTimer;
let score, time;

const playRound = () => {
    const hitPosition = randomSquare();
    squares.forEach(square => {
        square.classList.remove('mole');

        square.addEventListener('click', () => {

            if (square.id === hitPosition.toString()) {
                score++;
                squares[hitPosition].classList.remove('mole');
            };   
        });

        scoreEl.innerHTML = score;
    })

    squares[hitPosition].classList.add('mole');
    
}

const moveMole = () => {
    moleTimer = setInterval(() => {
        playRound();
    }, MOLE_SPEED);
}

function countDown(timeLeft,) {
    return new Promise((resolve, reject) => {
        gameTimer = setInterval(() => {
        timeLeft--;
        timer.innerHTML = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(moleTimer);
            clearInterval(gameTimer);
            resolve();

            squares.forEach(square => {
                square.classList.remove('mole');
            });
        }
      }, 1000);
    });
}

const randomSquare = () => Math.floor(Math.random() * squares.length);

const startGame = () => {
    score = 0;

    moveMole();
    countDown(GAME_TIME)
        .then(value => alert(`Game Over you scored ${score}`));

}

startButton.addEventListener('click', startGame);