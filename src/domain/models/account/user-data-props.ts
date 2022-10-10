import { AccountEmail } from '../../value-objects/account/account-email';
import { AccountName } from '../../value-objects/account/account-name';
import { AccountPassword } from '../../value-objects/account/account-password';

export interface UserDataProps {
  name: AccountName;
  email: AccountEmail;
  password: AccountPassword;
}
