import {
  Authentication,
  AuthenticationModel,
} from '../../../domain/usecases/authentication';
import { left, rigth } from '../../../shared/either/either';
import { Encrypter } from '../../protocols/criptography/encrypter';
import { HashComparer } from '../../protocols/criptography/hash-comparer';
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository';
import { UpdateAccessTokenRepository } from '../../protocols/db/account/update-access-token-repository';
import { DbAuthenticationError } from '../errors/db-authentication-error';
import { DbAuthenticationResponse } from './db-authentication-response';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationModel): DbAuthenticationResponse {
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
        return rigth(accessToken);
      }
      return left(new DbAuthenticationError('Authentication error'));
    } else {
      return left(account.value);
    }
  }
}
