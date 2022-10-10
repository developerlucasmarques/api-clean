import { Authentication } from '../../../domain/usecases/authentication';
import { InvalidParamError } from '../../erros';
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
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      if (account.isLeft()) {
        return badRequest(account.value);
      }

      const accessToken = await this.authentication.auth({
        email,
        password,
      });

      return created({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
