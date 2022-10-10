import { left } from '../../../shared/either/either';
import { InvalidPasswordError } from '../../errors/invalid-password';
import { Account } from './account';

describe('Account', () => {
  test('Should EitherComine return the first error if any field invalid', () => {
    const response = Account.create({
      name: 'any_name',
      email: 'mail@mail.com',
      password: 'any@assword',
    });
    const leftError = left(new InvalidPasswordError('Password too weak'));
    expect(response).toEqual(leftError);
  });
});
