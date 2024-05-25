import type { Result } from '@mikuroxina/mini-fn';
import type { User } from './model';
import type { RepositoryError, UserNotFound } from './errors';

export type UserRepository = {
  get: UserRepository.Get;
  add: UserRepository.Add;
};

export namespace UserRepository {
  export namespace Get {
    export type Error = RepositoryError | UserNotFound;

    export type Params = { id: User.Id };
    export type Response = Result.Result<Error, User>;
  }
  export type Get = (params: Get.Params) => Promise<Get.Response>;

  export namespace Add {
    export type Error = RepositoryError;

    export type Params = { newUser: User };
    export type Response = Result.Result<Error, User>;
  }
  export type Add = (params: Add.Params) => Promise<Add.Response>;
}
