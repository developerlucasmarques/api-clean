import { left } from '../../either/either';
import { InvalidNameError } from '../../errors/invalid-name';
import { AccountName } from './account-name-value-objec';

describe('AccountName', () => {
  test('Should return left with InvalidNameError if name is not provided', () => {
    const response = AccountName.create('');
    const leftError = left(new InvalidNameError(`Account name not informed`));
    expect(response.value).toEqual(leftError.value);
  });

  test('Should return left with InvalidNameError if name is less than 2 characters', () => {
    const response = AccountName.create('A');
    const leftError = left(
      new InvalidNameError(`Account name must contain between 2 and 100 characters`)
    );
    expect(response.value).toEqual(leftError.value);
  });
});
