import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getDiscount } from '../../js/promotions/discount/discount';

describe('getDiscount', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    it('should return discount data when called with a valid code', async () => {
        const discountData = { discount: 10 };
        mock.onGet('/discount', { params: { code: 'VALIDCODE' } }).reply(200, discountData);

        const response = await getDiscount('VALIDCODE');
        expect(response).toEqual(discountData);
    });

    it('should handle errors properly', async () => {
        mock.onGet('/discount', { params: { code: 'INVALIDCODE' } }).reply(404);

        await expect(getDiscount('INVALIDCODE')).rejects.toThrow();
    });
});
