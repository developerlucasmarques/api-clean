import { left } from '../../either/either';
import { InvalidNameError } from '../../errors/invalid-name';
import { AccountName } from './account-name-value-objec';

describe('AccountName', () => {
  test('Should return left with InvalidNameError if name is not provided', () => {
    const response = AccountName.create('');
    const leftError = left(new InvalidNameError(`Account name not informed`));
    expect(response.value).toEqual(leftError.value);
  });
});
