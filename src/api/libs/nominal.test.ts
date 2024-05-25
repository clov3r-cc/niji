import { ZodError } from 'zod';
import { nonEmptyStringSchema } from './nominal';

describe('nonEmptyStringSchema', () => {
  it('should not throw an error when try to parse non empty string', () => {
    assert.doesNotThrow(
      () => nonEmptyStringSchema.parse('non-empty'),
      ZodError,
    );
  });

  it('should throw an error when try to parse empty string', () => {
    assert.throw(() => nonEmptyStringSchema.parse(''), ZodError);
  });
});
