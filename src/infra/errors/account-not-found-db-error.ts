import { InfraError } from './infra-errors';

export class AccountNotFoundDbError extends Error implements InfraError {
  constructor(message: string) {
    super(message);
    this.name = 'AccountNotFoundDbError';
  }
}
