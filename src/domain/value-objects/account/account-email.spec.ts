import { left } from '../../../shared/either/either';
import { InvalidEmailError } from '../../errors/invalid-email';
import { AccountEmail } from './account-email';

describe('AccountEmail', () => {
  test('Should return left with InvalidEmailError if email not provided', () => {
    const response = AccountEmail.create('');
    const leftError = left(new InvalidEmailError(`Email not informed`));
    expect(response.value).toEqual(leftError.value);
  });

  test('Should return left with InvalidEmailError if email contains more than 100 characters', () => {
    const response = AccountEmail.create(
      'any_email_any_email_any_email_any_email_any_email_any_email_any_email_any_email_any_email_any_email_1'
    );
    const leftError = left(
      new InvalidEmailError(`Email cannot contain more than 100 characters`)
    );
    expect(response.value).toEqual(leftError.value);
  });

  test('Should create email with no white spaces in edges', () => {
    const response = AccountEmail.create('  any_email@mail.com    ');
    expect(response.value).toEqual({ email: 'any_email@mail.com' });
  });
});
