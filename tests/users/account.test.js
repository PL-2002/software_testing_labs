//Pierre-Lot & Marius
import { describe, it, expect, vi } from 'vitest';
import { getPurchaseHistory, parsePurchaseResponse } from '../../js/users/account/purchaseHistory/purchaseHistory';
import { Purchase } from '../../js/users/account/account';

describe('account', () => {
    //test case 1
    it('should create a valid Purchase instance', () => {
        const purchase = new Purchase('Birthday', 2, 50);
        expect(purchase.eventName).toBe('Birthday');
        expect(purchase.tickets).toBe(2);
        expect(purchase.cost).toBe(50);
    });

    //test case 2
    it('should parse purchase response correctly', () => {
        const purchaseData = [
            { event: 'Birthday', tickets: 2, price: 50 },
            { event: 'fiest', tickets: 3, price: 75 },
        ];
        const purchases = parsePurchaseResponse(purchaseData);

        expect(purchases).toEqual([
            new Purchase('Birthday', 2, 50),
            new Purchase('fiest', 3, 75),
        ]);
    });
});
