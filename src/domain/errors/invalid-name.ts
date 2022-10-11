import { DomainError } from './domain-error';

export class InvalidNameError extends Error implements DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidNameError'
  }
}
