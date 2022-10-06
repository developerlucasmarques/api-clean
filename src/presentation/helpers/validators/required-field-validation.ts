import { MissingParamError } from '../../erros';
import { Validation } from '../../protocols/validation';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
