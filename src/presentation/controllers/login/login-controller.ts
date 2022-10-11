import { Authentication } from '../../../domain/usecases/authentication';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '../../helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { Validation } from '../signup/signup-controller-protocols';

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error.isLeft()) {
        return badRequest(error.value);
      }

      const { email, password } = httpRequest.body;
      const accessToken = await this.authentication.auth({ email, password });
      if (!accessToken) {
        return unauthorized();
      }
      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
