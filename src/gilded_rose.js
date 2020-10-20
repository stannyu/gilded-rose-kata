import { AGED_BRIE, BACKSTAGE, CONJURED, EXPIRE, LEGENDARY_ITEM_VALUE, SULFURAS } from "./constants";
import { getItemName, setMaxQuality, setMinQuality } from "./utils";

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.map(this.updateSingleItem.bind(this));
    return this.items;
  }

  updateSingleItem(item) {
    const name = getItemName(item);
    switch (name) {
      case AGED_BRIE:
        return this._handleAgedBrieItem(item);
      case SULFURAS:
        return this._handleLegendaryItem(item);
      case BACKSTAGE:
        return this._handleBackstageItem(item);
      case CONJURED:
        return this._handleConjuredItem(item);
      default:
        return this._handleDefaultItem(item);
    }
  }

  _handleAgedBrieItem(item) {
    let newQuality = item.sellIn < EXPIRE ? item.quality + 2 : item.quality + 1;
    item.quality = setMaxQuality(newQuality);

    return item;
  }

  _handleLegendaryItem(item) {
    item.quality = LEGENDARY_ITEM_VALUE;
    return item;
  }

  _handleBackstageItem(item) {
    const { sellIn, quality } = item;
    let newQuality = quality;

    if (5 < sellIn && sellIn <= 10) {
      newQuality = newQuality + 2;
    } else if (0 < sellIn && sellIn <= 5) {
      newQuality = newQuality + 3;
    } else if (sellIn <= 0) {
      newQuality = 0;
    }

    item.quality = newQuality;
    item.sellIn = item.sellIn - 1;

    return item;
  }

  _handleConjuredItem(item) {
    const newQuality = item.sellIn <= EXPIRE ? item.quality - 4 : item.quality - 2;
    item.quality = setMinQuality(newQuality);
    item.sellIn = item.sellIn - 1;
    return item;
  }

  _handleDefaultItem(item) {
    const newQuality = item.sellIn <= EXPIRE ? item.quality - 2 : item.quality - 1;
    item.quality = setMinQuality(newQuality);
    item.sellIn = item.sellIn - 1;
    return item;
  }
}

export { Item, Shop };
