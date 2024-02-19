import type { usersTable } from '@/dbSchema';

export type User = typeof usersTable.$inferSelect;
