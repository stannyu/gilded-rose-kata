import {
  AGED_BRIE,
  BACKSTAGE,
  EXPIRE,
  LEGENDARY_ITEM_VALUE,
  MAX_ITEM_VALUE,
  MIN_ITEM_VALUE,
  SULFURAS,
} from "./constants";

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function setMaxQuality(quality) {
  return quality > MAX_ITEM_VALUE ? MAX_ITEM_VALUE : quality;
}

function setMinQuality(quality) {
  return quality < MIN_ITEM_VALUE ? MIN_ITEM_VALUE : quality;
}

function handleAgedBrieItem(item) {
  let newQuality = item.sellIn < EXPIRE ? item.quality + 2 : item.quality + 1;
  item.quality = setMaxQuality(newQuality);

  return item;
}

function handleDefaultItem(item) {
  const newQuality = item.sellIn <= EXPIRE ? item.quality - 2 : item.quality - 1;
  item.quality = setMinQuality(newQuality);
  item.sellIn = item.sellIn - 1;
  return item;
}

function handleLegendaryItem(item) {
  item.quality = LEGENDARY_ITEM_VALUE;
  return item;
}

function handleBackstageItem(item) {
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
      case SULFURAS:
        return handleLegendaryItem(item);
      case BACKSTAGE:
        return handleBackstageItem(item);
      default:
        return handleDefaultItem(item);
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
