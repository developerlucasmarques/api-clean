import { left, rigth } from '../../../shared/either/either';
import { InvalidParamError } from '../../erros';
import { Validation, ValidationResponse } from '../../protocols/validation';

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate(input: any): ValidationResponse {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return left(new InvalidParamError(this.fieldToCompareName));
    }
    return rigth(null);
  }
}
