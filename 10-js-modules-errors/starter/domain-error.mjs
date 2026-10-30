export class DomainError extends Error {
  constructor(code, message, options = {}) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
    this.details = options.details;
    this.cause = options.cause;
  }
}
