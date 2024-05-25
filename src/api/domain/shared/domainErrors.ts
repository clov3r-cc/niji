import { BaseError } from '@/libs/baseError';

type DomainBaseError = ValidationError;

export default DomainBaseError;

export class ValidationError extends BaseError {
  readonly value: unknown;

  constructor(typeName: string, value: unknown, cause?: Error) {
    super(`型変換に失敗しました: ${typeName}`, cause);
    this.name = 'ValidationError';
    this.value = value;
    this.cause = cause;
  }
}
