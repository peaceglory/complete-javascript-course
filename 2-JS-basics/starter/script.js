var person = {
    name: 'Miro',
    lastName: 'Manch',
    birthyear: 1982,
    familyMembers: ['Eli', 'Boril'],
    address: {
        street: 'Deyan Belishki',
        floor: 4
    },
    calcAge: function (now) {
        this.age = this.age + (now - this.birthyear)
        return this.age
    }
}

person.age = 0
while (person.age < 10) {
    console.log(person.age);
    person.age++;
}
