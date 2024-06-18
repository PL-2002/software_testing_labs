//Pierre-Lot & Marius
import { Event, isSoldOut, getTagLine, createEvent } from '../../js/events/event';
import { InvalidEventNameError, InvalidEventPriceError } from '../../js/error-handling/exceptions';
import {describe, expect, it} from "vitest"

describe('createEvent', () => {
  //test case 1
  it('should create an event with valid parameters', () => {
    const event = createEvent('Birthday', 100, 10);
    expect(event.name).toBe('Birthday');
    expect(event.ticketPrice).toBe(100);
    expect(event.totalTickets).toBe(10);
  });

  //test case 2
  it('should throw InvalidEventNameError if name is invalid', () => {
    expect(() => createEvent(123, 100, 10)).toThrow(InvalidEventNameError);
    expect(() => createEvent('A'.repeat(201), 100, 10)).toThrow(InvalidEventNameError);
  });

  //test case 3
  it('should throw InvalidEventPriceError if price is invalid', () => {
    expect(() => createEvent('Birthday', -1, 10)).toThrow(InvalidEventPriceError);
  });

  //test case 4
  it('should throw InvalidEventPriceError if availableTickets is invalid', () => {
    expect(() => createEvent('Birthday', 100, 0)).toThrow(InvalidEventPriceError);
  });
});

describe('isSoldOut', () => {
  //test case 1
  it('should return true if the event is sold out', () => {
    const event = new Event(1, 'Birthday', 100, 10, 0, new Date());
    expect(isSoldOut(event)).toBe(true);
  });

  //test case 2
  it('should return false if the event is not sold out', () => {
    const event = new Event(1, 'Birthday', 100, 10, 5, new Date());
    expect(isSoldOut(event)).toBe(false);
  });
});

describe('getTagLine', () => {
  //test case 1
  it('should return "Event Sold Out!" if the event is sold out', () => {
    const event = new Event(1, 'Birthday', 100, 10, 0, new Date());
    expect(getTagLine(event, 5, true)).toBe("Event Sold Out!");
  });

  //test case 2
  it('should return "Hurry only x tickets left!" if tickets remaining are less than minimumTicketCount', () => {
    const event = new Event(1, 'Birthday', 100, 10, 3, new Date());
    expect(getTagLine(event, 5, true)).toBe("Hurry only 3 tickets left!");
  });

  //test case 3
  it('should return popular event tagline if isPopular is true', () => {
    const event = new Event(1, 'Birthday', 100, 10, 10, new Date());
    expect(getTagLine(event, 5, true)).toBe("This Event is getting a lot of interest. Don't miss out, purchase your ticket now!");
  });

  //test case 4
  it('should return regular tagline if the event is not popular', () => {
    const event = new Event(1, 'Birthday', 100, 10, 10, new Date());
    expect(getTagLine(event, 5, false)).toBe("Don't miss out, purchase your ticket now!");
  });
});
