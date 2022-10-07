import { AccountModel } from '../../../domain/models/account/account-model';
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account';
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository';
import { Hasher } from '../../protocols/criptography/hasher';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    );

    return new Promise((resolve) => resolve(account));
  }
}
