import { AccountModel } from '../../../domain/models/account/account-model';
import {
  Authentication,
  AuthenticationModel,
} from '../../../domain/usecases/authentication';
import { HashComparer } from '../../protocols/criptography/hash-comparer';
import { Encrypter } from '../../protocols/criptography/encrypter';
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository';
import { UpdateAccessTokenRepository } from '../../protocols/db/account/update-access-token-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const { password, email } = authentication;
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account.isRigth()) {
      const isValid = await this.hashComparer.compare(password, account.value.password);
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.value.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          account.value.id,
          accessToken
        );
        return accessToken;
      }
    }
    return null;
  }
}
