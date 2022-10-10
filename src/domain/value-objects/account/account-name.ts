import { Either, left, rigth } from '../../../shared/either/either';
import { InvalidNameError } from '../../errors/invalid-name';

type AccountNameResponse = Either<InvalidNameError, AccountName>;

export class AccountName {
  private constructor(private readonly name: string) {
    Object.freeze(this);
  }

  get value(): string {
    return this.name;
  }

  public static create(name: string): AccountNameResponse {
    if (!name) {
      return left(new InvalidNameError(`Account name not informed`));
    }
    name = name.trim();
    if (name.length < 2 || name.length > 100) {
      return left(
        new InvalidNameError(`Account name must contain between 2 and 100 characters`)
      );
    }
    const containNumbersRegex = /[0-9]/g;
    if (containNumbersRegex.test(name)) {
      return left(new InvalidNameError(`Account name must not contain numbers`));
    }
    return rigth(new AccountName(name));
  }
}
