import { Authentication } from '../../../domain/usecases/authentication';
import { badRequest, created, serverError } from '../../helpers/http/http-helper';
import {
  AddAccount,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './signup-controller-protocols';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const errorOrNull = this.validation.validate(httpRequest.body);
      if (errorOrNull.isLeft()) {
        return badRequest(errorOrNull.value);
      }

      const { name, email, password } = httpRequest.body;
      const accountOrError = await this.addAccount.add({
        name,
        email,
        password,
      });

      if (accountOrError.isLeft()) {
        return badRequest(accountOrError.value);
      }

      const accessTokenOrError = await this.authentication.auth({
        email,
        password,
      });
      return created({ accessToken: accessTokenOrError.value });
    } catch (error) {
      return serverError(error);
    }
  }
}
