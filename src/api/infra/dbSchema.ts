import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTableSchema = sqliteTable('users', {
  userId: text('user_id').primaryKey(),
  userName: text('user_name').notNull(),
  userProfileIconKey: text('user_profile_icon_key').unique(),
  googleAccountId: text('google_account_id').notNull().unique(),
});
