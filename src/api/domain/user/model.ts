import { nonEmptyStringSchema } from '@/libs/nominal';
import { Result } from '@mikuroxina/mini-fn';
import { z } from 'zod';
import { ValidationError } from './errors';

const userIdSchema = nonEmptyStringSchema.brand('UserId');

const userSchema = z.object({
  id: userIdSchema,
  name: nonEmptyStringSchema,
  profileIconUrl: nonEmptyStringSchema.optional(),
  googleAccountId: nonEmptyStringSchema,
});

export type User = z.infer<typeof userSchema>;

const createUserSchema = userSchema.pick({
  id: true,
  name: true,
  profileIconUrl: true,
  googleAccountId: true,
});

type CreateUser = z.infer<typeof createUserSchema>;

export namespace User {
  export type Id = z.infer<typeof userIdSchema>;
  export namespace Id {
    export const of = (s: string) => {
      const parsed = userIdSchema.safeParse(s);

      return parsed.success
        ? Result.ok(parsed.data)
        : Result.err(new ValidationError('UserId', s, parsed.error));
    };
    export const as = (s: string) => userIdSchema.parse(s);
  }

  export const of = (v: CreateUser) => {
    const parsed = userSchema.safeParse(v);

    return parsed.success
      ? Result.ok(parsed.data)
      : Result.err(new ValidationError('User', v, parsed.error));
  };
  export const as = (v: CreateUser) => userSchema.parse(v);
}
