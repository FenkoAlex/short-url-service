import { sql } from 'drizzle-orm';
import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const urlsTable = pgTable('urls', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  originalUrl: varchar('namoriginal_url', { length: 2048 }).notNull(),
  expiresAt: timestamp('expires_at').default(sql`now()`),
  alias: varchar('alias', { length: 20 }).notNull().unique(),
  createdAt: timestamp('created_at').default(sql`now()`),
});
