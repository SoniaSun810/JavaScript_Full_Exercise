'use strict';

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   // arrow function doesn't not have "this" key word
//   // instead use its parent scope key word
//   console.log(this);
// };

// calcAgeArrow(1980);

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Jonas',
  age: 30,
};

const friend = me;
friend.age = 27;
console.log('Friend', friend);
console.log('Me', me);

const jonas = {
  year: 1991,
  firstName: 'Jonas',
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // soluction 1: extra variable
    //     const self = this;
    //     const isMillenial = function() {
    //         console.log(self);
    //         console.log(self.year >= 1981 && self.year <= 1996);
    //     }
    //     isMillenial();
    //   },

    // solution 2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => console.log(`Hey, ${this.firstName}`),
};

// jonas.calcAge();
// console.log(this.firstName);

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
// addExpr(2, 5);
// addExpr(2, 5, 6, 7);

var addArrow = (a, b) => {
  console.log(arguments);
  a + b;
};

// addArrow(1, 2);

// const sonia = {
//     year:2017
// }

// // method borrowing
// sonia.calcAge = jonas.calcAge;
// sonia.calcAge();

// const f = jonas.calcAge;
// // just a regular function call
// f();

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     const output = `${firstName},you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       // const let variable only valid in block
//       var millenial = true;
//       const firstName = 'Steven';
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//     }
//     console.log(millenial);
//   }

//   printAge();
//   return age;
// }

// const firstName = 'Jonas';
// calcAge(1991);

// // Example
// if (! numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//     console.log("All products deleted!")
// }

// var x = 1
