import { left, rigth } from '../../../shared/either/either';
import { InvalidParamError } from '../../erros';
import { EmailValidator } from '../../protocols/email-validator';
import { Validation, ValidationResponse } from '../../protocols/validation';

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate(input: any): ValidationResponse {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return left(new InvalidParamError(this.fieldName));
    }
    return rigth(null)

  }
}
