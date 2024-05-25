import { BaseError } from '@/libs/baseError';
import type DomainBaseError from '../shared/domainErrors';
import type RepositoryBaseError from '../shared/repositoryErrors';
import type { User } from './model';

export type DomainError = DomainBaseError;
export * from '../shared/domainErrors';

export class UserNotFound extends BaseError {
  constructor(identity: User.Id) {
    super(`指定されたIDのユーザは存在しません: ${identity}`);
  }
}

export type RepositoryError = RepositoryBaseError;
export * from '../shared/repositoryErrors';
