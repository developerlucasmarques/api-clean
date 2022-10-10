import { EitherCombine, left } from '../../../shared/either/either';
import { InvalidEmailError } from '../../errors/invalid-email';
import { InvalidNameError } from '../../errors/invalid-name';
import { InvalidPasswordError } from '../../errors/invalid-password';
import { AddAccountModel } from '../../usecases/add-account';
import {
  AccountEmail,
  AccountEmailResponse,
} from '../../value-objects/account/account-email';
import {
  AccountName,
  AccountNameResponse,
} from '../../value-objects/account/account-name';
import {
  AccountPassword,
  AccountPasswordResponse,
} from '../../value-objects/account/account-password';
import { UserDataProps } from './user-data-props';

export class Account {
  name: AccountName;
  email: AccountEmail;
  password: AccountPassword;

  private constructor(props: UserDataProps) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  public static create(addAccountModel: AddAccountModel) {
    const { name, email, password } = addAccountModel;
    const nameOrError: AccountNameResponse = AccountName.create(name);
    const emailOrError: AccountEmailResponse = AccountEmail.create(email);
    const passwordOrError: AccountPasswordResponse = AccountPassword.create(password);

    const results = EitherCombine.validate<
      InvalidNameError | InvalidEmailError | InvalidPasswordError,
      AccountName | AccountEmail | AccountPassword
    >([nameOrError, emailOrError, passwordOrError]);

    if (results.isLeft()) {
      return left(results.value);
    }
  }
}
