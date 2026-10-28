export class DomainError extends Error {
  constructor(code, message, options = {}) {
    // TODO: conserva details y cause.
    super(message);
    this.name = 'DomainError';
    this.code = code;
  }
}
