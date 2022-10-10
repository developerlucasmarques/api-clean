import { left } from '../../../shared/either/either';
import { InvalidPasswordError } from '../../errors/invalid-password';
import { Account } from './account';

describe('Account', () => {
  test('Should EitherCombine return the first error if any field invalid', () => {
    const response = Account.create({
      name: 'any_name',
      email: 'mail@mail.com',
      password: 'any@password',
    });
    const leftError = left(new InvalidPasswordError('Password too weak'));
    expect(response).toEqual(leftError);
  });

  test('Should return new Account if data provided is valid', () => {
    const response = Account.create({
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'Valid@Password123',
    });

    expect(response.value).toEqual({
      name: { name: 'valid_name' },
      email: { email: 'valid@mail.com' },
      password: { password: 'Valid@Password123' },
    });
  });
});
