import {AGED_BRIE, BACKSTAGE, EXPIRE, MAX_ITEM_VALUE, SULFURAS} from "./constants";

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function handleAgedBrieItem(item) {
  let newQuality = item.sellIn < EXPIRE ? item.quality + 2 : item.quality + 1;
  if (newQuality > MAX_ITEM_VALUE) {
    newQuality = MAX_ITEM_VALUE;
  }
  item.quality = newQuality;

  return item;
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.map(this.updateSingleItem);

    return this.items;
  }

  updateSingleItem(item) {
    switch (item.name) {
      case AGED_BRIE:
        return handleAgedBrieItem(item);
      default:
        return item;
    }

    // if (item.name != AGED_BRIE && item.name != BACKSTAGE) {
    //   if (item.quality > 0) {
    //     if (item.name != SULFURAS) {
    //       item.quality = item.quality - 1;
    //     }
    //   }
    // } else {
    //   if (item.quality < 50) {
    //     item.quality = item.quality + 1;
    //     if (item.name == BACKSTAGE) {
    //       if (item.sellIn < 11) {
    //         if (item.quality < 50) {
    //           item.quality = item.quality + 1;
    //         }
    //       }
    //       if (item.sellIn < 6) {
    //         if (item.quality < 50) {
    //           item.quality = item.quality + 1;
    //         }
    //       }
    //     }
    //   }
    // }
    // if (item.name != SULFURAS) {
    //   item.sellIn = item.sellIn - 1;
    // }
    // if (item.sellIn < 0) {
    //   if (item.name != AGED_BRIE) {
    //     if (item.name != BACKSTAGE) {
    //       if (item.quality > 0) {
    //         if (item.name != SULFURAS) {
    //           item.quality = item.quality - 1;
    //         }
    //       }
    //     } else {
    //       item.quality = item.quality - item.quality;
    //     }
    //   } else {
    //     if (item.quality < 50) {
    //       item.quality = item.quality + 1;
    //     }
    //   }
    // }
  }
}

export { Item, Shop };
