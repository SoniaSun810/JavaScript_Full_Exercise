"use strict";

// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// const BMIMark = massMark / heightMark ** 2;
// const BMIJohn = massJohn / (heightJohn * heightJohn);

// if (BMIMark > BMIJohn) {
//     console.log(`Mark's ${BMIMark} BMI is higher!`)
// } else {
//     console.log(`John's ${BMIJohn} BMI is higher!`)
// }

// const scoreD = (96 + 108 + 89) / 3;
// const scoreK = (88 + 91 + 110) / 3;
// console.log(scoreD, scoreK);

// if (scoreD > scoreK) {
//     console.log('Dolphins win the trophy.')
// } else if (scoreK > scoreD) {
//     console.log('Koalas win the trophy.')
// } else if (scoreK === scoreD) {
//     console.log('Both win the trophy.')
// }

const bill = 275;
const tip = (bill <= 300 && bill >= 50)? bill * 0.15 : bill * 0.2;
console.log(`bill ${bill}, tip ${tip}, total, ${bill + tip}`);
