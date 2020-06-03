import List from '../List';

describe('Items List', () => {
    test('Add Item', () => {
        const input = [5, 'oz', 'sugar'];
        const expectedItem = {
            id: 42,
            count: 5,
            unit: 'oz',
            ingredient: 'sugar'
        };
        const mockUniqueId = jest.fn().mockReturnValue(42);

        const list = new List(mockUniqueId);
        list.addItem(...input);

        expect(list.items.length).toBe(1);
        expect(list.items[0]).toEqual(expectedItem);

    })

    test('Remove Item', () => {
        const input = 42;
        const items = {
            firstItem: [5, 'oz', 'sugar'],
            secondItem: [12, 'tsp', 'oil'],
            thirdtem: [24, 'g', 'powder'],
            fourthtem: [3, 'cup', 'banana'],
        };
        const mockUniqueId = jest.fn()
            .mockReturnValueOnce(40)
            .mockReturnValueOnce(41)
            .mockReturnValueOnce(42)
            .mockReturnValueOnce(43);

        const list = new List(mockUniqueId);
        for (let itemsKey in items) {
            list.addItem(items[itemsKey]);
        }

        list.deleteItem(42);

        expect(list.items.length).toBe(3);
        expect(list.items.indexOf(42)).toBe(-1);
    })

    test('Update Count', () => {
        const inputIndex = 42;
        const inputNewCount = 50;
        const items = [
            [5, 'oz', 'sugar'],
            [12, 'tsp', 'oil'],
            [24, 'g', 'powder'],
            [3, 'cup', 'banana']
        ];
        const mockUniqueId = jest.fn()
            .mockReturnValueOnce(40)
            .mockReturnValueOnce(41)
            .mockReturnValueOnce(42)
            .mockReturnValueOnce(43);

        const list = new List(mockUniqueId);
        items.forEach(item => {
            list.addItem(item);
        });

        list.updateCount(inputIndex, inputNewCount);

        expect(list.items.length).toBe(items.length);
        expect(list.items.find(value => value.id === inputIndex).count).toBe(inputNewCount);
    })
});
