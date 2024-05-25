import { Result } from '@mikuroxina/mini-fn';
import { User } from './model';

describe('UserId', () => {
  it('#of should return ValidationError when try to parse empty string', () => {
    const actual = User.Id.of('');

    expect(Result.isErr(actual)).toBeTruthy();
    expect(Result.unwrapErr(actual).message).toBe(
      '型変換に失敗しました: UserId',
    );
  });
});

describe('User', () => {
  it('#of should return ValidationError when try to parse insufficient object', () => {
    const actual = User.of({
      id: User.Id.as('user-id'),
      name: '',
      googleAccountId: '',
    });

    expect(Result.isErr(actual)).toBeTruthy();
    expect(Result.unwrapErr(actual).message).toBe('型変換に失敗しました: User');
  });
});
