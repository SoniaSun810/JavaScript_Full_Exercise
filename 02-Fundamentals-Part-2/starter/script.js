"use strict";

// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.bmi = this.mass / this.height ** 2;
//     this.firstName = 'Mark';
//     return this.bmi;
//   },
// };

// const john = {
//   fullName: "John Miller",
//   mass: 92,
//   height: 1.95,
// };

// mark.calcBMI();
// console.log(mark.bmi);
// console.log(mark);

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(tip + bills[i]);
}

console.log(tips, totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 1; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(calcAverage(bills));

// const calcAverage = (a, b, c) => {
//   return (a + b + c) / 3;
// };

// // Or (a, b, c) => (a + b + c) / 3;
// // Automatically return the value in arrow function

// const checkWinner = function (avgD, avgK) {
//     if (avgD > avgK){
//         console.log("Dolhins wins")
//     } else if (avgD < avgK){
//         console.log("Koalas wins")
//     } else {
//         console.log("They both win")
//     }
// }
