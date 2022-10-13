import { AccountModel } from '../../../../domain/models/account/account-model';
import { Either } from '../../../../shared/either/either';

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<Either<Error, AccountModel>>;
}
