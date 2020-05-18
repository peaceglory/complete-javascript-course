///////////////////////////////////////
// Lecture: Hoisting

var person ={
    name: 'miro',
    doThis: function () {
        console.log(this);

        var doThisVar = this;

        doThat();

        function doThat() {
            console.log(this);
            if (doThisVar === this) {
                console.log('doThisVar === doThatVar')
            } else {
                console.log('doThisVar !== doThatVar')
            }
        }
    }
}

var person2 = {
    name: 'Haho'
}

person2.doThis = person.doThis;

function getPerson(person) {
    console.log(this);
    person.doThis();
}

person2.doThis();

getPerson(person2);

console.log('haha');










///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









