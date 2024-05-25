export class BaseError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause });
    this.name = "BaseError";
    this.cause = cause;
  }
}
