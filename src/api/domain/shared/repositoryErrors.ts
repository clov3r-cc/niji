import { BaseError } from '@/libs/baseError';
import type { DrizzleError } from 'drizzle-orm';

type RepositoryBaseError = DatabaseError;

export default RepositoryBaseError;

export class DatabaseError extends BaseError {
  constructor(cause: DrizzleError) {
    super('DBの処理中にエラーが発生しました', cause);
    this.name = 'DatabaseError';
    this.cause = cause;
  }
}
