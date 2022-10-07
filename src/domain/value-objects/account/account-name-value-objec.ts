import { Either, left, rigth } from '../../either/either';
import { InvalidNameError } from '../../errors/invalid-name';
import { ValueObject } from '../value-object';

interface UserNameProps {
  name: string;
}
type NameResponse = Either<InvalidNameError, UserName>;

export class UserName extends ValueObject<UserNameProps> {
  private constructor(props: UserNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.name;
  }

  public static create(name: string): NameResponse {
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
    return rigth(new UserName({ name }));
  }
}
