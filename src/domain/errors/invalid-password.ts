import { DomainError } from './domain-error';

export class InvalidPasswordError extends Error implements DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}
