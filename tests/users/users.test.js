import { describe, it, expect, vi } from 'vitest';
import { createAccount, isValidUserName, userExists, createUserId } from '../../js/users/account/account';
import exception from '../../error-handling/exceptions';


vi.mock('../../js/users/account/account', () => {
    return {
      isValidUserName: vi.fn(),
      createAccount: vi.fn(),
      userExists: vi.fn(),
      createUserId: vi.fn(),
    };
  });
  
  vi.mock('../../error-handling/exceptions', () => {
    return {
      InvalidUsernameError: vi.fn(),
    };
  });

describe('isValidUserName', () => {
  it('should return false if username is invalid', async () => {
    isValidUserName.mockResolvedValue(false);
    expect(await isValidUserName('invaliduser')).toBe(false);
  });

  it('should return true if username is valid', async () => {
    isValidUserName.mockResolvedValue(true);
    expect(await isValidUserName('validuser@example.com')).toBe(true);
  });
});

