import { usersTable } from '@/dbSchema';
import { DB } from '@/lib';
import { eq } from 'drizzle-orm';

export const findUserByUserId = async (db: D1Database, userId: string) =>
  DB(db)
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, userId))
    .limit(1)
    .then((arr) => (arr.length !== 0 ? arr[0] : undefined));

export const findUserByGoogleAccountId = async (db: D1Database, googleAccountId: string) =>
  DB(db)
    .select()
    .from(usersTable)
    .where(eq(usersTable.googleAccountId, googleAccountId))
    .limit(1)
    .then((arr) => (arr.length !== 0 ? arr[0] : undefined));

export const addUser = async (db: D1Database, param: typeof usersTable.$inferInsert) =>
  DB(db).insert(usersTable).values(param);
