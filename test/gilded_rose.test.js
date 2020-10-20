import { Item, Shop } from '../src/gilded_rose';

describe('Gilded Rose', function () {
  it('should foo', function () {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('default item', function () {
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