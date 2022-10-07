import { AccountName } from './account-name-value-objec';

describe('AccountName', () => {
  test('Should return left if name is not provided', () => {
    const response = AccountName.create('');
    expect(response.isLeft()).toBe(true);
  });
});
