//Pierre-Lot & Marius
import {describe, expect, it} from "vitest"
import { today, next7Days, next30Days } from '../../js/events/filters';
import { Event} from '../../js/events/event';

describe('today', () => {
  //test case 1
  it('should return true if event date is today', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date());
    expect(today(event)).toBe(true);
  });

  //test case 2
  it('should return false if event date is not today', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date(Date.now() + 86400000));
    expect(today(event)).toBe(false);
  });
});

describe('next7Days', () => {
  //test case 1
  it('should return true if event date is within the next 7 days', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date(Date.now() + 3 * 86400000));
    expect(next7Days(event)).toBe(true);
  });

  //test case 2
  it('should return false if event date is not within the next 7 days', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date(Date.now() + 10 * 86400000));
    expect(next7Days(event)).toBe(false);
  });
});

describe('next30Days', () => {
  //test case 1
  it('should return true if event date is within the next 30 days', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date(Date.now() + 20 * 86400000));
    expect(next30Days(event)).toBe(true);
  });

  //test case 2
  it('should return false if event date is not within the next 30 days', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date(Date.now() + 40 * 86400000));
    expect(next30Days(event)).toBe(false);
  });
});
