//Pierre-Lot & Marius
import { describe, it, expect, vi } from 'vitest';
import { getPurchaseHistory, parsePurchaseResponse } from '../../js/users/account/purchaseHistory/purchaseHistory';
import { Purchase } from '../../js/users/account/account';

// Mock purchaseHistory module
vi.mock('../../js/users/account/purchaseHistory/purchaseHistory', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getPurchaseHistory: vi.fn(() => ({
      readyState: 4,
      response: {
        events: [
          {
            name: "Punk Goes Pop - 90s",
            tickets: 2,
            price: 40.00,
          },
          {
            name: "Adventures Live!",
            tickets: 5,
            price: 120.00,
          },
          {
            name: "Folk dance party!",
            tickets: 3,
            price: 75.00,
          }
        ]
      }
    }))
  };
});


describe('parsePurchaseResponse', () => {
  it('should transform the purchase data into an array of Purchase objects', () => {
    // Arrange
    const purchaseData = [
      { event: 'Punk Goes Pop - 90s', tickets: 2, price: 40.00 },
      { event: 'Adventures Live!', tickets: 5, price: 120.00 },
      { event: 'Folk dance party!', tickets: 3, price: 75.00 },
    ];

    // Act
    const result = parsePurchaseResponse(purchaseData);

    // Assert
    expect(result).toEqual([
      new Purchase('Punk Goes Pop - 90s', 2, 40.00),
      new Purchase('Adventures Live!', 5, 120.00),
      new Purchase('Folk dance party!', 3, 75.00),
    ]);
  });
});
