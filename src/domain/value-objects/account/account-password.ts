import { Either, left, rigth } from '../../either/either';
import { InvalidPasswordError } from '../../errors/invalid-password';

type AccountPasswordResponse = Either<InvalidPasswordError, AccountPassword>;

export class AccountPassword {
  private constructor(private readonly password: string) {
    Object.freeze(this);
  }

  get value(): string {
    return this.password;
  }

  public static create(password: string): AccountPasswordResponse {
    if (!password) {
      return left(new InvalidPasswordError('Password not informed'));
    }

    const validatorPasswordRegex =
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!validatorPasswordRegex.test(password)) {
      return left(new InvalidPasswordError('Password too weak'));
    }
  }
}
