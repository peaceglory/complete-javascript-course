// var Person = function (name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
//     this.calculateAge = function () {
//         console.log(2020 - this.yearOfBirth);
//     }
// }
//
// var miro = new Person('Miro', 1982, 'programmer');
// var eli = new Person('Eli', 1986, 'astrologer');
// var bobo = new Person('Bobo', 2017, 'toddler');
//
// miro.calculateAge();
// eli.calculateAge();
// bobo.calculateAge();
//
// // Each object has its own repetition of the calculateAge function
// console.log(miro.calculateAge === eli.calculateAge);
// console.log(eli.calculateAge === bobo.calculateAge);

// var Person = function (name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }
//
// Person.prototype.calculateAge = function () {
//     console.log(2020 - this.yearOfBirth);
// }
//
// var miro = new Person('Miro', 1982, 'programmer');
// var eli = new Person('Eli', 1986, 'astrologer');
// var bobo = new Person('Bobo', 2017, 'toddler');
//
// miro.calculateAge();
// eli.calculateAge();
// bobo.calculateAge();
//
// // calculateAge function is defined only once in the Person.prototype
// console.log(miro.calculateAge === eli.calculateAge);
// console.log(eli.calculateAge === bobo.calculateAge);
//
// // created objects inherit from the Person.prototype
// console.log(miro.__proto__ === Person.prototype);


/*******************************************************************/

var personProto = {
    calculateAge: function () {
        console.log(2020 - this.yearOfBirth);
    }
}

// one way of initializing properties
var miro = Object.create(personProto);
miro.name = 'miro';
miro.yearOfBirth = 1982;
miro.job = 'programmer';

// another way of initializing properties
var eli = Object.create(personProto, {
    name: { value: 'Eli' },
    yearOfBirth: { value: 1986 },
    job: { value: 'astrologer' },
    talkForHours: { value: function () {
        console.log('charming talk')
    }}
});

miro.calculateAge();
eli.calculateAge();
eli.talkForHours();

// created objects inherit from the personProto
console.log(miro.__proto__ === personProto);
