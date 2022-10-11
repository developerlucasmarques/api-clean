import { left, rigth } from '../../../shared/either/either';
import { MissingParamError } from '../../erros';
import { Validation, ValidationResponse } from '../../protocols/validation';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): ValidationResponse {
    if (!input[this.fieldName]) {
      return left(new MissingParamError(this.fieldName));
    }
    return rigth(null)
  }
}
