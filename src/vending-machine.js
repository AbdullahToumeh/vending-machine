class VendingMachine {
  constructor(_itemData, _currentChange) {
    this.itemData = _itemData;
    this.currentChange = _currentChange;
  }

  printInventory() {
    return this.itemData;
  }

  refillInventory() {}

  reSupplyChange() {}

  dispenseInventory() {}

  returnChange() {}
}

module.exports = VendingMachine;
