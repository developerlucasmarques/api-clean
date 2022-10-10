import { Either, left, rigth } from '../../either/either';
import { InvalidEmailError } from '../../errors/invalid-email';

type AccountEmailResponse = Either<InvalidEmailError, AccountEmail>;

export class AccountEmail {
  private constructor(private readonly email: string) {
    Object.freeze(this);
  }

  get value(): string {
    return this.email;
  }

  public static create(email: string): AccountEmailResponse {
    if (!email) {
      return left(new InvalidEmailError(`Email not informed`));
    }
    email = email.trim();

    return rigth(new AccountEmail(email));
  }
}
