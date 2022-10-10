import { left } from '../../either/either';
import { InvalidPasswordError } from '../../errors/invalid-password';
import { AccountPassword } from './account-password';

describe('AccountPassword', () => {
  test('Should return left with InvalidPasswordError if password not informed', () => {
    const response = AccountPassword.create('');
    const leftError = left(new InvalidPasswordError('Password not informed'));
    expect(response.value).toEqual(leftError.value);
  });

  test('Should return left with InvalidPasswordError if password is weak', () => {
    const response = AccountPassword.create('any_password');
    const leftError = left(new InvalidPasswordError('Password too weak'));
    expect(response.value).toEqual(leftError.value);
  });
});
