'use strict';

// selecting elements
const scoreFirst = document.getElementById('score--0')
const scoreSecond = document.getElementById('score--1')
const dice = document.querySelector('.dice')



const field0Player = document.querySelector('.player--0')
const field1Player = document.querySelector('.player--1')

const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
// variables
let scores = []
let randomNumber, currentScore, activePlayer, playing;

// starting a game
startGame()

// roll a dice
btnRoll.addEventListener('click', () => {
    if (playing) {
        generateNumber()
        dice.classList.remove('hidden')
        dice.src = `dice-${randomNumber}.png`
        if (randomNumber !== 1) {
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            swtichPlayer()
        }
    }
})



const generateNumber = () => {
    randomNumber = Math.trunc(Math.random() * 6) + 1
    console.log(randomNumber);
}

btnHold.addEventListener('click', () => {

    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        currentScore = 0;
        if (scores[activePlayer] >= 100) {
            playing = false;
            console.log(`player ${activePlayer + 1} won the game!`);
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            dice.classList.add('hidden')

        } else {
            swtichPlayer()
        }
    }

})

btnNew.addEventListener('click', startGame)

function startGame() {
    scoreFirst.textContent = 0
    scoreSecond.textContent = 0
    activePlayer = 0
    scores = [0, 0]
    playing = true;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore = 0
    dice.classList.add('hidden')
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    field0Player.classList.add('player--active')


}

function toggleFields() {
    field0Player.classList.toggle('player--active')
    field1Player.classList.toggle('player--active')
}

function swtichPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    toggleFields()
}