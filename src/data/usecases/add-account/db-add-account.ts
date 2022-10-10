import { Account } from '../../../domain/models/account/account';
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account';
import { left, rigth } from '../../../shared/either/either';
import { Hasher } from '../../protocols/criptography/hasher';
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository';
import { DbAddAccountResponse } from './db-add-account-response';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<DbAddAccountResponse> {
    const accountOrError = Account.create(accountData);
    if (accountOrError.isLeft()) {
      return left(accountOrError.value);
    }
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    );

    return rigth(account);
  }
}
