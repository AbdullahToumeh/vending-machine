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

  reSupplyChange(refillChange) {
    if (typeof refillChange !== 'object') {
      return 'That is an invalid change amount';
    }

    const changeKeys = Object.keys(refillChange);

    changeKeys.map(
      changeKey => (this.currentChange[changeKey] += refillChange[changeKey])
    );

    return this.currentChange;
  }

  dispenseInventory(clickedButton, inputChange) {
    let returnedItem = { item: '', change: {} };
    let totalGiven = 0;

    let totalChange = 0;

    if (typeof inputChange !== 'object') {
      return 0;
    }

    //create the total given change based on the change they inputted
    Object.keys(inputChange).map(
      coin => (totalGiven += Number(coin) * inputChange[coin])
    );

    for (let i = 0; i < this.itemData.length; i++) {
      if (this.itemData[i].key === clickedButton) {
        returnedItem.item = this.itemData[i].itemname;
        if (this.itemData[i].stock === 0) {
          returnedItem.item = 'Item Empty';
          returnedItem.change = inputChange;
          return returnedItem;
        } else if (this.itemData[i].price === totalGiven) {
          this.itemData[i].stock -= 1;
          return returnedItem;
        } else if (this.itemData[i].price > totalGiven) {
          returnedItem.item = 'Insufficient Funds';
          returnedItem.change = inputChange;
          return returnedItem;
        } else {
          this.itemData[i].stock -= 1;
          totalChange = totalGiven - this.itemData[i].price;
        }
      }
    }

    if (returnedItem.item === '') {
      returnedItem.item = 'Invalid Button';
      returnedItem.change = inputChange;
      return returnedItem;
    }

    //loops over current change in machine (which is in order from greatest to least - therefore should return smallest amount of coins) and adds it to returned change if theres still change left for that value and its less than or equal to the change they need back.
    for (let i in this.currentChange) {
      returnedItem.change[i] = 0;
      while (this.currentChange[i] > 0 && Number(i) <= totalChange) {
        totalChange -= Number(i);
        returnedItem.change[i] += 1;
        this.currentChange[i] -= 1;
      }
    }

    if (totalChange > 0) {
      totalChange = totalChange.toFixed(2);
      returnedItem.error = `Insufficient change, ${totalChange} still owed`;
    }

    for (let i in returnedItem.change) {
      if (returnedItem.change[i] === 0) {
        delete returnedItem.change[i];
      }
    }

    return returnedItem;
  }

  returnChange() {}
}

module.exports = VendingMachine;
