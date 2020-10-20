import { Item, Shop } from '../src/gilded_rose';

describe('Gilded Rose', function () {
  it('should foo', function () {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('default item', function () {
  it('should decrease sellIn for default item by 1', function () {
    const gildedRose = new Shop([new Item('default', 5, 9)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(4);
  });

  it('should decrease sellIn for default item to negative number', function () {
    const gildedRose = new Shop([new Item('default', 0, 9)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
  });

  it('should decrease quality for default item by 1', function () {
    const gildedRose = new Shop([new Item('default', 5, 9)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(8);
  });

  it('should decrease quality for default item by 2 when sellIn is <= 0', function () {
    const gildedRose = new Shop([new Item('default', 0, 9)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(7);
  });

  it('should not decrease quality value when quality is 0', function () {
    const gildedRose = new Shop([new Item('default', 5, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });
});

describe('Aged Brie', function () {
  it('should increase quality for Aged Brie by 1', function () {
    const gildedRose = new Shop([new Item('Aged Brie', 5, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(1);
  });

  it('should increase quality for Aged Brie by 2 when it expire', function () {
    const gildedRose = new Shop([new Item('Aged Brie', -1, 41)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(43);
  });

  it('should not increase quality of Aged Brie over 50', function () {
    const initialItems = [
      new Item('Aged Brie', 5, 50),
      new Item('Aged Brie', 5, 49),
      new Item('Aged Brie', -5, 48),
      new Item('Aged Brie', -5, 50),
    ];

    const gildedRose = new Shop(initialItems);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
    expect(items[2].quality).toBe(50);
    expect(items[3].quality).toBe(50);
  });
});

describe('Sulfuras, Legendary item', function () {
  it('should not change any value for legendary item', function () {
    const testingItems = [
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Sulfuras, Hand of Ragnaros', -1, 80),
      new Item('Sulfuras, Hand of Ragnaros', 5, 80),
      new Item('Sulfuras, Hand of Ragnaros', 5, 20),
    ];

    const gildedRose = new Shop(testingItems);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);

    expect(items[1].quality).toBe(80);
    expect(items[1].sellIn).toBe(-1);

    expect(items[2].quality).toBe(80);
    expect(items[2].sellIn).toBe(5);

    expect(items[3].quality).toBe(20);
    expect(items[3].sellIn).toBe(5);
  });
});
