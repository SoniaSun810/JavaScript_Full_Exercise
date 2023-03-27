'use strict';

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.querySelector('body').addEventListener('click', function(){
        header.style.color = 'blue';
    })
}());

// closures

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

// g();
// f();

// Timer
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are boarding ${n} passengers`);
    console.log(`${perGroup} passengers`)
  }, wait * 1000);
  console.log(`Will start boarding in ${wait}`);
};

const perGroup = 1000;

// boardPassengers(180, 3);

// setTimeout(function () {
//   console.log('Timer');
// }, 1000);

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
// booker();
// booker();
// booker();

// IIFE
// (function () {
//   console.log('This will never run again!');
// })();

// (() => {
//   console.log('run once!');
// })();

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0 : Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(`${this.question}\n${this.options.join('\n')}
        \n(Write option number)`)
    );

    console.log(answer);
    // Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.displayResults.call({answers: [5, 2, 3]}, 'string');

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed string: ${fn.name}`);
};

// transformer('JavaScript is the best', upperFirstWord);
// transformer('JavaScript is the best', oneWord);

const flight = 'LH234';
const sonia = {
  name: 'Sonia',
  passport: 347384934,
};

// flightNum contains the copy of flight, since it's primitive type
const checkIn = function (flightNum, passenger) {
  // inside the function, flightNum is a completely different variable
  flightNum = 'LH999';
  passenger.name = 'Fengnan';
  if (passenger.passport === 347384934) {
    alert('Chech in');
  } else {
    alert('Wrong passport');
  }
};

// checkIn(flight, sonia);
// console.log(flight);
// console.log(sonia);
// is the same as doing
// const flightNum = flight;
// const passenger = sonia;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};

newPassport(sonia);
// checkIn(flight, sonia);

// const bookings = [];

// const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   bookings.push(booking);
//   console.log(bookings);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 900);
// createBooking('LH123', 2);
