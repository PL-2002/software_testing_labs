//Pierre-Lot & Marius
import { describe, it, expect, vi } from 'vitest';
import { calculatePercentageDiscount, calculateMoneyOff, generateReferralCode, applyDiscount } from '../../js/promotions/promotions';
import { getDiscount } from '../../js/promotions/discount/discount';

vi.mock('../../js/promotions/discount/discount');

describe('calculatePercentageDiscount', () => {
  //test case 1
  it('should apply percentage discount if currentPrice is greater than or equal to minimumSpend', () => {
      expect(calculatePercentageDiscount(20, 100, 200)).toBe(160);
  });

  //test case 2
  it('should return currentPrice if currentPrice is less than minimumSpend', () => {
      expect(calculatePercentageDiscount(20, 100, 50)).toBe(50);
  });
});

describe('calculateMoneyOff', () => {
  //test case 1
  it('should apply money off discount if currentPrice is greater than or equal to minimumSpend', () => {
      expect(calculateMoneyOff(30, 100, 150)).toBe(120);
  });

  //test case 2
  it('should return currentPrice if currentPrice is less than minimumSpend', () => {
      expect(calculateMoneyOff(30, 100, 80)).toBe(80);
  });
});

describe('generateReferralCode', () => {
  //test case 1
  it('should generate a referral code with the userId', () => {
      const userId = '12345';
      const referralCode = generateReferralCode(userId);
      expect(referralCode).toMatch(new RegExp(`#FRIEND-#\\d{3}-#${userId}`));
  });
});

describe('applyDiscount', () => {
  //test case 1
  it('should apply MONEYOFF discount if the discount code is valid', async () => {
      const discountCode = 'MONEYOFF123';
      const currentTotal = 200;

      getDiscount.mockResolvedValue({
          data: {
              isValid: true,
              type: 'MONEYOFF',
              value: 50,
              minSpend: 100
          }
      });

      const newTotal = await applyDiscount(discountCode, currentTotal);
      expect(newTotal).toBe(150);
  });

  //test case 2
  it('should apply PERCENTAGEOFF discount if the discount code is valid', async () => {
      const discountCode = 'PERCENTAGEOFF123';
      const currentTotal = 200;

      getDiscount.mockResolvedValue({
          data: {
              isValid: true,
              type: 'PERCENTAGEOFF',
              value: 20,
              minSpend: 100
          }
      });

      const newTotal = await applyDiscount(discountCode, currentTotal);
      expect(newTotal).toBe(160);
  });

  //test case 3
  it('should return currentTotal if the discount code is invalid', async () => {
      const discountCode = 'INVALIDCODE';
      const currentTotal = 200;

      getDiscount.mockResolvedValue({
          data: {
              isValid: false
          }
      });

      const newTotal = await applyDiscount(discountCode, currentTotal);
      expect(newTotal).toBe(currentTotal);
  });
});
