import { AccountModel } from '../../../../domain/models/account/account-model';
import { AddAccountModel } from '../../../../domain/usecases/add-account';

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>;
}
