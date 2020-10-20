import { Item, Shop } from "../src/gilded_rose";
import { AGED_BRIE, BACKSTAGE, DEFAULT_ITEM, SULFURAS, CONJURED } from "../src/constants";

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe("default item", function () {
  it("should decrease sellIn for default item by 1", function () {
    const gildedRose = new Shop([new Item(DEFAULT_ITEM, 5, 9)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(4);
  });

  it("should decrease sellIn for default item to negative number", function () {
    const gildedRose = new Shop([new Item(DEFAULT_ITEM, 0, 9)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
  });

  it("should decrease quality for default item by 1", function () {
    const gildedRose = new Shop([new Item(DEFAULT_ITEM, 5, 9)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(8);
  });

  it("should decrease quality for default item by 2 when sellIn is <= 0", function () {
    const gildedRose = new Shop([new Item(DEFAULT_ITEM, 0, 9)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(7);
  });

  it("should not decrease quality value when quality is 0", function () {
    const gildedRose = new Shop([new Item(DEFAULT_ITEM, 5, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });
});

describe("Aged Brie", function () {
  it("should increase quality for Aged Brie by 1", function () {
    const gildedRose = new Shop([new Item(AGED_BRIE, 5, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(1);
  });

  it("should increase quality for Aged Brie by 2 when it expire", function () {
    const gildedRose = new Shop([new Item(AGED_BRIE, -1, 41)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(43);
  });

  it("should not increase quality of Aged Brie over 50", function () {
    const initialItems = [
      new Item(AGED_BRIE, 5, 50),
      new Item(AGED_BRIE, 5, 49),
      new Item(AGED_BRIE, -5, 48),
      new Item(AGED_BRIE, -5, 50),
    ];

    const gildedRose = new Shop(initialItems);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
    expect(items[2].quality).toBe(50);
    expect(items[3].quality).toBe(50);
  });
});
//
// describe("Sulfuras, Legendary item", function () {
//   it("should not change any value for legendary item", function () {
//     const testingItems = [
//       new Item(SULFURAS, 0, 80),
//       new Item(SULFURAS, -1, 80),
//       new Item(SULFURAS, 5, 80),
//     ];
//
//     const gildedRose = new Shop(testingItems);
//     const items = gildedRose.updateQuality();
//
//     expect(items[0].quality).toBe(80);
//     expect(items[0].sellIn).toBe(0);
//
//     expect(items[1].quality).toBe(80);
//     expect(items[1].sellIn).toBe(-1);
//
//     expect(items[2].quality).toBe(80);
//     expect(items[2].sellIn).toBe(5);
//   });
// });
//
// describe("Backstage passes to a TAFKAL80ETC concert item", function () {
//   it("should increase quality by 2 when sellIn is 10 days or less but more than 5 days", function () {
//     const gildedRose = new Shop([new Item(BACKSTAGE, 10, 10)]);
//     const items = gildedRose.updateQuality();
//
//     expect(items[0].quality).toBe(12);
//   });
//
//   it("should increase quality by 3 when sellIn is 5 days or less but more than 0 days", function () {
//     const gildedRose = new Shop([new Item(BACKSTAGE, 5, 10)]);
//     const items = gildedRose.updateQuality();
//
//     expect(items[0].quality).toBe(13);
//   });
//
//   it("should set quality to 0 after the concert", function () {
//     const gildedRose = new Shop([new Item(BACKSTAGE, 0, 10)]);
//     const items = gildedRose.updateQuality();
//
//     expect(items[0].quality).toBe(0);
//   });
// });
//
// describe("Conjured Mana Cake item", function () {
//   it("should decrease quality for Conjured item by 2", function () {
//     const gildedRose = new Shop([new Item(CONJURED, 3, 6)]);
//     const items = gildedRose.updateQuality();
//
//     /**
//      * TODO this one is failing because it is still to add logic for decreasing quality
//      */
//     expect(items[0].quality).toBe(4);
//   });
//
//   it("should decrease quality for stored item by 4 when expired", function () {
//     const gildedRose = new Shop([new Item(CONJURED, -3, 6)]);
//     const items = gildedRose.updateQuality();
//
//     /**
//      * TODO this one is failing because it is still to add logic for decreasing quality
//      */
//     expect(items[0].quality).toBe(2);
//   });
// });
