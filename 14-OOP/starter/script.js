'use strict';

// constructor function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this, to create a method in a constructor function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(jonas, matilda, jack);
console.log(jonas instanceof Person);

//1. New {} is created
//2. function is called, this = {} this keyword is the new empty object
//3. {} linked to prototype
//4. function automatically returns {}

// Prototypes
console.log(Person.prototype);

// set methods in prototype
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
// set properties in prototype
Person.prototype.species = 'Homo Sapiens';

jonas.calcAge();
console.log(jonas.__proto__ === Person.prototype);
// .isPrototypeOfLinkedObjects
// console.log(Person.prototype.isPrototypeOf(jonas));

// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));

// Prototype Chain
console.log(jonas.__proto__.__proto__);
console.dir(Person.prototype.constructor);

const arr = [3, 4, 5, 6];
console.log(arr.__proto__);




