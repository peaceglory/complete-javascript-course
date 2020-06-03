// {
//     function forEach(list, fn) {
//         for (let i = 0; i < list.length; i++) {
//             fn(list[i]);
//         }
//     }
//
//     forEach([1, 2, 3, 4], (el) => console.log(`Hi, ${el}!`));
// }
//
// {
//     function Person(name) {
//         this.name = name;
//     }
//
//     Person.prototype.myFriends6 = function(friends) {
//
//         var arr = friends.map((el) => `${this.name} is friends with ${el}`);
//
//         console.log(arr);
//     }
//
//     var friends = ['Bob', 'Jane', 'Mark'];
//     new Person('John').myFriends6(friends);
// }
//
// {
//     const boxes = document.querySelectorAll('.box');
//     const boxesArr6 = Array.from(boxes);
//     const obj = {
//         name: 'Miro',
//         relatives: ['Eli', 'Bobo']
//     }
//
//     for (const cur of boxesArr6) {
//         if (cur.className.includes('blue')) {
//             continue;
//         }
//         cur.textContent = 'I changed to blue!';
//     }
//
//     for (const key in obj) {
//         // console.log(key);
//         if (key === 'relatives') {
//             obj[key] = ['hoho', 'oops'];
//             console.log(`${key}: ${obj[key]}`);
//         }
//     }
//     console.log(obj);
// }
//
// {
//     function Person(name, age, nationality) {
//         this.nationality = nationality === 'undefined' ? "bulgarian" : nationality;
//         this.name = name;
//         this.age = age;
//     }
//
//     var john = new Person('John', 23, 'american');
//     var ivan = new Person('Ivan', 55);
// }
//
// {
//     const m = new Map();
//     m.set('one', 1);
//     m.set('two', 2);
//     m.set('three', 3);
//
//     m.forEach((value, key) => console.log(`${key} -> ${value}`));
//     // m.entries().forEach(e => console.log(`${e.key} -> ${e.value}`));
//
//     for (let [key, value] of m.entries()) {
//         console.log(`${key} -> ${value}`);
//     }
//
//     for (let key of m.keys()) {
//         console.log(`${key} -> ${m.get(key)}`);
//     }
//
//     for (let e of m.entries()) {
//         console.log(`${e[0]} -> ${e[1]}`);
//     }
//
//     const descriptionByFunction = new Map();
//     const fn1 = () => console.log(this);
//     descriptionByFunction.set(fn1, "Test1");
//
//     console.log(descriptionByFunction.get(fn1));
// }
//
//

// Coding challange

{
    const StreetSizes = {
        TINY: 'tiny',
        SMALL: 'small',
        NORMAL: 'normal',
        BIG: 'big',
        HUGE: 'huge'
    }

    if (Object.freeze) {
        Object.freeze(StreetSizes);
    }

    class CityProperty {

        constructor(name, buildYear) {
            this.name = name;
            this.buildYear = buildYear;
        }
    }

    class Park extends CityProperty {

        constructor(name, buildYear, area, numberOfTrees) {
            super(name, buildYear);
            this.area = area;
            this.numberOfTrees = numberOfTrees;
        }

        treeDensity() {
            return (this.numberOfTrees / this.area).toFixed(2);
        }

        calculateAge() {
            return new Date().getFullYear() - this.buildYear;
        }

        addTrees(newTrees) {
            this.numberOfTrees += newTrees;
        }
    }

    class Street extends CityProperty {

        constructor(name, buildYear, length, sizeEval) {
            super(name, buildYear);
            this.length = length;
            this.sizeEval = sizeEval;
        }

        evaluateSize() {
            return this.sizeEval(this.length);
        }
    }

    const southPark = new Park('South Park', 2001, 700, 10000);
    const centralPark = new Park('Central Park', 2015, 100, 500);
    const northPark = new Park('North Park', 1989, 500, 6000);

    const parksByName = new Map();
    parksByName.set(southPark.name, southPark);
    parksByName.set(centralPark.name, centralPark);
    parksByName.set(northPark.name, northPark);

    const sizeEvaluator = streetLength => {
        if (streetLength) {
            if (streetLength < 500) {
                return StreetSizes.TINY;
            }
            if (streetLength < 1200 && streetLength > 500) {
                return StreetSizes.SMALL;
            }
            if (streetLength < 3000 && streetLength > 1200) {
                return StreetSizes.NORMAL;
            }
            if (streetLength < 6000 && streetLength > 3000) {
                return StreetSizes.BIG;
            }
            if (streetLength > 6000) {
                return StreetSizes.HUGE;
            }
        }
        return StreetSizes.NORMAL;
    }

    const dondukovStr = new Street('Dondukov', 1975, 5600, sizeEvaluator);
    const vitoshaStr = new Street('Vitosha', 1982, 7500, sizeEvaluator);
    const geoMilevStr = new Street('Geo Milev', 1979, 1300, sizeEvaluator);
    const kopernikStr = new Street('Nikolay Kopernik', 1965, 1000, sizeEvaluator);

    const streetsByName = new Map();
    streetsByName.set(dondukovStr.name, dondukovStr);
    streetsByName.set(vitoshaStr.name, vitoshaStr);
    streetsByName.set(geoMilevStr.name, geoMilevStr);
    streetsByName.set(kopernikStr.name, kopernikStr);

    function reportTreeDensity(...parks) {
        console.log('*** REPORTING TREE DENSITY ***');

        for (let park of parks) {
            console.log(`Park \'${park.name}\' has density: ${park.getTreeDensity()}`);
        }
    }

    function reportParkAverageAge(...parks) {
        console.log('*** REPORTING PARK AVERAGE AGE ***');

        const sumAges = parks.map(park => park.calculateAge())
                             .reduce((prev, curr) => prev + curr, 0);

        console.log(`Average park age: ${(sumAges / parks.length).toFixed(2)}`);
    }

    function reportParksWithMoreTrees(treeNum, ...parks) {
        console.log(`*** REPORTING PARKS WITH TREES MORE THAN ${treeNum} ***`);

        parks.forEach(park => {
            if (park.numberOfTrees >= treeNum) {
                console.log(`Park \'${park.name}\' has ${park.numberOfTrees} trees`);
            }
        });

    }

    function reportTotalAndAverageStreetLength(...streets) {
        console.log('*** REPORTING TOTAL AND AVERAGE STREET LENGTH ***');
        let totalLength = 0;
        streets.forEach(street => totalLength += street.length);
        console.log(`Total street length: ${totalLength}`);
        console.log(`Average street length: ${(totalLength / streets.length).toFixed(2)}`);
    }

    function reportStreetSizes(...streets) {
        console.log('*** REPORTING STREET SIZES ***');
        streets.forEach(street => console.log(`Street \'${street.name}\' is evaluated as ${street.evaluateSize()}`));
    }

    reportTreeDensity(...parksByName.values());
    reportParkAverageAge(...parksByName.values());
    reportParksWithMoreTrees(1000, ...parksByName.values());

    reportTotalAndAverageStreetLength(...streetsByName.values());
    reportStreetSizes(...streetsByName.values());
}

