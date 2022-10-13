import { Either } from '../../../shared/either/either';
import { DbAuthenticationError } from '../errors/db-authentication-error';

export type DbAuthenticationResponse = Promise<Either<DbAuthenticationError, string>>;
