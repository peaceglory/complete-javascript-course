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

// var personProto = {
//     calculateAge: function () {
//         console.log(2020 - this.yearOfBirth);
//     }
// }
//
// // one way of initializing properties
// var miro = Object.create(personProto);
// miro.name = 'miro';
// miro.yearOfBirth = 1982;
// miro.job = 'programmer';
//
// // another way of initializing properties
// var eli = Object.create(personProto, {
//     name: { value: 'Eli' },
//     yearOfBirth: { value: 1986 },
//     job: { value: 'astrologer' },
//     talkForHours: { value: function () {
//         console.log('charming talk')
//     }}
// });
//
// miro.calculateAge();
// eli.calculateAge();
// eli.talkForHours();
//
// // created objects inherit from the personProto
// console.log(miro.__proto__ === personProto);

/****************************************************************************/

// (
//     function () {
//         var score = Math.random() * 10;
//         console.log(score >= 5);
//     }
// )()

/*****************************************************************************/

// function retirement(retirementAge) {
//     var a = ' years left to retirement';
//
//     function haha(message) {
//         console.log('from ' + message);
//     }
//
//     haha('retirement');
//
//     return function (yearOfBirth) {
//         var age = 2020 - yearOfBirth;
//         console.log((retirementAge - age) + a);
//         console.log(this);
//         haha('anonymous');
//     }
// }
//
// var retirementUs = retirement(66);
// retirementUs(1982);

/***************************************************************************/

// add5 and add10 are both closures. They share the same function body definition, but store different lexical environments.
// In add5's lexical environment, x is 5, while in the lexical environment for add10, x is 10.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

// function makeAdder(x) {
//     return function(y) {
//         return x + y;
//     };
// }
//
// var add5 = makeAdder(5);
// var add10 = makeAdder(10);
//
// console.log(add5(2));  // 7 because x=5 in the lexical environment of add5
// console.log(add10(2)); // 12 because x=10 in the lexical environment of add5

/***************************************************************************/

// var john = {
//     name: 'John',
//     age: 26,
//     job: 'teacher',
//     presentation: function(style, timeOfDay) {
//         if (style === 'formal') {
//             console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
//         } else if (style === 'friendly') {
//             console.log('Hey! What\'s up? I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
//         }
//     }
// };
//
// var emily = {
//     name: 'Emily',
//     age: 35,
//     job: 'designer'
// };
//
// john.presentation('formal', 'afternoon');
//
// john.presentation.call(emily, 'friendly', 'afternoon');
//
// // function currying
// var johnFriendly = john.presentation.bind(john, 'friendly');
// johnFriendly('morning');
// johnFriendly('night');

/***************************************************************************/

// CODING CHALLANGE

(
    function () {
        var Question = function (question, possibleAnswers, correctAnswer) {
            this.question = question;
            this.possibleAnswers = possibleAnswers;
            this.correctAnswer = correctAnswer;
        };

        Question.prototype.logQuestionAndAnswers = function () {
            console.log(this.question);
            for (var i = 0; i < this.possibleAnswers.length; i++) {
                console.log(i + '. ' + this.possibleAnswers[i]);
            }
        };

        Question.prototype.checkAnswer = function (answer) {
            if (this.correctAnswer == answer) {
                console.log("Correct!");
                return 1;
            } else {
                console.log("Not correct!");
                return 0;
            }
        };

        var Quiz = function () {
            if (arguments.length > 0) {
                for (var i = 0; i < arguments.length; i++) {
                    if (! (arguments[i] instanceof Question)) {
                        alert('Quiz accepts only questions!');
                        return null;
                    }
                }

                this.questions = Array.prototype.slice.apply(arguments);
                this.score = 0;

                this.pickQuestion = function () {
                    var select = Math.floor(Math.random() * this.questions.length);
                    this.currQuestion = this.questions[select];
                    return this.questions[select];
                };

                this.getAnswer = function () {
                    if (this.currQuestion) {
                        return window.prompt(this.currQuestion.question);
                    } else {
                        window.alert('Pick up question first!');
                    }
                };

                this.addScore = function (score) {
                    this.score += score;
                };

                this.displayScore = function () {
                    console.log('Score: ' + this.score);
                };
            } else {
                alert('Quiz not initialized properly!');
            }
        };

        var Tools = {
            isEmpty: function (obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        return false;
                    }
                }
                return true;
            }
        };

        var javaQuestion = new Question('What is java in the IT world?',
            ['A great coffee', 'A great programming language', 'An island in Indonesia'],
            1);

        var philosophyQuestion = new Question('What is greatest philosophy?',
            ['Christianity', 'Hinduism', 'Stoicism', 'A philosophy is as great as its ability to reduce suffering'],
            3);

        var geographyQuestion = new Question('What is the capital of Bulgaria?',
            ['Sofia', 'Berlin', 'New York'],
            0);

        var aQuiz = new Quiz(javaQuestion, philosophyQuestion, geographyQuestion);
        aQuiz.displayScore();
        if (!Tools.isEmpty(aQuiz)) {
            while (true) {
                var qst = aQuiz.pickQuestion();
                qst.logQuestionAndAnswers();
                var answer = aQuiz.getAnswer();
                if (answer.toUpperCase() === 'EXIT') {
                    break;
                }
                aQuiz.addScore(qst.checkAnswer(answer));
                aQuiz.displayScore();
            }
            console.log('Final score is: ');
            aQuiz.displayScore();
        }
    }
)();



