import { Either, EitherCombine, left, rigth } from '../../../shared/either/either';
import { InvalidEmailError } from '../../errors/invalid-email';
import { InvalidNameError } from '../../errors/invalid-name';
import { InvalidPasswordError } from '../../errors/invalid-password';
import { AddAccountModel } from '../../usecases/add-account';
import { AccountEmail } from '../../value-objects/account/account-email';
import { AccountName } from '../../value-objects/account/account-name';
import { AccountPassword } from '../../value-objects/account/account-password';
import { UserDataProps } from './user-data-props';

export class Account {
  name: AccountName;
  email: AccountEmail;
  password: AccountPassword;

  private constructor(props: UserDataProps) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    Object.freeze(this);
  }

  public static create(
    addAccountModel: AddAccountModel
  ): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, Account> {
    const nameOrError = AccountName.create(addAccountModel.name);
    const emailOrError = AccountEmail.create(addAccountModel.email);
    const passwordOrError = AccountPassword.create(addAccountModel.password);

    const results = EitherCombine.validate<
      InvalidNameError | InvalidEmailError | InvalidPasswordError,
      AccountName | AccountEmail | AccountPassword
    >([nameOrError, emailOrError, passwordOrError]);

    if (results.isLeft()) {
      return left(results.value);
    }

    const name: any = nameOrError.value;
    const email: any = emailOrError.value;
    const password: any = passwordOrError.value;

    return rigth(new Account({ name, email, password }));
  }
}
