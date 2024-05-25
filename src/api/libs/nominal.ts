import { z } from 'zod';

export const nonEmptyStringSchema = z.string().refine((value) => value !== '', {
  message: '値は何かしらの文字列を含んでいる必要があります。',
});
