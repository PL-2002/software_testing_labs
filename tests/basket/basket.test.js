//Pierre-Lot & Marius
import {describe, expect, it} from "vitest"
import { calculateTotal, showAdverts, searchBasket, getBasketItem, createBasketItem, serializeBasketItemsToJson } from '../../js/basket/basket';
import { BasketItem } from '../../js/basket/basketitem';
import { Event} from '../../js/events/event';


describe('calculateTotal()', () => {
  //test case 1
  it('should return 0 if basket is empty', () => {
    expect(calculateTotal([])).toBe(0);
  });

  //test case 2
  it('should return the price of the only item if one item in basket', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date());
    const item = new BasketItem(event, 1);
    expect(calculateTotal([item])).toBe(100);
  });

  //test case 3
  it('should return the total price of all items', () => {
    const event1 = new Event(1, 'Birthday', 100, 10, 5, new Date());
    const event2 = new Event(2, 'Mariage', 50, 20, 15, new Date());
    const item1 = new BasketItem(event1, 1);
    const item2 = new BasketItem(event2, 2);
    expect(calculateTotal([item1, item2])).toBe(200);
  });

  //test case 4
  it('should apply discount if provided', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date());
    const item = new BasketItem(event, 1);
    expect(calculateTotal([item], 10)).toBe(90);
  });
});

describe('showAdverts', () => {
  //test case 1
  it('should return false if user is premium', () => {
    const user = { isPremium: true };
    expect(showAdverts(user)).toBe(false);
  });

  //test case 2
  it('should return true if user is not premium', () => {
    const user = { isPremium: false };
    expect(showAdverts(user)).toBe(true);
  });
});

describe('searchBasket', () => {
  //test case 1
  it('should return items that match the search query', () => {
    const event1 = new Event(1, 'Birthday', 100, 10, 5, new Date());
    const event2 = new Event(2, 'Mariage', 50, 20, 15, new Date());
    const item1 = new BasketItem(event1, 1);
    const item2 = new BasketItem(event2, 2);
    expect(searchBasket([item1, item2], 'Birthday')).toEqual([item1]);
  });

  //test case 2
  it('should return an empty array if no items match the search query', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date());
    const item = new BasketItem(event, 1);
    expect(searchBasket([item], 'Mariage')).toEqual([]);
  });
});

describe('getBasketItem', () => {
  //test case 1
  it('should return the basket item if found', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date());
    const item = new BasketItem(event, 1);
    expect(getBasketItem([item], event)).toEqual(item);
  });

  //test case 2
  it('should return null if the basket item is not found', () => {
    const event1 = new Event(1, 'Birthday', 100, 10, 5, new Date());
    const event2 = new Event(2, 'Mariage', 50, 20, 15, new Date());
    const item = new BasketItem(event1, 1);
    expect(getBasketItem([item], event2)).toBeNull();
  });
});

describe('createBasketItem', () => {
  //test case 1
  it('should create a new basket item if it does not exist in the basket', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date());
    expect(createBasketItem([], event, 2)).toEqual(new BasketItem(event, 2));
  });

  //test case 2
  it('should return null if the basket item already exists', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date());
    const item = new BasketItem(event, 1);
    expect(createBasketItem([item], event, 2)).toBeNull();
  });
});

describe('serializeBasketItemsToJson', () => {
  it('should serialize basket items to JSON', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date());
    const item = new BasketItem(event, 1);
    const expectedOutput = [{ event, ticketCount: 1 }];
    expect(serializeBasketItemsToJson([item])).toEqual(expectedOutput);
  });
});
