//Pierre-Lot & Marius
import { describe, it, expect, vi, afterEach } from 'vitest';
import getExchangeRate from '../../js/promotions/exchange/exchange';
import exchangeRateProvider from '../../js/promotions/exchange/exchangeRateProvider';
vi.mock('../../js/promotions/exchange/exchangeRateProvider');


describe('getExchangeRate', () => {
  //test case 1
  it('should return correct exchange rate for USD', async () => {
      const mockCallback = vi.fn();
      exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(1.25);

      await getExchangeRate('USD', mockCallback);

      expect(mockCallback).toHaveBeenCalledWith({
          "originalCurrency": "GBP",
          "newCurrency": 'USD',
          "exchangeRate": 1.25
      });
  });

  //test case 2
  it('should return correct exchange rate for EUR', async () => {
      const mockCallback = vi.fn();
      exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(1.18);

      await getExchangeRate('EUR', mockCallback);

      expect(mockCallback).toHaveBeenCalledWith({
          "originalCurrency": "GBP",
          "newCurrency": 'EUR',
          "exchangeRate": 1.18
      });
  });

  //test case 3
  it('should return correct exchange rate for NZD', async () => {
      const mockCallback = vi.fn();
      exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(1.93);

      await getExchangeRate('NZD', mockCallback);

      expect(mockCallback).toHaveBeenCalledWith({
          "originalCurrency": "GBP",
          "newCurrency": 'NZD',
          "exchangeRate": 1.93
      });
  });

  //test case 4
  it('should throw an error for unsupported currency', async () => {
      exchangeRateProvider.callExchangeRateProvider.mockImplementation(() => {
          throw new Error("Currency not supported");
      });

      const mockCallback = vi.fn();

      await expect(getExchangeRate('ABC', mockCallback)).rejects.toThrow("Currency not supported");
      expect(mockCallback).not.toHaveBeenCalled();
  });
});
