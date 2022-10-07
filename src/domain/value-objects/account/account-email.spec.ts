import { left } from '../../either/either';
import { InvalidEmailError } from '../../errors/invalid-email';
import { AccountEmail } from './account-email';

describe('AccountEmail', () => {
  test('Should return left with InvalidEmailError if email not provided', () => {
    const response = AccountEmail.create('');
    const leftError = left(new InvalidEmailError(`Account email not informed`));
    expect(response.value).toEqual(leftError.value);
  });
});
