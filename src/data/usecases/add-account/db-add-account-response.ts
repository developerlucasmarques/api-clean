import { InvalidEmailError } from '../../../domain/errors/invalid-email';
import { InvalidNameError } from '../../../domain/errors/invalid-name';
import { InvalidPasswordError } from '../../../domain/errors/invalid-password';
import { AccountModel } from '../../../domain/models/account/account-model';
import { Either } from '../../../shared/either/either';

export type DbAddAccountResponse = Either<
  InvalidNameError | InvalidEmailError | InvalidPasswordError,
  AccountModel
>;
