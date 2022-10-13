export class AccountNotFoundDbError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AccountNotFoundDbError';
  }
}
