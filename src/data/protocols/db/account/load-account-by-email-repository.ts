import { AccountModel } from '../../../../domain/models/account/account-model';

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>;
}
