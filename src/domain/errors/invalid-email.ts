import { DomainError } from './domain-error';

export class InvalidEmailError extends Error implements DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidEmailError';
  }
}
