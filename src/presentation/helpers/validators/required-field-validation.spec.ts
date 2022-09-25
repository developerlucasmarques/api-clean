import { MissingParamError } from '../../erros';
import { RequiredFieldValidation } from './required-field-validation';

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field');
};

describe('RequiredField Validation', () => {
  test('Should return a MisingParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  test('Should not return a if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({ field: 'any_field' });
    expect(error).toBeFalsy();
  });
});
