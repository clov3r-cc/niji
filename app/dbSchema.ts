import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: text('id').primaryKey().notNull(),
  profileIconUrl: text('profile_icon_url'),
  displayName: text('display_name').notNull(),
});

export const userBooksTable = sqliteTable(
  'user_books',
  {
    id: text('id').primaryKey().notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => usersTable.id),
    bookName: text('book_name').notNull(),
    bookKana: text('book_kana').notNull(),
    circleName: text('circle_name').notNull(),
    circleKana: text('circle_kana').notNull(),
    authorName: text('author_name').notNull(),
    authorKana: text('author_kana').notNull(),
    eventName: text('event_name').notNull(),
    eventKana: text('event_kana').notNull(),
    coverUrl: text('cover_url'),
    price: integer('price').notNull().default(0),
    publishedAt: text('published_at').notNull(),
    registeredAt: text('registered_at').notNull(),
  },
  (table) => ({
    unq: unique().on(table.registeredAt, table.bookName, table.authorName),
    unq2: unique().on(table.registeredAt, table.bookName, table.circleName),
  }),
);

export const userBookNotesTable = sqliteTable(
  'user_book_notes',
  {
    id: text('id').primaryKey().notNull(),
    bookId: text('book_id')
      .notNull()
      .references(() => userBooksTable.id),
    userId: text('user_id')
      .notNull()
      .references(() => usersTable.id),
    contents: text('contents').notNull(),
  },
  (table) => ({
    unq: unique().on(table.userId, table.bookId, table.contents),
  }),
);

export const userBookLabelsTable = sqliteTable(
  'user_book_labels',
  {
    id: text('id').primaryKey().notNull(),
    bookId: text('book_id')
      .notNull()
      .references(() => userBooksTable.id),
    userId: text('user_id')
      .notNull()
      .references(() => usersTable.id),
    contents: text('contents').notNull(),
    color: text('color_code').notNull(),
  },
  (table) => ({
    unq: unique().on(table.userId, table.bookId, table.contents),
  }),
);
