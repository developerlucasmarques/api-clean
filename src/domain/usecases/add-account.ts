import { DbAddAccountResponse } from '../../data/usecases/add-account/db-add-account-response';

export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<DbAddAccountResponse>;
}
