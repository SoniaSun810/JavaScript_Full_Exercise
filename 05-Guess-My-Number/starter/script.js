'use strict';

// select a class
// Math.random (0, 1)
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // convert the string into number before comparing

  if (!guess) {
    displayMessage('No number!')
  }  
  // When the player wins
  else if (guess === secretNumber) {
    displayMessage('Correct number!')
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem'
    highScore = Math.max(highScore, score) 
    console.log(highScore)
    document.querySelector('.highscore').textContent = highScore;
    }
 
  else if (guess !== secretNumber) {
    if (score > 0) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!')
      score--;
      document.querySelector('.score').textContent = score;
    } else {
        document.querySelector('.message').textContent = 'You lost the game!';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    // reset all the other textContent
    displayMessage('Start Game');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').textContent = '';

    // restore CSS style background
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
})




