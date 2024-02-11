import { drizzle } from 'drizzle-orm/d1';

export const DB = (db: D1Database) => drizzle(db);

export { v4 as uuidv4 } from 'uuid';
