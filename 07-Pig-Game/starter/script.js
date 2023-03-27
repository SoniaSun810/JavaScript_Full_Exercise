'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// initial state
let scores, currentScore, activePlayerIdx, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayerIdx = 0;
  playing = true;

  // Starting condition
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${dice}.png`;
    // 3. Chech for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayerIdx}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

const switchPlayer = function () {
  // Switch to next player
  document.getElementById(`current--${activePlayerIdx}`).textContent = 0;
  activePlayerIdx = activePlayerIdx === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// hold the score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add the score to the active player's score
    scores[activePlayerIdx] += currentScore;
    document.getElementById(`score--${activePlayerIdx}`).textContent =
      scores[activePlayerIdx];

    // check if a player win
    if (scores[activePlayerIdx] >= 20) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayerIdx}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayerIdx}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
