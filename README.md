```
import { getUserRef } from '../path-to-your-file';
import { getItem } from '../path-to-storage';
import { AccessTokenKeys } from '../path-to-constants';

jest.mock('../path-to-storage', () => ({
  getItem: jest.fn(),
}));

describe('getUserRef', () => {
  it('should return the stored user reference', () => {
    getItem.mockReturnValue('user-ref-123');

    const result = getUserRef();
    expect(result).toBe('user-ref-123');
    expect(getItem).toHaveBeenCalledWith(AccessTokenKeys.ref);
  });

  it('should return undefined if no reference is stored', () => {
    getItem.mockReturnValue(undefined);

    const result = getUserRef();
    expect(result).toBeUndefined();
    expect(getItem).toHaveBeenCalledWith(AccessTokenKeys.ref);
  });
});
