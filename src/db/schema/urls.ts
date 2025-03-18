import { sql } from 'drizzle-orm';
import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const urlsTable = pgTable('urls', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  originalUrl: varchar({ length: 2048 }).notNull(),
  expiresAt: timestamp().default(sql`now() + INTERVAL 1 MONTH`),
  alias: varchar({ length: 20 }).notNull().unique(),
  createdAt: timestamp().default(sql`now()`),
});
