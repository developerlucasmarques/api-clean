import { left, rigth } from '../../../shared/either/either';
import { Validation, ValidationResponse } from '../../protocols/validation';

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: any): ValidationResponse {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error.isLeft()) {
        return left(error.value);
      }
    }
    return rigth(null)
  }
}
