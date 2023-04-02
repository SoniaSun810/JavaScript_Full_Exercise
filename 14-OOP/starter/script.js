'use strict';

// Inheritance between "Classes": Constructor Functions
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this, to create a method in a constructor function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(Student.prototype);
// mike.introduce();
// mike.calcAge();

Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);

// Object.create, least used way to create an object based on a prototype
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
};
// Create a new object based on the PersonProto, linked to a specific prototype
const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;
// steven.calcAge();

// Static Methods

// Getter and Setter
// in a js object, we can add properties and methods
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  // setter and getter, just need to be divided by ,
  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// console.log(account.latest);
// use setter like use a property
account.latest = 50;
// console.log(account.movements);

// ES6 Classes
// not hoisted
// first-class citizens
// executed in strict mode

// class expression
// const PersonCl = class {};

// class declaration just like in Java
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  // Instance methods
  // Without "static" keyword, it is an instance method
  calAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  // Attached to the constructor function, not to the prototype
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

// use static method, not available on instances
// PersonCl.hey();

// work the same as constructor function
// PersonCl.prototype.greet = function() {
//   console.log(`Hey ${this.fullName}`);
// }

// ES classes inheritance
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // Override a method from the parent class
  // calAge() {
  //   console.log(
  //     `I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${
  //       2037 - this.birthYear + 10
  //     }`
  //   );
  // }
}

const walter = new PersonCl('Walter White', 1965);
// console.log(walter);

const jessica = new PersonCl('Jessica Davis', 1996);
jessica.fullName = 'Jessica Li';
// console.log(jessica.fullName);
// console.log(jessica.__proto__ === PersonCl.prototype);
// jessica.greet();
// console.log(jessica.age);

// Exercise 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

// Exercise 2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS);
ford.speedUS = 50;
// console.log(ford);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// console.log(bmw.speed);

// constructor function

// Exercise 3
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

//

// Link the prototype
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};
const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// tesla.brake();
// tesla.accelerate();

// console.log(tesla);

//Exercixe 4 
class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge){
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo){
    this.#charge = chargeTo;
    return this;
  }

  accelerate(){
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(EVCl.prototype)

rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate();
console.log(rivian.speedUS);

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
// console.log(jonas, matilda, jack);
// console.log(jonas instanceof Person);

//1. New {} is created
//2. function is called, this = {} this keyword is the new empty object
//3. {} linked to prototype
//4. function automatically returns {}

// Prototypes
// console.log(Person.prototype);

// set methods in prototype
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
// set properties in prototype
Person.prototype.species = 'Homo Sapiens';

// jonas.calcAge();
// console.log(jonas.__proto__ === Person.prototype);
// .isPrototypeOfLinkedObjects
// console.log(Person.prototype.isPrototypeOf(jonas));

// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));

// Prototype Chain
// console.log(jonas.__proto__.__proto__);
// console.dir(Person.prototype.constructor);

// const arr = [3, 4, 5, 6];
// console.log(arr.__proto__);

//Another Class Example
// Encapsulation: public / private , fields / methods
class Account {
  // Public fields (instances)
  locale = navigator.language;

  // Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // protected
    // this._movements = [];
    // this.locale = navigator.language;
  }

  // Public interface, public methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  _approveLoan(val) {
    return true;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  // Private methods
  // #approveLoan(val) {
  //   return true;
  // }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
// console.log(acc1);
// console.log(acc1.getMovements());
// acc1.requestLoan(1000);
// console.log(acc1.#movements);

// Chaining Methods
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);

