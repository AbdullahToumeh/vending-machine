const VendingMachine = require('../src/vending-machine.js');
const ItemData = require('../__mocks__/item-data.json');

describe('Vending Machine', () => {
  beforeEach(() => {
    test = {};
    test.machineChange = {
      '0.05': 5,
      '0.10': 5,
      '0.25': 8,
      '1.00': 4,
      '2.00': 5
    };
    test.refillKey = 'A1';
    test.refillAmount = 5;
    test.refillData = {
      key: test.refillKey,
      'item-name': 'All dressed chips',
      price: 1.25,
      stock: 10
    };
    test.itemData = JSON.parse(JSON.stringify(ItemData));
    test.subject = new VendingMachine(test.itemData, test.machineChange);
  });

  describe('When a user requests to see inventory', () => {
    it('Should display a list of the inventory with all item information', () => {
      const result = test.subject.printInventory();
      expect(result).toEqual(test.itemData);
    });
  });

  describe('When maintenance refills an item using the item key', () => {
    it('Should return an error if no item exists at that location', () => {
      const result = test.subject.refillInventory('C1', 5);
      expect(result).toEqual('No item exists at that key');
    });
    it('Should return feedback on the new inventory of that item if it exists.', () => {
      const result = test.subject.refillInventory(
        test.refillKey,
        test.refillAmount
      );
      expect(result).toEqual(test.refillData);
    });
  });
});
