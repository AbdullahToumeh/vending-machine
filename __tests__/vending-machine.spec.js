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
    test.itemData = JSON.stringify(ItemData);
    test.subject = new VendingMachine(test.itemData, test.machineChange);
  });
  describe('When a user requests to see inventory', () => {
    it('Should display a list of the inventory with all item information', () => {
      const result = test.subject.printInventory();
      expect(result).toEqual(test.itemData);
    });
  });
});
