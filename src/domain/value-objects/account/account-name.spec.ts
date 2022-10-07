import { left } from '../../either/either';
import { InvalidNameError } from '../../errors/invalid-name';
import { AccountName } from './account-name';

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

  test('Should return left with InvalidNameError if name contains number', () => {
    const response = AccountName.create('invalid2 name');
    const leftError = left(new InvalidNameError(`Account name must not contain numbers`));
    expect(response.value).toEqual(leftError.value);
  });

  test('Should create name with no white spaces in edges', () => {
    const response = AccountName.create(' any_name  ');
    expect(response.value).toEqual({ name: 'any_name' });
  });

  test('Should create name with if name passes validations', () => {
    const response = AccountName.create('valid_name');
    expect(response.value).toEqual({ name: 'valid_name' });
  });
});
