import { left } from '../../either/either';
import { InvalidPasswordError } from '../../errors/invalid-password';
import { AccountPassword } from './account-password';

describe('AccountPassword', () => {
  test('Should return left with InvalidPasswordError if password not informed', () => {
    const response = AccountPassword.create('');
    const leftError = left(new InvalidPasswordError('Password not informed'));
    expect(response.value).toEqual(leftError.value);
  });

  test('Should return left with InvalidPasswordError if password is less than 8 characters', () => {
    const response = AccountPassword.create('Any@');
    const leftError = left(
      new InvalidPasswordError('Password must contain at least 8 characters')
    );
    expect(response.value).toEqual(leftError.value);
  });

  test('Should return left with InvalidPasswordError if password not contain capital letter', () => {
    const response = AccountPassword.create('any@password3');
    const leftError = left(new InvalidPasswordError('Password too weak'));
    expect(response.value).toEqual(leftError.value);
  });

  test('Should return left with InvalidPasswordError if password not contain numbers', () => {
    const response = AccountPassword.create('Any@password');
    const leftError = left(new InvalidPasswordError('Password too weak'));
    expect(response.value).toEqual(leftError.value);
  });

  test('Should return left with InvalidPasswordError if password not contain special character', 
  () => {
    const response = AccountPassword.create('Any3password');
    const leftError = left(new InvalidPasswordError('Password too weak'));
    expect(response.value).toEqual(leftError.value);
  });
});
