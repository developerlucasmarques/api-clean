import { Either } from '../../shared/either/either';
import { InvalidParamError, MissingParamError } from '../erros';

export type ValidationResponse = Either<InvalidParamError | MissingParamError, null>;

export interface Validation {
  validate(input: any): ValidationResponse;
}
