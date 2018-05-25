class VendingMachine {
  constructor(_itemData, _currentChange) {
    this.itemData = _itemData;
    this.currentChange = _currentChange;
  }

  printInventory() {
    return this.itemData;
  }

  refillInventory(itemKey, itemAmount) {
    const refillItem = this.itemData.filter(item => item.key === itemKey);

    if (refillItem.length) {
      for (let i = 0; i <= this.itemData.length; i++) {
        if (this.itemData[i].key === refillItem[0].key) {
          this.itemData[i].stock += itemAmount;
          return this.itemData[i];
        }
      }
    }

    return 'No item exists at that key';
  }

  reSupplyChange() {}

  dispenseInventory() {}

  returnChange() {}
}

module.exports = VendingMachine;
