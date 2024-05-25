import { Option } from '@mikuroxina/mini-fn';
import { assertOneOrMore } from './fn';

describe('assertOneOrMore', () => {
  it('should return Option.Some when received non empty array', () => {
    const firstElement = 1;

    expect(assertOneOrMore([firstElement])).toStrictEqual(
      Option.some(firstElement),
    );
    expect(assertOneOrMore([firstElement, 2, 3])).toStrictEqual(
      Option.some(firstElement),
    );
  });

  it('should return Option.None when received empty array', () => {
    expect(assertOneOrMore([])).toStrictEqual(Option.none());
  });
});
