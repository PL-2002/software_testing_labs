//Pierre-Lot & Marius
import {describe, expect, it} from "vitest"
import { Event } from '../../js/events/event';
import getEvents from '../../js/events/search';

describe('getEvents', () => {
  //test case 1
  it('should filter events with a valid search predicate', () => {
    const events = [
      new Event(1, 'Birthday', 100, 1000, 500, new Date('2023-06-01')),
      new Event(2, 'Mariage', 50, 500, 100, new Date('2023-06-15')),
      new Event(3, 'Feast', 75, 750, 400, new Date('2023-06-01')),
    ];
    const searchPredicate = (event) => event.date.getDate() === 1;
    const filteredEvents = getEvents(events, searchPredicate);
    expect(filteredEvents.length).toBeLessThanOrEqual(events.length);
    expect(filteredEvents).toEqual([
      new Event(1, 'Birthday', 100, 1000, 500, new Date('2023-06-01')),
      new Event(3, 'Feast', 75, 750, 400, new Date('2023-06-01')),
    ]);
  });

//test case 2
  it('should return an empty array when filtering an empty events array', () => {
    const events = [];
    const searchPredicate = (event) => event.date.getDate() === 1;
    const filteredEvents = getEvents(events, searchPredicate);
    expect(filteredEvents).toEqual([]);
  });

//test case 3
  it('should throw an error when using an invalid search predicate', () => {
    const events = [
      new Event(1, 'Birthday', 100, 1000, 500, new Date('2023-06-01')),
      new Event(2, 'Mariage', 50, 500, 100, new Date('2023-06-15')),
      new Event(3, 'Feast', 75, 750, 400, new Date('2023-06-01')),
    ];
    const invalidSearchPredicate = null;
    expect(() => getEvents(events, invalidSearchPredicate)).toThrow();
  });

  //test case 4
  it('should return all events when the search predicate always returns true', () => {
    const events = [
      new Event(1, 'Birthday', 100, 1000, 500, new Date('2023-06-01')),
      new Event(2, 'Mariage', 50, 500, 100, new Date('2023-06-15')),
      new Event(3, 'Feast', 75, 750, 400, new Date('2023-06-01')),
    ];
    const searchPredicate = () => true;
    const filteredEvents = getEvents(events, searchPredicate);

    expect(filteredEvents).toEqual(events);
  });
});