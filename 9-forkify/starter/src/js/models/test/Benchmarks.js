const benchmarkArr = size => {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(`This is value number ${i}`);
    }

    console.log('Benchmark Arr START');
    console.time('Benchmark Arr END');
    for (let i = 0; i < size; i++) {
        const rand = Math.random() * size;
        const toFind = `This is value number ${rand}`;
        arr.find(el => el === toFind);
    }
    console.timeEnd('Benchmark Arr END');
}

const benchmarkSet = size => {
    const set = new Set()
    for (let i = 0; i < size; i++) {
        set.add(`This is value number ${i}`);
    }

    console.log('Benchmark Set START');
    console.time('Benchmark Set END');
    for (let i = 0; i < size; i++) {
        const rand = Math.random() * size;
        const toFind = `This is value number ${rand}`;
        set.has(toFind);
    }
    console.timeEnd('Benchmark Set END');
}

const benchmarkMap = size => {
    const map = new Map()
    for (let i = 0; i < size; i++) {
        map.set(`This is value number ${i}`, i);
    }

    console.log('Benchmark Map START');
    console.time('Benchmark Map END');
    for (let i = 0; i < size; i++) {
        const rand = Math.random() * size;
        const toFind = `This is value number ${rand}`;
        map.get(toFind);
    }
    console.timeEnd('Benchmark Map END');
}

const size = 10000;

benchmarkArr(size);
benchmarkSet(size);
benchmarkMap(size);