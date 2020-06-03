import uniqid from 'uniqid';

export default class List {
    constructor(idGen) {
        this.items = [];
        this.idGen = idGen;
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: this.idGen(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const indexToDelete = this.items.findIndex(item => item.id === id);
        this.items.splice(indexToDelete, 1);
    }

    updateCount(id, newCount) {
        const itemToUpdate = this.items.find(item => item.id === id);
        itemToUpdate.count = newCount;
    }
}